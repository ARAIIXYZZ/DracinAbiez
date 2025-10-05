// Simple JavaScript untuk TikTok Redirect dan Particle Effects
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const playOverlay = document.querySelector('.play-overlay');
    
    let isPlaying = false;

    // Click on video to play/pause (simulasi)
    videoPlaceholder.addEventListener('click', function() {
        if (!isPlaying) {
            // Simulate play action
            playOverlay.style.opacity = '0';
            isPlaying = true;
            
            // Create click particles
            createClickParticles(event);
            
            // Di sini nanti bisa diganti dengan embed video asli
            console.log('Video playing...');
            
        } else {
            // Simulate pause action
            playOverlay.style.opacity = '1';
            isPlaying = false;
            console.log('Video paused...');
        }
    });

    // TikTok button click tracking
    const tiktokBtn = document.querySelector('.tiktok-btn');
    tiktokBtn.addEventListener('click', function() {
        // Simulate analytics tracking
        console.log('TikTok follow button clicked');
        createButtonParticles(this);
        
        // Bisa ditambah Google Analytics atau tracking lain di sini
        // gtag('event', 'tiktok_follow_click');
    });

    // Initialize all particle systems
    initParticleCanvas();
    initFloatingParticles();
    initSparkleEffects();

    console.log('Dracin Abiez Landing Page Loaded - Enhanced with Particles');
});

// Particle Canvas System
function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Particle array
    const particles = [];
    const particleCount = 150;
    
    // Create particles
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
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Floating Particles System
function initFloatingParticles() {
    const container = document.getElementById('floating-particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createFloatingParticle(container);
    }
    
    // Add new particles periodically
    setInterval(() => {
        if (container.children.length < particleCount) {
            createFloatingParticle(container);
        }
    }, 2000);
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    // Random properties
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
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// Sparkle Effects System
function initSparkleEffects() {
    const container = document.getElementById('sparkle-container');
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        // Random delay
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
    
    // Create sparkles periodically
    setInterval(createSparkle, 200);
    
    // Initial sparkles
    for (let i = 0; i < 10; i++) {
        setTimeout(createSparkle, i * 100);
    }
}

// Click Particle Effect
function createClickParticles(event) {
    const container = document.getElementById('floating-particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 8 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const duration = Math.random() * 1 + 0.5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particle.style.animation = `clickParticle ${duration}s forwards`;
        
        // Custom animation for click particles
        const keyframes = `
            @keyframes clickParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        // Add keyframes if not already added
        if (!document.getElementById('clickParticleKeyframes')) {
            const style = document.createElement('style');
            style.id = 'clickParticleKeyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}

// Button Particle Effect
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        const size = Math.random() * 6 + 2;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 30 + 10;
        const duration = Math.random() * 1 + 0.3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${rect.left + rect.width / 2}px`;
        particle.style.top = `${rect.top + rect.height / 2}px`;
        particle.style.background = `hsl(${Math.random() * 60 + 300}, 70%, 60%)`; // Purple colors
        particle.style.animation = `buttonParticle ${duration}s forwards`;
        
        // Custom animation for button particles
        const keyframes = `
            @keyframes buttonParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0);
                    opacity: 0;
                }
            }
        `;
        
        // Add keyframes if not already added
        if (!document.getElementById('buttonParticleKeyframes')) {
            const style = document.createElement('style');
            style.id = 'buttonParticleKeyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        document.getElementById('floating-particles').appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
}
