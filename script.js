document.addEventListener('DOMContentLoaded', function() {
    // المتغيرات
    const platformButtons = document.querySelectorAll('.platform-btn');
    const videoUrlInput = document.getElementById('video-url');
    const downloadBtn = document.getElementById('download-btn');
    const resultContainer = document.getElementById('result-container');
    const videoPreview = document.getElementById('video-preview');
    const downloadOptions = document.getElementById('download-options');
    const qualityButtons = document.querySelectorAll('.quality-btn');
    const formatButtons = document.querySelectorAll('.format-btn');
    const finalDownloadBtn = document.getElementById('final-download-btn');
    const playOption = document.getElementById('play-option');
    const watermarkOption = document.getElementById('watermark-option');
    
    // المنصة الحالية
    let currentPlatform = 'tiktok';
    
    // تحديد المنصة
    platformButtons.forEach(button => {
        button.addEventListener('click', function() {
            platformButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentPlatform = this.getAttribute('data-platform');
            
            // تغيير نص placeholder حسب المنصة
            if (currentPlatform === 'tiktok') {
                videoUrlInput.placeholder = 'ضع رابط فيديو تيك توك هنا...';
            } else if (currentPlatform === 'youtube') {
                videoUrlInput.placeholder = 'ضع رابط فيديو يوتيوب هنا...';
            } else if (currentPlatform === 'instagram') {
                videoUrlInput.placeholder = 'ضع رابط فيديو انستغرام هنا...';
            } else if (currentPlatform === 'twitter') {
                videoUrlInput.placeholder = 'ضع رابط فيديو تويتر (X) هنا...';
            }
        });
    });
    
    // تحديد جودة الفيديو
    qualityButtons.forEach(button => {
        button.addEventListener('click', function() {
            qualityButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تحديد صيغة الفيديو
    formatButtons.forEach(button => {
        button.addEventListener('click', function() {
            formatButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // تفعيل الجودة العالية وصيغة MP4 افتراضيًا
    document.querySelector('.quality-btn[data-quality="high"]').classList.add('active');
    document.querySelector('.format-btn[data-format="mp4"]').classList.add('active');
    
    // معالجة زر التحميل
    downloadBtn.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value.trim();
        
        if (!videoUrl) {
            alert('الرجاء إدخال رابط الفيديو');
            return;
        }
        
        // التحقق من صحة الرابط حسب المنصة
        if (!validateUrl(videoUrl, currentPlatform)) {
            alert('الرجاء إدخال رابط صحيح من المنصة المحددة');
            return;
        }
        
        // محاكاة تحميل البيانات
        downloadBtn.innerHTML = 'جاري التحميل... <i class="fas fa-spinner fa-spin"></i>';
        downloadBtn.disabled = true;
        
        setTimeout(() => {
            // عرض معاينة الفيديو
            if (playOption.checked) {
                showVideoPreview(videoUrl, currentPlatform);
            } else {
                // إظهار صورة مصغرة فقط
                showThumbnail(videoUrl, currentPlatform);
            }
            
            // إظهار خيارات التحميل
            resultContainer.style.display = 'block';
            
            // إعادة زر التحميل إلى حالته الأصلية
            downloadBtn.innerHTML = 'تحميل <i class="fas fa-download"></i>';
            downloadBtn.disabled = false;
            
            // التمرير إلى قسم النتائج
            resultContainer.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    });
    
    // معالجة زر التحميل النهائي
    finalDownloadBtn.addEventListener('click', function() {
        const videoUrl = videoUrlInput.value.trim();
        const quality = document.querySelector('.quality-btn.active').getAttribute('data-quality');
        const format = document.querySelector('.format-btn.active').getAttribute('data-format');
        
        // محاكاة التحميل
        finalDownloadBtn.innerHTML = 'جاري التحميل... <i class="fas fa-spinner fa-spin"></i>';
        finalDownloadBtn.disabled = true;
        
        setTimeout(() => {
            // إضافة العلامة المائية إذا تم تحديد الخيار
            const withWatermark = watermarkOption.checked;
            
            // محاكاة التحميل الناجح
            simulateDownload(videoUrl, currentPlatform, quality, format, withWatermark);
            
            // إعادة زر التحميل النهائي إلى حالته الأصلية
            finalDownloadBtn.innerHTML = 'تحميل الآن <i class="fas fa-download"></i>';
            finalDownloadBtn.disabled = false;
        }, 3000);
    });
    
    // التحقق من صحة الرابط
    function validateUrl(url, platform) {
        if (platform === 'tiktok') {
            return url.includes('tiktok.com');
        } else if (platform === 'youtube') {
            return url.includes('youtube.com') || url.includes('youtu.be');
        } else if (platform === 'instagram') {
            return url.includes('instagram.com');
        } else if (platform === 'twitter') {
            return url.includes('twitter.com') || url.includes('x.com');
        }
        return false;
    }
    
    // عرض معاينة الفيديو
    function showVideoPreview(url, platform) {
        // في الواقع، هنا ستستخدم API لتضمين الفيديو
        // لكن في هذا المثال سنستخدم محاكاة بسيطة
        
        let embedHtml = '';
        
        if (platform === 'youtube') {
            // استخراج معرف الفيديو من رابط يوتيوب
            const videoId = extractYoutubeId(url);
            embedHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (platform === 'tiktok') {
            // محاكاة تضمين تيك توك
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <div style="color:white;text-align:center;">
                        <i class="fab fa-tiktok" style="font-size:50px;margin-bottom:20px;"></i>
                        <p>معاينة فيديو تيك توك</p>
                        <p style="font-size:12px;margin-top:10px;">${url}</p>
                    </div>
                </div>
            `;
        } else if (platform === 'instagram') {
            // محاكاة تضمين انستغرام
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <div style="color:white;text-align:center;">
                        <i class="fab fa-instagram" style="font-size:50px;margin-bottom:20px;"></i>
                        <p>معاينة فيديو انستغرام</p>
                        <p style="font-size:12px;margin-top:10px;">${url}</p>
                    </div>
                </div>
            `;
        } else if (platform === 'twitter') {
            // محاكاة تضمين تويتر
            embedHtml = `
                <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:#000;">
                    <div style="color:white;text-align:center;">
                        <i class="fab fa-twitter" style="font-size:50px;margin-bottom:20px;"></i>
                        <p>معاينة فيديو تويتر (X)</p>
                        <p style="font-size:12px;margin-top:10px;">${url}</p>
                    </div>
                </div>
            `;
        }
        
        videoPreview.innerHTML = embedHtml;
    }
    
    // عرض صورة مصغرة
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
                    <div style="color:white;text-align:center;">
                        <i class="fas fa-image" style="font-size:50px;margin-bottom:20px;"></i>
                        <p>صورة مصغرة للفيديو</p>
                        <div class="watermark-overlay">@cvry</div>
                    </div>
                </div>
            `;
        }
        
        videoPreview.innerHTML = thumbnailHtml;
    }
    
    // استخراج معرف فيديو يوتيوب
    function extractYoutubeId(url) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }
    
    // محاكاة التحميل
    function simulateDownload(url, platform, quality, format, withWatermark) {
        // إنشاء اسم ملف افتراضي
        let fileName = `video_${platform}_${quality}`;
        if (withWatermark) {
            fileName += '_cvry';
        }
        fileName += `.${format}`;
        
        // إنشاء رابط تحميل وهمي
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([''], { type: format === 'mp4' ? 'video/mp4' : 'audio/mp3' }));
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // عرض رسالة نجاح
        alert(`تم بدء تحميل الملف: ${fileName}`);
    }
});
