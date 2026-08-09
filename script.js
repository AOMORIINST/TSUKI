/* =========================================
   TSUKI
   MAIN JAVASCRIPT
========================================= */


/* -----------------------------------------
   LOADER
----------------------------------------- */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {

        loader.classList.add("hidden");

        document.body.classList.remove("loading");

    }, 1400);

});


document.body.classList.add("loading");


/* -----------------------------------------
   NAVBAR
----------------------------------------- */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* -----------------------------------------
   MOBILE MENU
----------------------------------------- */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* -----------------------------------------
   SCROLL REVEAL
----------------------------------------- */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* -----------------------------------------
   CUSTOM CURSOR
----------------------------------------- */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* -----------------------------------------
   CURSOR HOVER EFFECT
----------------------------------------- */

const hoverElements = document.querySelectorAll(
    "a, button, .product-image"
);


hoverElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorRing.classList.add("hover");

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.classList.remove("hover");

    });

});


/* -----------------------------------------
   PARALLAX HERO
----------------------------------------- */

const hero = document.querySelector(".hero");
const heroBackground = document.querySelector(".hero-background");
const heroKanji = document.querySelector(".hero-kanji");


window.addEventListener("scroll", () => {

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {

        heroBackground.style.transform =
            `scale(1.03) translateY(${scroll * 0.15}px)`;

        heroKanji.style.transform =
            `translateY(calc(-50% + ${scroll * 0.12}px))`;

    }

});


/* -----------------------------------------
   MOUSE PARALLAX
----------------------------------------- */

if (window.innerWidth > 900) {

    hero.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 20;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 20;

        heroKanji.style.marginLeft = `${x}px`;
        heroKanji.style.marginTop = `${y}px`;

    });

}


/* -----------------------------------------
   IMAGE TILT
----------------------------------------- */

if (window.innerWidth > 900) {

    document.querySelectorAll(".product-image").forEach(card => {

        card.addEventListener("mousemove", (event) => {

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -4;

            const rotateY =
                ((x / rect.width) - 0.5) * 4;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    });

}


/* -----------------------------------------
   SMOOTH ANCHOR SCROLL
----------------------------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const offset = 70;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* -----------------------------------------
   PRODUCT IMAGE HOVER
----------------------------------------- */

document.querySelectorAll(".product-image").forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.classList.add("active");

    });

    image.addEventListener("mouseleave", () => {

        image.classList.remove("active");

    });

});


/* -----------------------------------------
   RANDOM DELAY FOR REVEALS
----------------------------------------- */

document.querySelectorAll(".products-grid .reveal")
.forEach((element, index) => {

    element.style.transitionDelay =
        `${index * 80}ms`;

});


/* -----------------------------------------
   CURRENT YEAR
----------------------------------------- */

const yearElements =
    document.querySelectorAll(".current-year");

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});