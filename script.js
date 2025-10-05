// Enhanced JavaScript dengan Aggressive Popunder Strategy
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const videoPlaceholder = document.getElementById('video-placeholder');
    const playOverlay = document.getElementById('play-overlay');
    const youtubeCropped = document.getElementById('youtube-cropped');
    const customControls = document.getElementById('custom-controls');
    const popunderOverlay = document.getElementById('popunder-overlay');
    
    // Custom control buttons
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');
    const progressContainer = document.getElementById('progress-container');
    const clickAreas = document.querySelectorAll('.click-area');
    
    let youtubePlayer;
    let isPlaying = false;
    let isMuted = false;
    let lastActionTime = 0;
    let actionCount = 0;
    const ACTION_COOLDOWN = 3000; // 3 detik cooldown
    const MAX_ACTIONS_BEFORE_POP = 3; // Setelah 3 aksi, trigger popunder

    // Popunder trigger function
    function triggerPopunder() {
        try {
            // Simulate click pada element hidden untuk trigger popunder
            const hiddenLink = document.createElement('a');
            hiddenLink.href = 'javascript:void(0)';
            hiddenLink.style.display = 'none';
            document.body.appendChild(hiddenLink);
            hiddenLink.click();
            document.body.removeChild(hiddenLink);
            
            console.log('Popunder triggered');
            actionCount = 0; // Reset counter
        } catch (e) {
            console.log('Popunder trigger failed:', e);
        }
    }

    // Action tracker dengan cooldown
    function trackAction() {
        const now = Date.now();
        if (now - lastActionTime > ACTION_COOLDOWN) {
            actionCount++;
            lastActionTime = now;
            
            console.log(`Action count: ${actionCount}`);
            
            if (actionCount >= MAX_ACTIONS_BEFORE_POP) {
                triggerPopunder();
            }
        }
    }

    // YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        youtubePlayer = new YT.Player('youtube-cropped', {
            height: '100%',
            width: '100%',
            videoId: 'vXsTBYCjPlQ',
            playerVars: {
                'autoplay': 0,
                'controls': 0,
                'disablekb': 1,
                'fs': 0,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3,
                'playsinline': 1,
                'enablejsapi': 1,
                'origin': window.location.origin,
                'cc_load_policy': 0,
                'hl': 'id',
                'cc_lang_pref': 'id',
                'autohide': 1,
                'wmode': 'transparent'
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        console.log('YouTube Player Ready - Aggressive Mode');
        customControls.style.display = 'flex';
        progressContainer.style.display = 'block';
        
        // Enable popunder overlay
        setTimeout(() => {
            popunderOverlay.style.pointerEvents = 'auto';
        }, 5000); // Enable setelah 5 detik
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoPlaceholder.classList.add('hidden');
            trackAction(); // Track play action
        } else if (event.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            trackAction(); // Track pause action
        } else if (event.data === YT.PlayerState.ENDED) {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoPlaceholder.classList.remove('hidden');
            triggerPopunder(); // Auto popunder ketika video selesai
        }
    }

    // Video control functions dengan action tracking
    function playVideo() {
        if (youtubePlayer) {
            youtubePlayer.playVideo();
            trackAction();
        }
    }

    function pauseVideo() {
        if (youtubePlayer) {
            youtubePlayer.pauseVideo();
            trackAction();
        }
    }

    function seekVideo(seconds) {
        if (youtubePlayer) {
            const currentTime = youtubePlayer.getCurrentTime();
            youtubePlayer.seekTo(currentTime + seconds, true);
            trackAction();
        }
    }

    // Event listeners dengan action tracking
    videoPlaceholder.addEventListener('click', function() {
        playVideo();
        trackAction();
    });

    playOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        playVideo();
        trackAction();
    });

    playPauseBtn.addEventListener('click', function() {
        if (youtubePlayer) {
            if (isPlaying) {
                pauseVideo();
            } else {
                playVideo();
            }
        }
        trackAction();
    });

    muteBtn.addEventListener('click', function() {
        if (youtubePlayer) {
            if (isMuted) {
                youtubePlayer.unMute();
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                isMuted = false;
            } else {
                youtubePlayer.mute();
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                isMuted = true;
            }
            trackAction();
        }
    });

    fullscreenBtn.addEventListener('click', function() {
        const videoContainer = document.querySelector('.video-container');
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        trackAction();
    });

    // Skip controls
    rewindBtn.addEventListener('click', function() {
        seekVideo(-10);
        trackAction();
    });

    forwardBtn.addEventListener('click', function() {
        seekVideo(10);
        trackAction();
    });

    // Progress bar click areas
    clickAreas.forEach(area => {
        area.addEventListener('click', function(e) {
            const action = this.getAttribute('data-action');
            if (action === 'rewind') {
                seekVideo(-10);
            } else if (action === 'forward') {
                seekVideo(10);
            }
            trackAction();
            e.stopPropagation();
        });
    });

    // Popunder overlay click (transparan tapi clickable)
    popunderOverlay.addEventListener('click', function() {
        triggerPopunder();
    });

    // Additional triggers - klik dimanapun di video container
    document.querySelector('.video-container').addEventListener('click', function(e) {
        // Skip jika klik pada control buttons
        if (!e.target.closest('.control-btn') && !e.target.closest('.play-overlay')) {
            trackAction();
        }
    });

    // TikTok button
    const tiktokBtn = document.querySelector('.tiktok-btn');
    tiktokBtn.addEventListener('click', function() {
        console.log('TikTok follow button clicked');
        trackAction();
    });

    // Initialize particle systems
    initParticleCanvas();
    initFloatingParticles();
    initSparkleEffects();

    console.log('Dracin Abiez - Aggressive Popunder Mode Activated');
});

// Particle systems (sama seperti sebelumnya)
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, 
                         ${Math.floor(Math.random() * 100 + 155)}, 
                         ${Math.floor(Math.random() * 100 + 155)}, 
                         ${Math.random() * 0.3 + 0.1})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initFloatingParticles() {
    const container = document.getElementById('floating-particles');
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(container);
    }
    setInterval(() => {
        if (container.children.length < particleCount) {
            createFloatingParticle(container);
        }
    }, 2000);
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    const size = Math.random() * 6 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    container.appendChild(particle);
    setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
    }, 15000);
}

function initSparkleEffects() {
    const container = document.getElementById('sparkle-container');
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(sparkle);
        setTimeout(() => {
            if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
        }, 1500);
    }
    setInterval(createSparkle, 300);
    for (let i = 0; i < 8; i++) setTimeout(createSparkle, i * 150);
}
