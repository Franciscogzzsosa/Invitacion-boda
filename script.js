document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initMusic();
    initPlaylist();
    initCalendar();
});

function initMusic() {
    const music = document.getElementById('bg-music');
    const playlistMusic = document.getElementById('playlist-music');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    let isPlaying = false;

    if (!music || !toggle || !icon) return;

    const setIcons = () => {
        icon.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9654;';
    };

    const toggleMusic = () => {
        if (isPlaying) {
            music.pause();
            return;
        }

        if (playlistMusic && !playlistMusic.paused) {
            playlistMusic.pause();
        }

        music.play().then(() => {
            isPlaying = true;
            setIcons();
        }).catch(() => {
            isPlaying = false;
            setIcons();
        });
    };

    music.volume = 0.25;

    music.addEventListener('play', () => {
        if (playlistMusic && !playlistMusic.paused) {
            playlistMusic.pause();
        }
        isPlaying = true;
        setIcons();
    });

    music.addEventListener('pause', () => {
        isPlaying = false;
        setIcons();
    });

    setIcons();
    toggle.addEventListener('click', toggleMusic);
}

function initPlaylist() {
    const music = document.getElementById('playlist-music');
    const mainMusic = document.getElementById('bg-music');
    const toggle = document.getElementById('section-music-toggle');
    const icon = document.getElementById('section-music-icon');
    const prevButton = document.getElementById('section-prev');
    const nextButton = document.getElementById('section-next');
    const sectionTitle = document.getElementById('section-song-title');
    const sectionArtist = document.getElementById('section-song-artist');
    const trackCount = document.getElementById('track-count');
    const playlist = [
        {
            title: 'Angel',
            artist: 'Sarah McLachlan',
            src: 'playlist/Sarah McLachlan - Angel (SPOTISAVER).mp3'
        },
        {
            title: 'Para Siempre',
            artist: 'Kany Garcia',
            src: 'playlist/Kany García - Para Siempre (SPOTISAVER).mp3'
        },
        {
            title: 'Hasta Que Me Olvides',
            artist: 'Luis Miguel',
            src: 'playlist/Luis Miguel - Hasta Que Me Olvides (SPOTISAVER).mp3'
        },
        {
            title: 'Nunca Te Olvidare',
            artist: 'Enrique Iglesias',
            src: 'playlist/Enrique Iglesias - Nunca Te Olvidaré (SPOTISAVER).mp3'
        },
        {
            title: "Stumblin' In",
            artist: 'CYRIL',
            src: "playlist/CYRIL - Stumblin' In (SPOTISAVER).mp3"
        },
        {
            title: 'Vivir Mi Vida',
            artist: 'Marc Anthony',
            src: 'playlist/Marc Anthony - Vivir Mi Vida (SPOTISAVER).mp3'
        },
        {
            title: '(Everything I Do) I Do It For You',
            artist: 'Bryan Adams',
            src: 'playlist/Bryan Adams - (Everything I Do) I Do It For You (SPOTISAVER).mp3'
        },
        {
            title: 'This Will Be',
            artist: 'Natalie Cole',
            src: 'playlist/Natalie Cole - This Will Be (An Everlasting Love) (SPOTISAVER).mp3'
        },
        {
            title: 'Colgando en tus manos',
            artist: 'Carlos Baute, Marta Sanchez',
            src: 'playlist/Carlos Baute - Colgando en tus manos - con Marta Sánchez Directo 09 (SPOTISAVER).mp3'
        },
        {
            title: 'La Venia Bendita',
            artist: 'Marco Antonio Solis',
            src: 'playlist/Marco Antonio Solís - La Venia Bendita (SPOTISAVER).mp3'
        },
        {
            title: 'Tu Y Yo Somos Uno Mismo',
            artist: 'Timbiriche',
            src: 'playlist/Timbiriche - Tú Y Yo Somos Uno Mismo (SPOTISAVER).mp3'
        },
        {
            title: 'Amigos Para Siempre',
            artist: 'Jose Carreras, Sarah Brightman',
            src: 'playlist/José Carreras, Sarah Brightman - Amigos Para Siempre - Friends for Life (SPOTISAVER).mp3'
        },
        {
            title: 'El Privilegio De Amar',
            artist: 'Mijares, Lucero',
            src: 'playlist/Mijares, Lucero - El Privilegio De Amar (SPOTISAVER).mp3'
        },
        {
            title: 'Something About The Way You Look Tonight',
            artist: 'Elton John',
            src: 'playlist/Elton John - Something About The Way You Look Tonight - Edit Version (SPOTISAVER).mp3'
        },
        {
            title: 'Edge of Desire',
            artist: 'Jonas Blue, Malive',
            src: 'playlist/Jonas Blue, Malive - Edge of Desire (SPOTISAVER).mp3'
        },
        {
            title: 'The Sound of Silence',
            artist: 'Disturbed, CYRIL',
            src: 'playlist/Disturbed, CYRIL - The Sound of Silence - CYRIL Remix (SPOTISAVER).mp3'
        },
        {
            title: 'Piu bella cosa',
            artist: 'Eros Ramazzotti',
            src: 'playlist/Eros Ramazzotti - Più bella cosa (SPOTISAVER).mp3'
        },
        {
            title: 'A Sky Full of Stars',
            artist: 'Coldplay',
            src: 'playlist/Coldplay - A Sky Full of Stars (SPOTISAVER).mp3'
        },
        {
            title: 'Ordinary',
            artist: 'Alex Warren',
            src: 'playlist/Alex Warren - Ordinary - Wedding Version (SPOTISAVER).mp3'
        },
        {
            title: 'Azul',
            artist: 'Cristian Castro',
            src: 'playlist/Cristian Castro - Azul (SPOTISAVER).mp3'
        }
    ];
    let currentTrack = 0;
    let isPlaying = false;

    if (!music || !toggle || !icon) return;

    const updateTrackText = () => {
        const track = playlist[currentTrack];
        if (!track) return;
        if (sectionTitle) sectionTitle.textContent = track.title;
        if (sectionArtist) sectionArtist.textContent = track.artist;
        if (trackCount) trackCount.textContent = `${currentTrack + 1} / ${playlist.length}`;
    };

    const loadTrack = (index) => {
        currentTrack = (index + playlist.length) % playlist.length;
        const track = playlist[currentTrack];
        music.src = encodeURI(track.src);
        music.load();
        updateTrackText();
    };

    const setIcons = () => {
        icon.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9654;';
    };

    const playCurrentTrack = () => {
        if (mainMusic && !mainMusic.paused) {
            mainMusic.pause();
        }

        music.play().then(() => {
            isPlaying = true;
            setIcons();
        }).catch(() => {
            isPlaying = false;
            setIcons();
        });
    };

    const toggleMusic = () => {
        if (isPlaying) {
            music.pause();
            return;
        }

        playCurrentTrack();
    };

    const changeTrack = (step) => {
        const shouldKeepPlaying = isPlaying;
        loadTrack(currentTrack + step);
        if (shouldKeepPlaying) playCurrentTrack();
        setIcons();
    };

    music.volume = 0.25;
    loadTrack(0);

    music.addEventListener('ended', () => {
        loadTrack(currentTrack + 1);
        playCurrentTrack();
    });

    music.addEventListener('play', () => {
        if (mainMusic && !mainMusic.paused) {
            mainMusic.pause();
        }
        isPlaying = true;
        setIcons();
    });

    music.addEventListener('pause', () => {
        isPlaying = false;
        setIcons();
    });

    setIcons();
    toggle.addEventListener('click', toggleMusic);
    if (prevButton) prevButton.addEventListener('click', () => changeTrack(-1));
    if (nextButton) nextButton.addEventListener('click', () => changeTrack(1));
}

function initCountdown() {
    const weddingDate = new Date('2026-12-05T17:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function initCalendar() {
    const btn = document.getElementById('calendar-btn');
    const footerBtn = document.getElementById('footer-calendar-btn');
    if (!btn && !footerBtn) return;

    const openCalendar = () => {
        const event = {
            title: 'Boda de Victor & Alicia',
            location: 'Hacienda San Matías, Guanajuato, Gto.',
            description: '¡Nos casamos! Acompáñanos a celebrar nuestro amor.',
            startTime: '2026-12-05T17:00:00',
            endTime: '2026-12-06T01:00:00'
        };

        const googleUrl = buildGoogleCalendarUrl(event);
        window.open(googleUrl, '_blank');
    };

    if (btn) btn.addEventListener('click', openCalendar);
    if (footerBtn) footerBtn.addEventListener('click', openCalendar);
}

function buildGoogleCalendarUrl(event) {
    const formatDate = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: `${formatDate(event.startTime)}/${formatDate(event.endTime)}`,
        details: event.description,
        location: event.location
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildICalContent(event) {
    const formatICalDate = (iso) => iso.replace(/[-:]/g, '').replace(/\.\d{3}/, '');

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICalDate(event.startTime)}
DTEND:${formatICalDate(event.endTime)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;
}
