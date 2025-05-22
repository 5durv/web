document.addEventListener('DOMContentLoaded', function() {
    const platformBtns = document.querySelectorAll('.platform-btn');
    const videoUrlInput = document.getElementById('video-url');
    const downloadBtn = document.getElementById('download-btn');
    const resultContainer = document.getElementById('result-container');
    const videoPreview = document.getElementById('video-preview');
    const qualityBtns = document.querySelectorAll('.quality-btn');
    const formatBtns = document.querySelectorAll('.format-btn');
    const finalDownloadBtn = document.getElementById('final-download-btn');
    const playVideoBtn = document.getElementById('play-video-btn');
    
    let currentPlatform = 'tiktok';
    let videoData = null;
    let isPlaying = false;
    
    // تغيير المنصة
    platformBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            platformBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentPlatform = this.getAttribute('data-platform');
            videoUrlInput.placeholder = `ضع رابط فيديو ${getPlatformName(currentPlatform)} هنا...`;
        });
    });
    
    // زر التحميل الرئيسي
    downloadBtn.addEventListener('click', function() {
        const url = videoUrlInput.value.trim();
        if (url) {
            // في الواقع، هنا ستقوم بإرسال طلب إلى الخادم للصورة
            // لكن في هذا المثال سنستخدم محاكاة بسيطة
            
            // إظهار قسم النتائج
            resultContainer.style.display = 'block';
            
            // عرض معاينة الفيديو (صورة مصغرة)
            showThumbnail(url, currentPlatform);
            
            // تخزين بيانات الفيديو (محاكاة)
            videoData = {
                url: url,
                platform: currentPlatform,
                title: `فيديو من ${getPlatformName(currentPlatform)}`,
                formats: ['mp4', 'mp3'],
                qualities: ['high', 'medium', 'low']
            };
            
            // التمرير إلى قسم النتائج
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // أزرار الجودة
    qualityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            qualityBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // أزرار الصيغة
    formatBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            formatBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // زر التحميل النهائي
    finalDownloadBtn.addEventListener('click', function() {
        if (videoData) {
            const quality = document.querySelector('.quality-btn.active').getAttribute('data-quality');
            const format = document.querySelector('.format-btn.active').getAttribute('data-format');
            const withWatermark = document.getElementById('watermark-option').checked;
            
            // في الواقع، هنا ستقوم بإرسال طلب إلى الخادم لتحميل الفيديو
            // لكن في هذا المثال سنعرض رسالة تأكيد فقط
            alert(`جاري تحميل الفيديو بجودة ${getQualityName(quality)} وبصيغة ${format.toUpperCase()}${withWatermark ? ' مع علامة مائية' : ' بدون علامة مائية'}`);
        }
    });
    
    // زر تشغيل الفيديو
    playVideoBtn.addEventListener('click', function() {
        if (videoData) {
            isPlaying = !isPlaying;
            if (isPlaying) {
                showVideoPreview(videoData.url, videoData.platform);
                playVideoBtn.innerHTML = '<i class="fas fa-stop"></i> إيقاف الفيديو';
            } else {
                showThumbnail(videoData.url, videoData.platform);
                playVideoBtn.innerHTML = '<i class="fas fa-play"></i> تشغيل الفيديو';
            }
        }
    });
    
    // وظائف مساعدة
    function getPlatformName(platform) {
        switch(platform) {
            case 'tiktok': return 'تيك توك';
            case 'youtube': return 'يوتيوب';
            case 'instagram': return 'انستغرام';
            case 'twitter': return 'تويتر (X)';
            default: return platform;
        }
    }
    
    function getQualityName(quality) {
        switch(quality) {
            case 'high': return 'عالية';
            case 'medium': return 'متوسطة';
            case 'low': return 'منخفضة';
            default: return quality;
        }
    }
    
    function extractYoutubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }
    
    function showVideoPreview(url, platform) {
        // في الواقع، هنا ستستخدم API لتضمين الفيديو
        
        let embedHtml = '';
        
        if (platform === 'youtube') {
            // استخراج معرف الفيديو من رابط يوتيوب
            const videoId = extractYoutubeId(url);
            embedHtml = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'tiktok') {
            // محاكاة تضمين تيك توك مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'instagram') {
            // محاكاة تضمين انستغرام مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'twitter') {
            // محاكاة تضمين تويتر مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        }
        
        videoPreview.innerHTML = embedHtml;
        
        // إضافة وظائف لأزرار التحكم
        const playPauseBtn = videoPreview.querySelector('.play-pause');
        const muteBtn = videoPreview.querySelector('.mute');
        const fullscreenBtn = videoPreview.querySelector('.fullscreen');
        const video = videoPreview.querySelector('video');
        
        if (playPauseBtn && video) {
            playPauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (muteBtn && video) {
            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                this.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            });
        }
        
        if (fullscreenBtn && video) {
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }
    }
    
    function showThumbnail(url, platform) {
        let thumbnailHtml = '';
        
        if (platform === 'youtube') {
            const videoId = extractYoutubeId(url);
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;">
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;">
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(255,0,0,0.7);width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;">
                        <i class="fas fa-play" style="color:white;font-size:24px;"></i>
                    </div>
                    <div class="watermark-overlay">@cvry</div>
                </div>
            `;
        } else {
            // للمنصات الأخرى نعرض صورة افتراضية
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;background:#000;display:flex;justify-content:center;align-items:center;">
                    <div style="text-align:center;">
                        <i class="fab fa-${platform}" style="font-size:50px;margin-bottom:20px;color:white;"></i>
                        <p style="color:white;">انقر على زر التشغيل لمشاهدة الفيديو</p>
                    </div>
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,158,73,0.7);width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;">
                        <i class="fas fa-play" style="color:white;font-size:24px;"></i>
                    </div>
                    <div class="watermark-overlay">@cvry</div>
                </div>
            `;
        }
        
        videoPreview.innerHTML = thumbnailHtml;
    }
    
    function extractYoutubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
    
    function showVideoPreview(url, platform) {
        // في الواقع، هنا ستستخدم API لتضمين الفيديو
        
        let embedHtml = '';
        
        if (platform === 'youtube') {
            // استخراج معرف الفيديو من رابط يوتيوب
            const videoId = extractYoutubeId(url);
            embedHtml = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'tiktok') {
            // محاكاة تضمين تيك توك مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'instagram') {
            // محاكاة تضمين انستغرام مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'twitter') {
            // محاكاة تضمين تويتر مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        }
        
        videoPreview.innerHTML = embedHtml;
        
        // إضافة وظائف لأزرار التحكم
        const playPauseBtn = videoPreview.querySelector('.play-pause');
        const muteBtn = videoPreview.querySelector('.mute');
        const fullscreenBtn = videoPreview.querySelector('.fullscreen');
        const video = videoPreview.querySelector('video');
        
        if (playPauseBtn && video) {
            playPauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (muteBtn && video) {
            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                this.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            });
        }
        
        if (fullscreenBtn && video) {
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }
    }
    
    function showThumbnail(url, platform) {
        let thumbnailHtml = '';
        
        if (platform === 'youtube') {
            const videoId = extractYoutubeId(url);
            thumbnailHtml = `
                <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;">
                <div class="watermark-overlay">@cvry</div>
            `;
        } else {
            // للمنصات الأخرى نعرض صورة افتراضية
            thumbnailHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <div style="text-align:center;">
                        <i class="fas fa-image" style="font-size:50px;margin-bottom:20px;"></i>
                        <p>صورة مصغرة للفيديو</p>
                        <div class="watermark-overlay">@cvry</div>
                    </div>
                </div>
            `;
        }
        
        videoPreview.innerHTML = thumbnailHtml;
    }
    
    function extractYoutubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
    
    function showVideoPreview(url, platform) {
        // في الواقع، هنا ستستخدم API لتضمين الفيديو
        
        let embedHtml = '';
        
        if (platform === 'youtube') {
            // استخراج معرف الفيديو من رابط يوتيوب
            const videoId = extractYoutubeId(url);
            embedHtml = `
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'tiktok') {
            // محاكاة تضمين تيك توك مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'instagram') {
            // محاكاة تضمين انستغرام مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        } else if (platform === 'twitter') {
            // محاكاة تضمين تويتر مع عناصر تحكم
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <video width="100%" height="100%" controls autoplay>
                        <source src="${url}" type="video/mp4">
                        متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                </div>
                <div class="video-controls">
                    <button class="play-pause"><i class="fas fa-pause"></i></button>
                    <button class="mute"><i class="fas fa-volume-up"></i></button>
                    <button class="fullscreen"><i class="fas fa-expand"></i></button>
                </div>
            `;
        }
        
        videoPreview.innerHTML = embedHtml;
        
        // إضافة وظائف لأزرار التحكم
        const playPauseBtn = videoPreview.querySelector('.play-pause');
        const muteBtn = videoPreview.querySelector('.mute');
        const fullscreenBtn = videoPreview.querySelector('.fullscreen');
        const video = videoPreview.querySelector('video');
        
        if (playPauseBtn && video) {
            playPauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    this.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    this.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }
        
        if (muteBtn && video) {
            muteBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                this.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            });
        }
        
        if (fullscreenBtn && video) {
            fullscreenBtn.addEventListener('click', function() {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            });
        }
    }
    
    function showThumbnail(url, platform) {
        let thumbnailHtml = '';
        
        if (platform === 'youtube') {
            const videoId = extractYoutubeId(url);
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;">
                    <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:${kurdistanColors.red};width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;">
                        <i class="fas fa-play" style="color:${kurdistanColors.white};font-size:24px;"></i>
                    </div>
                </div>
            `;
        } else if (platform === 'tiktok') {
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;background:${kurdistanColors.green};display:flex;justify-content:center;align-items:center;border-radius:10px;">
                    <div style="text-align:center;">
                        <i class="fab fa-tiktok" style="font-size:50px;margin-bottom:20px;color:${kurdistanColors.white};"></i>
                        <p style="color:${kurdistanColors.white};">انقر للمشاهدة</p>
                    </div>
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:${kurdistanColors.red};width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;">
                        <i class="fas fa-play" style="color:${kurdistanColors.white};font-size:24px;"></i>
                    </div>
                </div>
            `;
        } else if (platform === 'instagram') {
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;background:linear-gradient(45deg, ${kurdistanColors.yellow}, ${kurdistanColors.red});display:flex;justify-content:center;align-items:center;border-radius:10px;">
                    <div style="text-align:center;">
                        <i class="fab fa-instagram" style="font-size:50px;margin-bottom:20px;color:${kurdistanColors.white};"></i>
                        <p style="color:${kurdistanColors.white};">انقر للمشاهدة</p>
                    </div>
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:${kurdistanColors.white};width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;">
                        <i class="fas fa-play" style="color:${kurdistanColors.red};font-size:24px;"></i>
                    </div>
                </div>
            `;
        } else if (platform === 'twitter') {
            thumbnailHtml = `
                <div style="position:relative;width:100%;height:100%;background:${kurdistanColors.white};display:flex;justify-content:center;align-items:center;border-radius:10px;">
                    <div style="text-align:center;">
                        <i class="fab fa-twitter" style="font-size:50px;margin-bottom:20px;color:${kurdistanColors.green};"></i>
                        <p style="color:${kurdistanColors.green};">انقر للمشاهدة</p>
                    </div>
                    <div class="play-icon" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:${kurdistanColors.green};width:60px;height:60px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer;">
                        <i class="fas fa-play" style="color:${kurdistanColors.white};font-size:24px;"></i>
                    </div>
                </div>
            `;
        }
        
        videoPreview.innerHTML = thumbnailHtml;
        
        // إضافة العلامة المائية إذا تم تحديد الخيار
        if (document.getElementById('watermark-option').checked) {
            const watermark = document.createElement('div');
            watermark.className = 'watermark-overlay';
            watermark.textContent = '@cvry';
            watermark.style.backgroundColor = kurdistanColors.red;
            videoPreview.appendChild(watermark);
        }
        
        // إضافة حدث النقر لتشغيل الفيديو
        const playIcon = videoPreview.querySelector('.play-icon');
        if (playIcon) {
            playIcon.addEventListener('click', function() {
                showVideoPreview(url, platform);
            });
        }
    }
    
    function extractYoutubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }
    
    function extractTiktokId(url) {
        const regExp = /\/video\/(\d+)/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }
    
    function showError(message) {
        // إنشاء عنصر الخطأ
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.backgroundColor = kurdistanColors.red;
        errorDiv.style.color = kurdistanColors.white;
        errorDiv.style.padding = '10px';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.marginBottom = '15px';
        errorDiv.style.textAlign = 'center';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        // إضافة العنصر إلى بداية حاوية النتائج
        const resultContent = document.querySelector('.result-content');
        if (resultContent) {
            resultContent.insertBefore(errorDiv, resultContent.firstChild);
            
            // إزالة الرسالة بعد 5 ثوانٍ
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        } else {
            alert(message);
        }
    }
    
    function showSuccess(message) {
        // إنشاء عنصر النجاح
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.backgroundColor = kurdistanColors.green;
        successDiv.style.color = kurdistanColors.white;
        successDiv.style.padding = '10px';
        successDiv.style.borderRadius = '5px';
        successDiv.style.marginBottom = '15px';
        successDiv.style.textAlign = 'center';
        successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        
        // إضافة العنصر إلى بداية حاوية النتائج
        const resultContent = document.querySelector('.result-content');
        if (resultContent) {
            resultContent.insertBefore(successDiv, resultContent.firstChild);
            
            // إزالة الرسالة بعد 5 ثوانٍ
            setTimeout(() => {
                successDiv.remove();
            }, 5000);
        } else {
            alert(message);
        }
    }
    
    function applyKurdistanColors() {
        // تطبيق ألوان علم كردستان على عناصر الواجهة
        
        // تغيير لون الأزرار الرئيسية
        document.documentElement.style.setProperty('--primary-color', kurdistanColors.green);
        document.documentElement.style.setProperty('--secondary-color', kurdistanColors.red);
        document.documentElement.style.setProperty('--accent-color', kurdistanColors.yellow);
        
        // تحديث أزرار المنصات
        platformBtns.forEach(btn => {
            btn.style.borderColor = kurdistanColors.green;
            if (btn.classList.contains('active')) {
                btn.style.backgroundColor = kurdistanColors.green;
            }
        });
        
        // تحديث زر التحميل الرئيسي
        downloadBtn.style.backgroundColor = kurdistanColors.green;
        downloadBtn.style.color = kurdistanColors.white;
        
        // تحديث زر التحميل النهائي
        finalDownloadBtn.style.backgroundColor = kurdistanColors.yellow;
        finalDownloadBtn.style.color = kurdistanColors.red;
        
        // تحديث رأس قسم النتائج
        const resultHeader = document.querySelector('.result-header');
        if (resultHeader) {
            resultHeader.style.backgroundColor = kurdistanColors.green;
            resultHeader.style.color = kurdistanColors.white;
        }
        
        // إضافة خلفية علم كردستان للصفحة
        document.body.style.backgroundImage = `linear-gradient(to bottom, ${kurdistanColors.white}, ${kurdistanColors.white} 33%, ${kurdistanColors.red} 33%, ${kurdistanColors.red} 66%, ${kurdistanColors.green} 66%, ${kurdistanColors.green})`;
        document.body.style.backgroundAttachment = 'fixed';
        
        // إضافة شمس كردستان في الخلفية
        const sunDiv = document.createElement('div');
        sunDiv.style.position = 'fixed';
        sunDiv.style.top = '33%';
        sunDiv.style.left = '50%';
        sunDiv.style.transform = 'translate(-50%, -50%)';
        sunDiv.style.width = '100px';
        sunDiv.style.height = '100px';
        sunDiv.style.borderRadius = '50%';
        sunDiv.style.backgroundColor = kurdistanColors.yellow;
        sunDiv.style.zIndex = '-1';
        document.body.appendChild(sunDiv);
    }
});
