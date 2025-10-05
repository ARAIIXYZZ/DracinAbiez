// Simple JavaScript untuk TikTok Redirect
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
        
        // Bisa ditambah Google Analytics atau tracking lain di sini
        // gtag('event', 'tiktok_follow_click');
    });

    console.log('Dracin Abiez Landing Page Loaded - Simple TikTok Redirect');
});
