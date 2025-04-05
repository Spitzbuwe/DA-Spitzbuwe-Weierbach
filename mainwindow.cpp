#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QFileDialog>
#include <QMessageBox>
#include <QMediaMetaData>
#include <QProcess>
#include <QDir>
#include <QFile>
#include <QProgressDialog>
#include <QThread>
#include <QInputDialog>
#include <QDebug>
#include <QStandardPaths>
#include <QPalette>
#include <taglib/fileref.h>
#include <taglib/tag.h>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent), ui(new Ui::MainWindow),
    player(new QMediaPlayer(this)), audioOutput(new QAudioOutput(this))
{
    ui->setupUi(this);

    // Media Player Initialisierung
    player->setAudioOutput(audioOutput);

    // Verbindungen herstellen
    connect(player, &QMediaPlayer::positionChanged, this, &MainWindow::updatePosition);
    connect(player, &QMediaPlayer::durationChanged, ui->progressSlider, &QSlider::setMaximum);
    connect(ui->playButton, &QPushButton::clicked, this, &MainWindow::playMusic);
    connect(ui->pauseButton, &QPushButton::clicked, this, &MainWindow::pauseMusic);
    connect(ui->stopButton, &QPushButton::clicked, this, &MainWindow::stopMusic);
    connect(ui->volumeSlider, &QSlider::valueChanged, this, &MainWindow::adjustVolume);
    connect(ui->progressSlider, &QSlider::sliderMoved, this, &MainWindow::setPosition);
    connect(ui->separateButton, &QPushButton::clicked, this, &MainWindow::separateVocals);
    connect(ui->addButton, &QPushButton::clicked, this, &MainWindow::addFilesToPlaylist);
    connect(ui->removeButton, &QPushButton::clicked, this, &MainWindow::removeSelectedSong);
    connect(ui->saveButton, &QPushButton::clicked, this, &MainWindow::savePlaylist);
    connect(ui->loadButton, &QPushButton::clicked, this, &MainWindow::loadPlaylist);
    connect(ui->editMetadataButton, &QPushButton::clicked, this, &MainWindow::editMetadata);
    connect(ui->darkModeButton, &QPushButton::clicked, this, &MainWindow::toggleDarkMode);
    connect(ui->exportButton, &QPushButton::clicked, this, &MainWindow::exportStems);

    // Metadaten anzeigen, wenn ein Song ausgewählt wird
    connect(ui->playlistWidget, &QListWidget::itemClicked, this, [this](QListWidgetItem *item) {
        displayMetadata(item->text());
    });

    // Drag-and-Drop aktivieren
    setAcceptDrops(true);

    // Standard-Lautstärke setzen
    ui->volumeSlider->setRange(0, 100);
    ui->volumeSlider->setValue(50);

    // Einstellungen laden
    loadSettings();
}

MainWindow::~MainWindow() {
    saveSettings();
    delete ui;
}

void MainWindow::playMusic() {
    if (!ui->playlistWidget->currentItem()) {
        QMessageBox::warning(this, tr("Fehler"), tr("Kein Song ausgewählt!"));
        return;
    }

    QString filePath = ui->playlistWidget->currentItem()->text();
    if (!QFile::exists(filePath)) {
        QMessageBox::critical(this, tr("Fehler"), tr("Datei existiert nicht: %1").arg(filePath));
        return;
    }

    player->setSource(QUrl::fromLocalFile(filePath));
    player->play();
}

void MainWindow::pauseMusic() {
    player->pause();
}

void MainWindow::stopMusic() {
    player->stop();
}

void MainWindow::updatePosition(qint64 position) {
    ui->progressSlider->setValue(position);
}

void MainWindow::adjustVolume(int volume) {
    audioOutput->setVolume(volume / 100.0);
}

void MainWindow::setPosition(int position) {
    player->setPosition(position);
}

void MainWindow::dragEnterEvent(QDragEnterEvent *event) {
    if (event->mimeData()->hasUrls()) {
        event->acceptProposedAction();
    }
}

void MainWindow::dropEvent(QDropEvent *event) {
    for (const QUrl &url : event->mimeData()->urls()) {
        QString filePath = url.toLocalFile();
        if (filePath.endsWith(".mp3", Qt::CaseInsensitive) ||
            filePath.endsWith(".wav", Qt::CaseInsensitive) ||
            filePath.endsWith(".flac", Qt::CaseInsensitive)) {
            ui->playlistWidget->addItem(filePath);
        }
    }
}

void MainWindow::separateVocals() {
    QListWidgetItem *currentItem = ui->playlistWidget->currentItem();
    if (!currentItem) {
        QMessageBox::warning(this, tr("Fehler"), tr("Kein Song ausgewählt!"));
        return;
    }

    QString filePath = currentItem->text();
    QString outputDir = QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation) + "/MusicPlayer/output";
    QDir dir(outputDir);
    if (!dir.exists() && !dir.mkpath(".")) {
        QMessageBox::critical(this, tr("Fehler"), tr("Ausgabeverzeichnis konnte nicht erstellt werden!"));
        return;
    }

    QString pythonScript = QCoreApplication::applicationDirPath() + "/scripts/separate.py";

    if (!QFile::exists(pythonScript)) {
        QMessageBox::critical(this, tr("Fehler"), tr("Python-Skript nicht gefunden!"));
        return;
    }

    QProgressDialog progressDialog(tr("Gesang wird getrennt..."), tr("Abbrechen"), 0, 100, this);
    progressDialog.setWindowModality(Qt::WindowModal);
    progressDialog.setWindowTitle(tr("Gesangstrennung"));
    progressDialog.show();

    QProcess process;
    process.start("python", QStringList() << pythonScript << filePath << outputDir);

    if (!process.waitForStarted()) {
        QMessageBox::critical(this, tr("Fehler"), tr("Prozess konnte nicht gestartet werden!"));
        return;
    }

    while (process.state() == QProcess::Running) {
        if (progressDialog.wasCanceled()) {
            process.terminate();
            break;
        }
        QApplication::processEvents();
        QThread::msleep(100);
        progressDialog.setValue((progressDialog.value() + 5) % 100);
    }

    progressDialog.setValue(100);

    if (process.exitStatus() == QProcess::NormalExit && process.exitCode() == 0) {
        QMessageBox::information(this, tr("Erfolg"), tr("Gesang wurde erfolgreich getrennt!"));

        QDir separatedDir(outputDir + "/htdemucs");
        QStringList filters = {"*.wav", "*.mp3"};
        QStringList separatedFiles = separatedDir.entryList(filters, QDir::Files);

        if (!separatedFiles.isEmpty()) {
            for (const QString &stem : separatedFiles) {
                QString stemPath = separatedDir.filePath(stem);
                ui->playlistWidget->addItem(stemPath);
            }
        } else {
            QMessageBox::warning(this, tr("Hinweis"), tr("Keine separierten Stämme gefunden."));
        }
    } else {
        QMessageBox::critical(this, tr("Fehler"),
                              tr("Fehler bei der Trennung: %1").arg(process.errorString()));
    }
}

void MainWindow::addFilesToPlaylist() {
    QStringList fileNames = QFileDialog::getOpenFileNames(
        this,
        tr("Audiodateien hinzufügen"),
        QStandardPaths::writableLocation(QStandardPaths::MusicLocation),
        tr("Audio Files (*.mp3 *.wav *.flac)")
        );

    for (const QString &fileName : fileNames) {
        if (QFile::exists(fileName)) {
            ui->playlistWidget->addItem(fileName);
        }
    }
}

void MainWindow::removeSelectedSong() {
    QList<QListWidgetItem *> selectedItems = ui->playlistWidget->selectedItems();
    for (QListWidgetItem *item : selectedItems) {
        delete item;
    }
}

void MainWindow::savePlaylist() {
    QString fileName = QFileDialog::getSaveFileName(
        this,
        tr("Playlist speichern"),
        QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation),
        tr("Playlist (*.m3u)")
        );

    if (fileName.isEmpty()) return;

    QFile file(fileName);
    if (!file.open(QIODevice::WriteOnly | QIODevice::Text)) {
        QMessageBox::critical(this, tr("Fehler"), tr("Datei konnte nicht geschrieben werden!"));
        return;
    }

    QTextStream out(&file);
    for (int i = 0; i < ui->playlistWidget->count(); ++i) {
        out << ui->playlistWidget->item(i)->text() << "\n";
    }
    file.close();
}

void MainWindow::loadPlaylist() {
    QString fileName = QFileDialog::getOpenFileName(
        this,
        tr("Playlist laden"),
        QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation),
        tr("Playlist (*.m3u)")
        );

    if (fileName.isEmpty()) return;

    QFile file(fileName);
    if (!file.open(QIODevice::ReadOnly | QIODevice::Text)) {
        QMessageBox::critical(this, tr("Fehler"), tr("Datei konnte nicht gelesen werden!"));
        return;
    }

    ui->playlistWidget->clear();
    QTextStream in(&file);
    while (!in.atEnd()) {
        QString line = in.readLine().trimmed();
        if (!line.isEmpty() && QFile::exists(line)) {
            ui->playlistWidget->addItem(line);
        }
    }
    file.close();
}

void MainWindow::displayMetadata(const QString &filePath) {
    if (!QFile::exists(filePath)) {
        ui->metadataLabel->setText(tr("Datei nicht gefunden!"));
        return;
    }

    TagLib::FileRef file(filePath.toStdString().c_str());
    if (!file.isNull() && file.tag()) {
        TagLib::Tag *tag = file.tag();
        QString info = QString(tr("Titel: %1\nKünstler: %2\nAlbum: %3\nJahr: %4\nTrack: %5"))
                           .arg(QString::fromStdString(tag->title().to8Bit(true)))
                           .arg(QString::fromStdString(tag->artist().to8Bit(true)))
                           .arg(QString::fromStdString(tag->album().to8Bit(true)))
                           .arg(tag->year())
                           .arg(tag->track());

        ui->metadataLabel->setText(info);
    } else {
        ui->metadataLabel->setText(tr("Keine Metadaten verfügbar."));
    }
}

void MainWindow::editMetadata() {
    QListWidgetItem *currentItem = ui->playlistWidget->currentItem();
    if (!currentItem) {
        QMessageBox::warning(this, tr("Fehler"), tr("Kein Song ausgewählt!"));
        return;
    }

    QString filePath = currentItem->text();
    displayMetadata(filePath);

    TagLib::FileRef file(filePath.toStdString().c_str());
    if (file.isNull() || !file.tag()) {
        QMessageBox::warning(this, tr("Fehler"), tr("Datei unterstützt keine Metadaten!"));
        return;
    }

    TagLib::Tag *tag = file.tag();
    QString currentTitle = QString::fromStdString(tag->title().to8Bit(true));
    QString currentArtist = QString::fromStdString(tag->artist().to8Bit(true));
    QString currentAlbum = QString::fromStdString(tag->album().to8Bit(true));

    bool ok;
    QString title = QInputDialog::getText(this, tr("Metadaten bearbeiten"),
                                          tr("Titel:"), QLineEdit::Normal, currentTitle, &ok);
    if (ok) {
        tag->setTitle(title.toStdString());
    }

    QString artist = QInputDialog::getText(this, tr("Metadaten bearbeiten"),
                                           tr("Künstler:"), QLineEdit::Normal, currentArtist, &ok);
    if (ok) {
        tag->setArtist(artist.toStdString());
    }

    QString album = QInputDialog::getText(this, tr("Metadaten bearbeiten"),
                                          tr("Album:"), QLineEdit::Normal, currentAlbum, &ok);
    if (ok) {
        tag->setAlbum(album.toStdString());
    }

    if (file.save()) {
        displayMetadata(filePath);
        QMessageBox::information(this, tr("Erfolg"), tr("Metadaten wurden aktualisiert."));
    } else {
        QMessageBox::critical(this, tr("Fehler"), tr("Metadaten konnten nicht gespeichert werden!"));
    }
}

void MainWindow::toggleDarkMode() {
    static bool darkMode = false;
    darkMode = !darkMode;

    if (darkMode) {
        QPalette darkPalette;
        darkPalette.setColor(QPalette::Window, QColor(53, 53, 53));
        darkPalette.setColor(QPalette::WindowText, Qt::white);
        darkPalette.setColor(QPalette::Base, QColor(25, 25, 25));
        darkPalette.setColor(QPalette::AlternateBase, QColor(53, 53, 53));
        darkPalette.setColor(QPalette::ToolTipBase, Qt::white);
        darkPalette.setColor(QPalette::ToolTipText, Qt::white);
        darkPalette.setColor(QPalette::Text, Qt::white);
        darkPalette.setColor(QPalette::Button, QColor(53, 53, 53));
        darkPalette.setColor(QPalette::ButtonText, Qt::white);
        darkPalette.setColor(QPalette::BrightText, Qt::red);
        darkPalette.setColor(QPalette::Link, QColor(42, 130, 218));
        darkPalette.setColor(QPalette::Highlight, QColor(42, 130, 218));
        darkPalette.setColor(QPalette::HighlightedText, Qt::black);

        qApp->setPalette(darkPalette);
    } else {
        qApp->setPalette(style()->standardPalette());
    }
}

void MainWindow::exportStems() {
    QListWidgetItem *currentItem = ui->playlistWidget->currentItem();
    if (!currentItem) {
        QMessageBox::warning(this, tr("Fehler"), tr("Kein Song ausgewählt!"));
        return;
    }

    QString defaultDir = QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation);
    QString exportDir = QFileDialog::getExistingDirectory(this,
                                                          tr("Exportverzeichnis auswählen"), defaultDir);

    if (exportDir.isEmpty()) return;

    QString filePath = currentItem->text();
    QString baseName = QFileInfo(filePath).completeBaseName();
    QString targetPath = exportDir + "/" + baseName + "_exported.wav";

    if (QFile::copy(filePath, targetPath)) {
        QMessageBox::information(this, tr("Erfolg"),
                                 tr("Datei wurde exportiert nach:\n%1").arg(targetPath));
    } else {
        QMessageBox::critical(this, tr("Fehler"), tr("Export fehlgeschlagen!"));
    }
}

void MainWindow::saveSettings() {
    QSettings settings("MusikPlayer", "Mielersch");
    settings.setValue("volume", ui->volumeSlider->value());
    settings.setValue("geometry", saveGeometry());
    settings.setValue("windowState", saveState());

    QStringList playlist;
    for (int i = 0; i < ui->playlistWidget->count(); ++i) {
        playlist.append(ui->playlistWidget->item(i)->text());
    }
    settings.setValue("playlist", playlist);
}

void MainWindow::loadSettings() {
    QSettings settings("MusikPlayer", "Mielersch");
    restoreGeometry(settings.value("geometry").toByteArray());
    restoreState(settings.value("windowState").toByteArray());

    int volume = settings.value("volume", 50).toInt();
    ui->volumeSlider->setValue(volume);
    audioOutput->setVolume(volume / 100.0);

    QStringList playlist = settings.value("playlist").toStringList();
    for (const QString &filePath : playlist) {
        if (QFile::exists(filePath)) {
            ui->playlistWidget->addItem(filePath);
        }
    }
}
