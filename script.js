// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const expandBtn = document.querySelector('.expand-btn');
    const playOverlay = document.querySelector('.play-overlay');
    const playPauseBtn = document.querySelector('.play-pause');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    let isExpanded = false;
    let isPlaying = false;

    // Expand/Collapse Functionality
    expandBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (!isExpanded) {
            // Switch to landscape (16:9)
            videoContainer.classList.remove('portrait-mode');
            videoContainer.classList.add('landscape-mode');
            expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
            isExpanded = true;
        } else {
            // Switch back to portrait (9:16)
            videoContainer.classList.remove('landscape-mode');
            videoContainer.classList.add('portrait-mode');
            expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
            isExpanded = false;
        }
    });

    // Play/Pause Functionality
    function togglePlayPause() {
        if (!isPlaying) {
            // Simulate play action
            playOverlay.style.opacity = '0';
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            
            // Simulate video progress
            simulateVideoProgress();
            isPlaying = true;
        } else {
            // Simulate pause action
            playOverlay.style.opacity = '1';
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    }

    // Click on video placeholder to play/pause
    videoPlaceholder.addEventListener('click', function(e) {
        if (e.target.closest('.video-controls')) return;
        togglePlayPause();
    });

    // Click on play/pause button
    playPauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlayPause();
    });

    // Click on play overlay
    playOverlay.addEventListener('click', function(e) {
        e.stopPropagation();
        togglePlayPause();
    });

    // Simulate video progress
    function simulateVideoProgress() {
        if (!isPlaying) return;
        
        const progress = document.querySelector('.progress');
        const timeDisplay = document.querySelector('.time');
        let currentTime = 525; // 8:45 in seconds
        const totalTime = 1470; // 24:30 in seconds
        
        const interval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(interval);
                return;
            }
            
            currentTime += 1;
            if (currentTime > totalTime) {
                currentTime = 0;
                togglePlayPause(); // Auto pause when finished
            }
            
            const progressPercent = (currentTime / totalTime) * 100;
            progress.style.width = progressPercent + '%';
            
            // Update time display
            const currentMinutes = Math.floor(currentTime / 60);
            const currentSeconds = currentTime % 60;
            const totalMinutes = Math.floor(totalTime / 60);
            const totalSeconds = totalTime % 60;
            
            timeDisplay.textContent = 
                `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
                
        }, 1000);
    }

    // TikTok button click tracking
    const tiktokBtn = document.querySelector('.tiktok-btn');
    tiktokBtn.addEventListener('click', function() {
        // Simulate analytics tracking
        console.log('TikTok follow button clicked');
        // Add your analytics code here
    });

    // Auto-hide controls after 3 seconds
    let controlsTimeout;
    function hideControls() {
        const videoControls = document.querySelector('.video-controls');
        videoControls.style.opacity = '0';
    }

    function showControls() {
        const videoControls = document.querySelector('.video-controls');
        videoControls.style.opacity = '1';
        
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(hideControls, 3000);
    }

    // Show controls on mouse move (for desktop) and touch (for mobile)
    videoContainer.addEventListener('mousemove', showControls);
    videoContainer.addEventListener('touchstart', showControls);

    // Initialize controls timeout
    controlsTimeout = setTimeout(hideControls, 3000);

    console.log('Dracin Abiez Landing Page Loaded - TikTok Redirect Ready');
});
