<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dart-Abteilung Spitzbuwe Weierbach</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body style="background-color: #ccffcc;">
    <header class="header-container" style="background-color: black; color: white; padding: 10px; text-align: center;">
        <img src="Wappen.png" alt="Vereinswappen" class="wappen" style="width: 100px; height: auto;">
        <h1>Dart-Abteilung Spitzbuwe Weierbach</h1>
    </header>
    
    <h2 style="text-align: center;">
        <a href="https://www.vfl-weierbach.de/" target="_blank">VfL Weierbach 1892 e.V.</a>
        <br>
        <img src="Vfl-Weierbach.png" alt="VfL Weierbach Wappen" style="width: 100px; height: auto;">
    </h2>
    
    <nav class="main-nav">
        <ul class="nav-list">
            <li><a href="#" onclick="showOnly('spieler')">Vereinsspieler</a></li>
            <li><a href="#" onclick="showOnly('galerie')">Bildergalerie</a></li>
            <li><a href="#" onclick="showOnly('sponsoren-list')">Sponsoren</a></li>
            <li class="dropdown">
                <a href="#">Veranstaltungen ▼</a>
                <ul class="dropdown-content">
                    <li><a href="#" onclick="showOnly('spieltag')">Spieltag</a></li>
                    <li><a href="#" onclick="showOnly('ligatabelle')">Ligatabelle</a></li>
                </ul>
            </li>
            <li><a href="#" onclick="showOnly('sonstiges')">Sonstiges</a></li>
            <li><a href="#" onclick="showOnly('aktuelles')">Aktuelles</a></li>
            <li><a href="#" onclick="showOnly('kontakt')">Kontakt</a></li>
            <li><a href="#" onclick="showOnly('adresse')">Adresse</a></li>
        </ul>
    </nav>
    
    <section id="bio">
        <h2>Folge uns</h2>
        <p>
            <a href="https://www.instagram.com/spitzbuwe/" target="_blank">
                <img src="instagram.png" alt="Instagram" style="width: 30px; height: auto;"> Instagram
            </a>
            <a href="https://www.facebook.com/profile.php?id=61574211682391" target="_blank">
                <img src="facebook.png" alt="Facebook" style="width: 30px; height: auto;"> Facebook
            </a>
        </p>
        <h2>Über uns</h2>
        <p>Wir sind die Dart-Abteilung des VfL Weierbach, gegründet am 01. März 2025. Unser Training findet jeden Donnerstag ab 18 Uhr im Vereinsheim statt. Ab September nehmen wir an der EHM-Liga teil. Derzeit besteht unser Team aus 11 aktiven Spielern. 🎯</p>
    </section>
    
    <footer style="text-align: center; padding: 10px;">
        <p>&copy; 2025 Dart-Abteilung Spitzbuwe Weierbach</p>
    </footer>
</body>
</html>
