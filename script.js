// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 平滑滚动到锚点
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // 滚动时导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 添加背景模糊效果
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 页面加载动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .download-card, .about-text, .about-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 统计数字动画
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            const isPercentage = target.includes('%');
            const isPlus = target.includes('+');
            const isSlash = target.includes('/');
            
            let finalNumber;
            let suffix = '';
            
            if (isPercentage) {
                finalNumber = parseInt(target);
                suffix = '%';
            } else if (isPlus) {
                finalNumber = parseInt(target);
                suffix = 'M+';
            } else if (isSlash) {
                finalNumber = 24;
                suffix = '/7';
            } else {
                finalNumber = parseInt(target) || 0;
            }
            
            let currentNumber = 0;
            const increment = finalNumber / 60; // 60帧动画
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                
                stat.textContent = Math.floor(currentNumber) + suffix;
            }, 16); // 约60fps
        });
    }
    
    // 当统计区域进入视图时触发数字动画
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // 下载按钮点击跟踪
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.closest('.download-card').querySelector('h3').textContent;
            console.log(`用户点击下载: ${platform}`);
            
            // 这里可以添加分析跟踪代码
            // gtag('event', 'download', {
            //     'event_category': 'engagement',
            //     'event_label': platform
            // });
        });
    });
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // 预加载重要资源
    function preloadResources() {
        const platforms = [
            'https://desktop.telegram.org/',
            'https://macos.telegram.org/',
            'https://apps.apple.com/app/telegram-messenger/id686449807',
            'https://play.google.com/store/apps/details?id=org.telegram.messenger'
        ];
        
        platforms.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            document.head.appendChild(link);
        });
    }
    
    // 页面加载完成后预加载资源
    window.addEventListener('load', preloadResources);
    
    // 性能优化：图片懒加载（如果有图片的话）
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // 添加页面可见性API支持
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 页面变为可见时的操作
            console.log('页面重新获得焦点');
        } else {
            // 页面变为隐藏时的操作
            console.log('页面失去焦点');
        }
    });

    // 操作系统检测
    function detectPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        const platform = navigator.platform.toLowerCase();
        
        // 检测移动设备
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        
        if (isMobile) {
            if (/iphone|ipad|ipod/i.test(userAgent)) {
                return 'ios';
            } else if (/android/i.test(userAgent)) {
                return 'android';
            }
            return 'mobile';
        }
        
        // 检测桌面操作系统
        if (platform.includes('win') || userAgent.includes('windows')) {
            return 'windows';
        } else if (platform.includes('mac') || userAgent.includes('macintosh')) {
            return 'mac';
        } else if (platform.includes('linux') || userAgent.includes('linux')) {
            return 'linux';
        }
        
        return 'unknown';
    }
    
    // 更新下载按钮和相关链接
    function updateDownloadButton() {
        const platform = detectPlatform();
        const downloadBtn = document.getElementById('primary-download-btn');
        const downloadText = document.getElementById('download-text');
        const appStoreLink = document.getElementById('app-store-link');
        const playStoreLink = document.getElementById('play-store-link');
        const msStoreLink = document.getElementById('ms-store-link');
        const deviceMockup = document.getElementById('device-mockup');
        
        // 隐藏所有应用商店链接
        appStoreLink.style.display = 'none';
        playStoreLink.style.display = 'none';
        msStoreLink.style.display = 'none';
        
        // 根据平台更新界面
        switch (platform) {
            case 'ios':
                downloadText.textContent = '获取电报中文版 for iOS';
                appStoreLink.style.display = 'inline-block';
                deviceMockup.classList.add('mobile');
                downloadBtn.onclick = () => window.open('https://apps.apple.com/app/telegram-messenger/id686449807', '_blank');
                break;
                
            case 'android':
                downloadText.textContent = '获取电报中文版 for Android';
                playStoreLink.style.display = 'inline-block';
                deviceMockup.classList.add('mobile');
                downloadBtn.onclick = () => window.open('https://play.google.com/store/apps/details?id=org.telegram.messenger', '_blank');
                break;
                
            case 'windows':
                downloadText.textContent = '获取电报中文版 for Windows';
                msStoreLink.style.display = 'inline-block';
                deviceMockup.classList.remove('mobile');
                downloadBtn.onclick = () => window.open('https://desktop.telegram.org/', '_blank');
                break;
                
            case 'mac':
                downloadText.textContent = '获取电报中文版 for macOS';
                appStoreLink.style.display = 'inline-block';
                appStoreLink.textContent = 'Mac App Store';
                deviceMockup.classList.remove('mobile');
                downloadBtn.onclick = () => window.open('https://macos.telegram.org/', '_blank');
                break;
                
            case 'linux':
                downloadText.textContent = '获取电报中文版 for Linux';
                deviceMockup.classList.remove('mobile');
                downloadBtn.onclick = () => window.open('https://desktop.telegram.org/', '_blank');
                break;
                
            default:
                downloadText.textContent = '获取电报中文版';
                deviceMockup.classList.remove('mobile');
                downloadBtn.onclick = () => window.open('https://telegram.org/', '_blank');
                break;
        }
    }
    
    // 显示/隐藏所有平台选项
    function togglePlatformSelector() {
        const platformSelector = document.getElementById('platform-selector');
        const showAllLink = document.getElementById('show-all-platforms');
        
        if (platformSelector.style.display === 'none' || platformSelector.style.display === '') {
            platformSelector.style.display = 'block';
            showAllLink.textContent = '隐藏其他平台';
            
            // 添加展开动画
            platformSelector.style.opacity = '0';
            platformSelector.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                platformSelector.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                platformSelector.style.opacity = '1';
                platformSelector.style.transform = 'translateY(0)';
            }, 10);
        } else {
            platformSelector.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            platformSelector.style.opacity = '0';
            platformSelector.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                platformSelector.style.display = 'none';
                showAllLink.textContent = '显示所有平台';
            }, 300);
        }
    }
    
    // 平台项点击处理
    function handlePlatformClick(event) {
        event.preventDefault();
        const platformItem = event.currentTarget;
        const platform = platformItem.getAttribute('data-platform');
        const href = platformItem.getAttribute('href');
        
        // 添加点击效果
        platformItem.style.transform = 'scale(0.98)';
        setTimeout(() => {
            platformItem.style.transform = 'scale(1)';
        }, 150);
        
        // 跳转到对应链接
        setTimeout(() => {
            window.open(href, '_blank');
        }, 100);
    }
    
    // 响应式处理
    function handleResponsive() {
        const deviceMockup = document.getElementById('device-mockup');
        const isMobileView = window.innerWidth <= 768;
        const platform = detectPlatform();
        
        // 在移动端视图中，如果不是移动设备，仍然显示桌面界面
        if (isMobileView && (platform === 'ios' || platform === 'android')) {
            deviceMockup.classList.add('mobile');
        } else if (isMobileView) {
            // 在小屏幕上强制显示移动界面样式（但不改变下载按钮）
            deviceMockup.classList.add('mobile');
        } else {
            // 大屏幕上根据实际平台决定
            if (platform === 'ios' || platform === 'android') {
                deviceMockup.classList.add('mobile');
            } else {
                deviceMockup.classList.remove('mobile');
            }
        }
    }
    
    // 初始化平台检测和界面更新
    updateDownloadButton();
    handleResponsive();
    
    // 绑定显示所有平台按钮事件
    const showAllLink = document.getElementById('show-all-platforms');
    if (showAllLink) {
        showAllLink.addEventListener('click', function(event) {
            event.preventDefault();
            togglePlatformSelector();
        });
    }
    
    // 绑定平台选择器中每个平台项的点击事件
    const platformItems = document.querySelectorAll('.platform-item');
    platformItems.forEach(item => {
        item.addEventListener('click', handlePlatformClick);
        
        // 添加悬停效果
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResponsive);
    
    // 导航栏交互效果
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // 移除所有活跃状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活跃状态
            this.classList.add('active');
        });
    });
    
    // 为主下载按钮添加加载状态
    const primaryBtn = document.getElementById('primary-download-btn');
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '正在跳转...';
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
            }, 1500);
        });
    }
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const platformSelector = document.getElementById('platform-selector');
            if (platformSelector.style.display === 'block') {
                togglePlatformSelector();
            }
        }
    });
    
    // 添加平滑滚动效果（如果需要）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 添加页面加载动画
    function addLoadAnimation() {
        const animatedElements = document.querySelectorAll('.desktop-showcase, .content-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // 模拟桌面界面动画
    function animateDesktopInterface() {
        const chatItems = document.querySelectorAll('.chat-item');
        const messages = document.querySelectorAll('.message');
        
        // 延迟显示聊天项目
        chatItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200 + 1000);
        });
        
        // 延迟显示消息
        messages.forEach((message, index) => {
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, index * 300 + 1500);
        });
    }
    
    // 初始化动画
    setTimeout(() => {
        addLoadAnimation();
        animateDesktopInterface();
    }, 500);
    
    // 页面可见性API - 当用户回到页面时刷新动画
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // 重新触发一些动画效果
            const showcase = document.querySelector('.desktop-showcase');
            if (showcase) {
                showcase.style.animation = 'none';
                setTimeout(() => {
                    showcase.style.animation = 'fadeInUp 0.6s ease-out';
                }, 10);
            }
        }
    });
    
    // 错误处理
    window.addEventListener('error', function(event) {
        console.error('页面错误:', event.error);
    });
    
    // 性能监控
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('页面加载时间:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
            }, 0);
        });
    }
    
    // 导出全局函数供控制台调试使用
    window.TelegramDownload = {
        detectPlatform: detectPlatform,
        updateDownloadButton: updateDownloadButton,
        togglePlatformSelector: togglePlatformSelector,
        handlePlatformClick: handlePlatformClick,
        handleResponsive: handleResponsive
    };
    
    console.log('电报中文版 桌面端页面已加载');
    console.log('检测到的操作系统:', detectPlatform());
});

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 工具函数：防抖
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript错误:', e.error);
});

// 添加 Service Worker 支持（可选）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // 这里可以注册 Service Worker
        // navigator.serviceWorker.register('/sw.js');
    });
} 