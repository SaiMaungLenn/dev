document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const navLinks = document.querySelectorAll("nav ul li a");
    const skillBars = document.querySelectorAll(".skill-card");
    const lyrics = document.querySelectorAll(".lyric-animation p");
    const projects = document.querySelector(".project-grid");
    let currentProjectIndex = 0;
  
    // THEME TOGGLE
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggle.checked = savedTheme === "light-mode";
    }
    themeToggle.addEventListener("change", function () {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        localStorage.setItem("theme", body.classList.contains("light-mode") ? "light-mode" : "dark-mode");
    });
  
    // SMOOTH SCROLLING & ACTIVE NAV LINK
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
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
    });
  
    // SKILL BAR ANIMATION
    function animateSkills() {
        skillBars.forEach((bar, index) => {
            setTimeout(() => bar.classList.add("active"), index * 300);
        });
    }
    window.addEventListener("scroll", function () {
        if (document.getElementById("skills").getBoundingClientRect().top < window.innerHeight - 100) {
            animateSkills();
        }
    });
  
    // LYRICS ANIMATION
    function animateLyrics() {
        lyrics.forEach((line, index) => {
            setTimeout(() => line.classList.add("fade-in"), index * 1000);
        });
    }
    animateLyrics();
  
    // PROJECT CAROUSEL
    function nextProject() {
        currentProjectIndex = (currentProjectIndex + 1) % projects.children.length;
        updateProjects();
    }
    function prevProject() {
        currentProjectIndex = (currentProjectIndex - 1 + projects.children.length) % projects.children.length;
        updateProjects();
    }
    function updateProjects() {
        projects.style.transform = `translateX(-${currentProjectIndex * 100}%)`;
    }
    document.querySelector(".next")?.addEventListener("click", nextProject);
    document.querySelector(".prev")?.addEventListener("click", prevProject);
  
    // TYPING EFFECT
    const textElement = document.getElementById("animated-text");
    const texts = ["Developer", "Freelancer", "Music Enthusiast", "Bot Creator"];
    let textIndex = 0;
    let charIndex = 0;
    function type() {
        if (charIndex < texts[textIndex].length) {
            textElement.innerHTML += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }
    function erase() {
        if (charIndex > 0) {
            textElement.innerHTML = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        }
    }
    type();
  });
