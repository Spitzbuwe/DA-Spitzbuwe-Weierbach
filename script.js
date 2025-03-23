<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dart-Abteilung Spitzbuwe Weierbach</title>
    <link rel="stylesheet" href="styles.css">
    <script src="script.js" defer></script>
</head>
<body>

    <!-- Header -->
    <header>
        <div class="header-container">
            <img src="images/Vfl.png" alt="VfL Weierbach 1892 e.V. Wappen" class="wappen-klein">
            <h1>VfL Weierbach 1892 e.V.</h1>
        </div>
    </header>

    <!-- Navigation -->
    <div class="diywebNav diywebNavMain diywebNav1 diywebNavHorizontal">
        <ul id="mainNav1" class="mainNav1">
            <li><a href="#" onclick="showSection('home')">Startseite</a></li>
            <li><a href="#" onclick="showSection('training')">Training</a></li>
            <li><a href="#" onclick="showSection('aktuelles')">Aktuelles</a></li>
            <li><a href="#" onclick="showSection('galerie')">Bildergalerie</a></li>
            <li class="menu-item">
                <a href="#">Verein ▼</a>
                <ul class="dropdown">
                    <li><a href="#" onclick="showSection('aktuelle-spieler')">Aktuelle Spieler</a></li>
                    <li><a href="#" onclick="showSection('spieltag')">Spieltag</a></li>
                    <li><a href="#" onclick="showSection('ergebnisse')">Ergebnisse</a></li>
                    <li><a href="#" onclick="showSection('tabelle')">Tabelle</a></li>
                    <li><a href="#" onclick="showSection('bio')">Über uns</a></li>
                </ul>
            </li>
            <li><a href="#" onclick="showSection('sponsoren')">Sponsoren</a></li>
            <li><a href="#" onclick="showSection('kontakt')">Kontakt</a></li>
        </ul>
    </div>

    <!-- Hauptinhalt -->
    <main>
        <section id="home">
            <div class="header-container">
                <img src="images/Wappen.png" alt="Wappen der Dart-Abteilung Spitzbuwe Weierbach" class="wappen-klein">
                <h2>Willkommen bei der Dart-Abteilung des VfL Weierbach</h2>
            </div>
        </section>

        <!-- Über uns -->
        <section id="bio">
            <h2>Über uns</h2>
            <p>Wir sind die Dart-Abteilung des VfL Weierbach, gegründet am 01. März 2025.  
               Ab September nehmen wir an der EHM-Liga teil. Derzeit besteht unser Team aus 11 aktiven Spielern. 🎯</p>
        </section>

        <!-- Aktuelle Spieler -->
        <section id="aktuelle-spieler" class="hidden">
            <h2>Aktuelle Spieler</h2>
            <ul>
                <li>Matthias "The Underdog" Müller</li>
                <li>Marvin "The Wildfly" Wild</li>
                <li>Julian "Madhouse" Müller</li>
                <li>Georg "The Hammer" Hamelmann</li>
                <li>Sven "The Red Baron" Lempke</li>
                <li>Stefan "The Flash" Schlosser</li>
                <li>Björn Rupprich</li>
                <li>Niko "The Frozen Sniper" Müller</li>
                <li>Thomas "TK Finish" Keibel</li>
                <li>Tobias</li>
                <li>Christian "Dart Vader" Wagner</li>
            </ul>
        </section>

        <!-- Bildergalerie -->
        <section id="galerie" class="hidden">
            <h2>Bildergalerie</h2>
            <div class="gallery" onclick="enlargeImage(event)">
                <img src="images/Vereinsheim-Weierbach.jpg" alt="Vereinsheim des VfL Weierbach">
                <img src="images/Dart-Anlagen.jpg" alt="Dart-Anlage des Vereins">
            </div>
        </section>

        <!-- Besucherzähler -->
        <div id="visitor-counter">Besucher: <span id="visitor-count">0</span></div>
    </main>

    <footer>
        <p>&copy; 2025 Dart-Abteilung VfL Weierbach | Alle Rechte vorbehalten</p>
    </footer>

</body>
</html>
