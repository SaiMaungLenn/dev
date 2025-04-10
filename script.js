document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector('#theme-toggle');
    const body = document.querySelector('body');
    const navLinks = document.querySelectorAll("nav ul li a");
    const skillBars = document.querySelectorAll(".skill-card");
    const lyrics = document.querySelectorAll(".lyric-animation p");
    const projectGrid = document.querySelector(".project-grid");
    const projectItems = document.querySelectorAll('.project');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    let currentProjectIndex = 0;
  
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });

    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navMenu.classList.contains('show')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('show');
        }
    });

    
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        themeToggle.checked = savedTheme === "dark-mode";
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem("theme", "dark-mode");
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem("theme", "light-mode");
        }
    });
  
    
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    window.addEventListener("scroll", function () {
        let fromTop = window.scrollY;
        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (section.offsetTop <= fromTop + 100 && section.offsetTop + section.offsetHeight > fromTop) {
                navLinks.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });

        
        if (window.scrollY > 50) {
            document.querySelector('nav').classList.add('scrolled');
        } else {
            document.querySelector('nav').classList.remove('scrolled');
        }

        
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        document.querySelector('.scroll-progress').style.width = `${scrolled}%`;
    });
  
    
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    progressBar.style.width = progressBar.style.width || '0%';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    skillBars.forEach(card => {
        skillObserver.observe(card);
    });
  
    
    function animateLyrics() {
        lyrics.forEach((line, index) => {
            setTimeout(() => line.classList.add("fade-in"), index * 1000);
        });
    }
    animateLyrics();
  
    
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projectGrid.children.length;
        updateProjects();
    }
    
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projectGrid.children.length) % projectGrid.children.length;
        updateProjects();
    }
    
    function updateProjects() {
        projectGrid.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
    }

    document.querySelector(".next")?.addEventListener("click", nextProject);
    document.querySelector(".prev")?.addEventListener("click", prevProject);

    
    projectItems.forEach(project => {
        project.addEventListener('mousemove', (e) => {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            project.style.setProperty('--mouse-x', `${x}px`);
            project.style.setProperty('--mouse-y', `${y}px`);
        });
    });
  
    
    const typingText = document.querySelector('.typing-text');
    const texts = ['Front-End', 'Back-End', 'Full-Stack', 'Database', 'Developer', 'Programmer'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
    }

    typeText();

    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00ff88'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff88',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});
