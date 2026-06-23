document.addEventListener('DOMContentLoaded', () => {
    initEnvelope();
    initCountdown();
    initMusic();
    initPlaylist();
    initCalendar();
    initScrollFade();
    initCountUp();
    initStoryReveal();
    initLightbox();
    initItineraryReveal();
});

function initMusic() {
    const music = document.getElementById('bg-music');
    const playlistMusic = document.getElementById('playlist-music');
    const toggle = document.getElementById('music-toggle');
    const icon = document.getElementById('music-icon');
    let isPlaying = false;

    if (!music || !toggle || !icon) return;

    const setIcons = () => {
        icon.innerHTML = isPlaying
            ? '<img src="img/iconos/boton-de-pausa.png" alt="Pausar" width="16" height="16" style="display:block;">'
            : '<img src="img/iconos/Play.png" alt="Reproducir" width="16" height="16" style="display:block;">';
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

    // Mobile auto-collapse: show title briefly, then shrink to play/pause FAB
    const player = document.getElementById('music-player');
    if (player) {
        const mql = window.matchMedia('(max-width: 760px)');
        let collapseTimer = null;
        const scheduleCollapse = () => {
            clearTimeout(collapseTimer);
            if (!mql.matches) {
                player.classList.remove('is-collapsed');
                return;
            }
            collapseTimer = setTimeout(() => {
                player.classList.add('is-collapsed');
            }, 3000);
        };
        const expandPlayer = () => {
            player.classList.remove('is-collapsed');
            scheduleCollapse();
        };
        if (mql.matches) {
            scheduleCollapse();
        }
        mql.addEventListener('change', (e) => {
            if (e.matches) scheduleCollapse();
            else player.classList.remove('is-collapsed');
        });
        player.addEventListener('click', (e) => {
            if (e.target === player && player.classList.contains('is-collapsed')) {
                expandPlayer();
            }
        });
        toggle.addEventListener('click', expandPlayer);
    }
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
        icon.innerHTML = isPlaying
            ? '<img src="img/iconos/boton-de-pausa.png" alt="Pausar" width="22" height="22" style="display:block;">'
            : '<img src="img/iconos/Play.png" alt="Reproducir" width="22" height="22" style="display:block;">';
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
        syncVinyl(true);
    });

    music.addEventListener('pause', () => {
        isPlaying = false;
        setIcons();
        syncVinyl(false);
    });

    setIcons();
    toggle.addEventListener('click', toggleMusic);
    if (prevButton) prevButton.addEventListener('click', () => changeTrack(-1));
    if (nextButton) nextButton.addEventListener('click', () => changeTrack(1));
}

function syncVinyl(playing) {
    const vinyl = document.getElementById('vinyl');
    if (!vinyl) return;
    vinyl.classList.toggle('is-playing', playing);
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
    const btn = document.getElementById('hero-cal-link');
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

function initScrollFade() {
    const targets = document.querySelectorAll('.fade-in');
    if (!('IntersectionObserver' in window) || !targets.length) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => io.observe(el));
}

function initCountUp() {
    const nums = document.querySelectorAll('.section-num[data-num]');
    if (!nums.length) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        nums.forEach((el) => { el.textContent = el.dataset.num; });
        return;
    }
    if (!('IntersectionObserver' in window)) {
        nums.forEach((el) => { el.textContent = el.dataset.num; });
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.num, 10);
            animateCount(el, target);
            io.unobserve(el);
        });
    }, { threshold: 0.5 });
    nums.forEach((el) => io.observe(el));
}

function animateCount(el, target) {
    const dur = 1400;
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.floor(eased * target);
        el.textContent = String(value).padStart(2, '0');
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = String(target).padStart(2, '0');
    }
    requestAnimationFrame(step);
}

function initStoryReveal() {
    const paragraphs = document.querySelectorAll('.story-p');
    if (!paragraphs.length) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        paragraphs.forEach((p) => p.classList.add('is-revealed'));
        return;
    }
    if (!('IntersectionObserver' in window)) {
        paragraphs.forEach((p) => p.classList.add('is-revealed'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('is-revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
    paragraphs.forEach((p) => io.observe(p));
}

function initItineraryReveal() {
    const section = document.querySelector('.itinerary');
    if (!section) return;
    const events = section.querySelectorAll('.day-event');
    if (!events.length) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        events.forEach((e) => e.classList.add('is-revealed'));
        return;
    }
    if (!('IntersectionObserver' in window)) {
        events.forEach((e) => e.classList.add('is-revealed'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            events.forEach((ev, i) => {
                setTimeout(() => ev.classList.add('is-revealed'), i * 110);
            });
            io.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    io.observe(section);
}

function initLightbox() {
    const dialog = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (!dialog || !img) return;

    const cells = document.querySelectorAll('.gallery-cell');
    cells.forEach((cell) => {
        cell.addEventListener('click', () => {
            const src = cell.getAttribute('data-full') || cell.querySelector('img')?.src;
            if (!src) return;
            img.src = src;
            img.alt = cell.querySelector('img')?.alt || '';
            if (typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                dialog.setAttribute('open', '');
            }
        });
    });

    const close = () => {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
        img.src = '';
    };

    dialog.querySelector('.lightbox-close')?.addEventListener('click', close);
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dialog.open) close();
    });
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


/* ── Envelope Cover — PNG frame animation ── */
function initEnvelope() {
    const cover       = document.getElementById('envelope-cover');
    const envImg      = document.getElementById('envelope-img');
    const cta         = document.getElementById('envelope-cta');
    const bgMusic     = document.getElementById('bg-music');
    const musicPlayer = document.getElementById('music-player');

    if (!cover) return;

    /* Preload all animation frames in memory */
    const TOTAL_FRAMES = 49;
    const frameCache = [];
    let framesLoaded = 0;
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = 'img/animacion-sobre/ezgif-frame-' + String(i).padStart(3, '0') + '-Photoroom_' + i + '_11zon.webp';
        img.onload = () => { framesLoaded++; };
        frameCache[i] = img;
    }

    /* Start background music already playing on page load */
    if (bgMusic) {
        bgMusic.volume = 0.25;
        bgMusic.play().catch(() => {});
    }
    if (musicPlayer) musicPlayer.style.display = 'flex';

    let opened = false;
    let animFrame = 5; /* start from frame 6, frame 5 is already shown */
    let animTimer = null;
    let coverFaded = false;

    function animateEnvelope() {
        animFrame++;

        /* Fade out the cover at frame 30 — flash reveals the invitation before animation ends */
        if (!coverFaded && animFrame >= 30) {
            cover.classList.add('is-done');
            coverFaded = true;
            if (musicPlayer) musicPlayer.style.display = 'flex';
        }

        if (animFrame > TOTAL_FRAMES) {
            /* Animation finished */
            clearTimeout(animTimer);
            return;
        }
        const padded = String(animFrame).padStart(3, '0');
        envImg.src = 'img/animacion-sobre/ezgif-frame-' + padded + '-Photoroom_' + animFrame + '_11zon.webp';
        animTimer = setTimeout(animateEnvelope, 50); /* ~20fps */
    }

    function openEnvelope() {
        if (opened) return;
        opened = true;
        clearTimeout(autoStartTimer);

        /* Start the frame animation */
        animateEnvelope();

        /* Start music softly — fade it in */
        if (bgMusic) {
            bgMusic.volume = 0;
            bgMusic.play().catch(() => {});
            let vol = 0;
            const fadeIn = setInterval(() => {
                vol = Math.min(vol + 0.012, 0.25);
                bgMusic.volume = parseFloat(vol.toFixed(3));
                if (vol >= 0.25) clearInterval(fadeIn);
            }, 50);
        }

        /* Hide CTA text */
        if (cta) cta.classList.add('is-hidden');
    }

    /* Auto-start animation after 10 seconds if user hasn't clicked */
    let autoStartTimer = setTimeout(() => {
        if (!opened) {
            openEnvelope();
        }
    }, 10000);

    /* Any click anywhere on the cover opens the envelope */
    cover.addEventListener('click', openEnvelope);
    cover.addEventListener('touchend', (e) => {
        e.preventDefault();
        openEnvelope();
    }, { passive: false });
}
