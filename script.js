// Enhanced JavaScript untuk YouTube Embed dengan Custom Controls
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const videoPlaceholder = document.getElementById('video-placeholder');
    const playOverlay = document.getElementById('play-overlay');
    const youtubeEmbed = document.getElementById('youtube-embed');
    const customControls = document.getElementById('custom-controls');
    
    // Custom control buttons
    const playPauseBtn = document.getElementById('play-pause-btn');
    const muteBtn = document.getElementById('mute-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    
    let youtubePlayer;
    let isPlaying = false;
    let isMuted = false;

    // YouTube API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize YouTube Player
    window.onYouTubeIframeAPIReady = function() {
        youtubePlayer = new YT.Player('youtube-embed', {
            height: '100%',
            width: '100%',
            videoId: 'oeJ3JHggXVA',
            playerVars: {
                'autoplay': 0,
                'controls': 0, // Sembunyikan kontrol default YouTube
                'disablekb': 1,
                'fs': 0, // Nonaktifkan fullscreen button
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerReady(event) {
        console.log('YouTube Player Ready');
        // Sembunyikan placeholder saat player siap
        customControls.style.display = 'flex';
    }

    function onPlayerStateChange(event) {
        // Update UI berdasarkan status player
        if (event.data === YT.PlayerState.PLAYING) {
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoPlaceholder.classList.add('hidden');
            createClickParticles({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
        } else if (event.data === YT.PlayerState.PAUSED) {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else if (event.data === YT.PlayerState.ENDED) {
            isPlaying = false;
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoPlaceholder.classList.remove('hidden');
        }
    }

    // Click on video placeholder to play
    videoPlaceholder.addEventListener('click', function() {
        playVideo();
    });

    playOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        playVideo();
    });

    function playVideo() {
        if (youtubePlayer) {
            youtubePlayer.playVideo();
            isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoPlaceholder.classList.add('hidden');
            createClickParticles({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 });
        }
    }

    // Custom Controls
    playPauseBtn.addEventListener('click', function() {
        if (youtubePlayer) {
            if (isPlaying) {
                youtubePlayer.pauseVideo();
            } else {
                youtubePlayer.playVideo();
            }
        }
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
            createButtonParticles(muteBtn);
        }
    });

    fullscreenBtn.addEventListener('click', function() {
        const videoContainer = document.querySelector('.video-container');
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        createButtonParticles(fullscreenBtn);
    });

    // TikTok button click tracking
    const tiktokBtn = document.querySelector('.tiktok-btn');
    tiktokBtn.addEventListener('click', function() {
        console.log('TikTok follow button clicked');
        createButtonParticles(this);
    });

    // Initialize all particle systems
    initParticleCanvas();
    initFloatingParticles();
    initSparkleEffects();

    console.log('Dracin Abiez Landing Page Loaded - Enhanced YouTube Player');
});

// Particle Systems (sama seperti sebelumnya)
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
    const posX = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
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
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
    
    setInterval(createSparkle, 300);
    
    for (let i = 0; i < 8; i++) {
        setTimeout(createSparkle, i * 150);
    }
}

function createClickParticles(event) {
    const container = document.getElementById('floating-particles');
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 40 + 20;
        const duration = Math.random() * 1 + 0.5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.animation = `clickParticle ${duration}s forwards`;
        
        if (!document.getElementById('clickParticleKeyframes')) {
            const style = document.createElement('style');
            style.id = 'clickParticleKeyframes';
            style.textContent = `
                @keyframes clickParticle {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 4 + 1;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 25 + 10;
        const duration = Math.random() * 0.8 + 0.3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.background = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`;
        particle.style.animation = `buttonParticle ${duration}s forwards`;
        
        if (!document.getElementById('buttonParticleKeyframes')) {
            const style = document.createElement('style');
            style.id = 'buttonParticleKeyframes';
            style.textContent = `
                @keyframes buttonParticle {
                    0% { transform: translate(0, 0) scale(1); opacity: 1; }
                    100% { transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.getElementById('floating-particles').appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}
