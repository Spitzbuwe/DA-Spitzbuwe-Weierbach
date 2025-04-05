#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QMediaPlayer>
#include <QAudioOutput>
#include <QListWidget>
#include <QSettings>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void playMusic();
    void pauseMusic();
    void stopMusic();
    void updatePosition(qint64 position);
    void adjustVolume(int volume);
    void setPosition(int position);
    void separateVocals();
    void addFilesToPlaylist();
    void removeSelectedSong();
    void savePlaylist();
    void loadPlaylist();
    void displayMetadata(const QString &filePath);
    void editMetadata();
    void toggleDarkMode();
    void exportStems();

private:
    Ui::MainWindow *ui;
    QMediaPlayer *player;
    QAudioOutput *audioOutput;

    void saveSettings();
    void loadSettings();
};

#endif // MAINWINDOW_H
