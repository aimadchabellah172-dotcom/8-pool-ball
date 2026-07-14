/* =========================================
   ملف الجافا سكريبت لتفاعل الموقع
   ========================================= */

// الانتظار حتى تحميل مستند HTML بالكامل قبل التشغيل
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. تفعيل قائمة الهواتف (Menu Toggle)
    initMobileMenu();

    // 2. تفعيل التمرير الناعم (Smooth Scrolling)
    initSmoothScroll();

    // 3. تفعيل تأثيرات الظهور عند التمرير (Scroll Animations)
    initScrollAnimations();

    // 4. تفعيل تمييز الرابط النشط في القائمة عند التمرير
    initActiveNavLink();
});


/* -----------------------------------------
   1. وظائف قائمة الهواتف (Mobile Menu)
   ----------------------------------------- */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('header ul');
    const navLinks = document.querySelectorAll('header ul li a');

    if (menuToggle && navMenu) {
        // عند الضغط على زر الهامبرغر
        menuToggle.addEventListener('click', function() {
            // إضافة/إزالة كلاس 'show' للقائمة لإظهارها/إخفائها
            navMenu.classList.toggle('show');
            // إضافة حركة للزر نفسه
            this.classList.toggle('active');
        });

        // إغلاق القائمة عند الضغط على أي رابط بداخلها
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
}


/* -----------------------------------------
   2. التمرير الناعم (Smooth Scrolling)
   ----------------------------------------- */
function initSmoothScroll() {
    // اختيار جميع الروابط التي تبدأ بـ '#'
    const links = document.querySelectorAll('a[href^="#"]');

    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // منع السلوك الافتراضي للانتقال اللحظي

            const targetId = this.getAttribute('href');
            // التأكد من أن الرابط ليس مجرد '#'
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // حساب ارتفاع الهيدر لتجنب تغطية المحتوى
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                // التمرير الناعم للمكان المحدد
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth' // خاصية التمرير الناعم
                });
            }
        });
    }
}


/* -----------------------------------------
   3. تأثيرات الظهور عند التمرير (Scroll Animations)
   ----------------------------------------- */
function initScrollAnimations() {
    // اختيار العناصر المراد تحريكها عند الظهور (مثلاً الكروت)
    const fadeElements = document.querySelectorAll('.tool-card, #hero h1, #hero p, #hero .btn, .about-content, .about-image');

    // إعداد الـ Intersection Observer
    const observerOptions = {
        root: null, // استخدام الـ viewport كمرجع
        threshold: 0.1, // تفعيل التأثير عند ظهور 10% من العنصر
        rootMargin: '0px 0px -50px 0px' // تفعيل التأثير قبل الوصول للعنصر قليلاً
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إضافة كلاس 'fade-in' عند ظهور العنصر
                entry.target.classList.add('fade-in');
                // التوقف عن مراقبة العنصر بعد ظهوره
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // إضافة كلاسات التحضير الـ (Initial State) وتمرير العناصر للمراقب
    fadeElements.forEach(el => {
        // التأكد من أن ملف الـ CSS يحتوي على الستايل الأولي لهذا الكلاس
        // الستايل الأولي يجب أن يكون opacity: 0 و transform: translateY(20px)
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        
        observer.observe(el);
    });
}

// إضافة ستايل الـ fade-in ديناميكياً لتجنب مشاكل الـ CSS
// يمكنك أيضاً إضافة هذا في ملف style.css إذا فضلت
const style = document.createElement('style');
style.innerHTML = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);


/* -----------------------------------------
   4. تمييز الرابط النشط عند التمرير (Active Link)
   ----------------------------------------- */
function initActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100; // إضافة هامش
            const sectionHeight = section.offsetHeight;

            // تحديد القسم الحالي بناءً على موضع التمرير
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // تحديث كلاس 'active' للروابط بناءً على القسم الحالي
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
