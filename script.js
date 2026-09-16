/* =========================================================
   PORTFOLIO SCRIPT
   นายกษาปณ์ หัดกระสา
   Industrial Engineering Portfolio
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            // เปลี่ยนสัญลักษณ์ปุ่มเมนู
            if (navLinks.classList.contains("open")) {
                menuBtn.innerHTML = "✕";
                menuBtn.setAttribute("aria-label", "ปิดเมนู");
            } else {
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-label", "เปิดเมนู");
            }
        });

        // เมื่อกดเมนู ให้ปิดเมนูมือถือ
        const links = navLinks.querySelectorAll("a");

        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-label", "เปิดเมนู");
            });
        });
    }


    /* =====================================================
       IMAGE MODAL
       ===================================================== */

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalClose = document.getElementById("modalClose");

    function openModal(imageSrc, imageAlt = "") {

        if (!modal || !modalImage) return;

        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;

        modal.classList.add("active");

        // ป้องกันการเลื่อนหน้าเว็บขณะเปิดรูป
        document.body.style.overflow = "hidden";
    }

    function closeModal() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

        // เคลียร์รูปหลังจากปิด
        setTimeout(() => {
            if (modalImage) {
                modalImage.src = "";
            }
        }, 200);
    }


    /* =====================================================
       CLICK IMAGE → OPEN MODAL
       ===================================================== */

    const clickableImages = document.querySelectorAll(
        ".page-card img, " +
        ".activity-card img, " +
        ".certificate-card img, " +
        ".sop-image img, " +
        ".transcript-image, " +
        ".gallery-card img"
    );

    clickableImages.forEach(image => {

        image.addEventListener("click", () => {

            openModal(
                image.src,
                image.alt || "ผลงาน Portfolio"
            );

        });

        // เพิ่ม accessibility
        image.setAttribute("tabindex", "0");

        image.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();

                openModal(
                    image.src,
                    image.alt || "ผลงาน Portfolio"
                );

            }

        });

    });


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }


    // คลิกบริเวณพื้นหลังเพื่อปิด
    if (modal) {

        modal.addEventListener("click", event => {

            if (event.target === modal) {
                closeModal();
            }

        });

    }


    // กด ESC เพื่อปิด
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (modal && modal.classList.contains("active")) {
                closeModal();
            }

        }

    });


    /* =====================================================
       GALLERY
       สร้างรูปภาพ 1.png - 11.png อัตโนมัติ
       ===================================================== */

    const gallery = document.getElementById("gallery");

    if (gallery) {

        const totalImages = 11;

        gallery.innerHTML = "";

        for (let i = 1; i <= totalImages; i++) {

            const card = document.createElement("div");

            card.className = "gallery-card reveal";

            card.innerHTML = `
                <span class="gallery-number">
                    ${String(i).padStart(2, "0")}
                </span>

                <img
                    src="images/${i}.png"
                    alt="ผลงาน Portfolio หน้า ${i}"
                    loading="lazy"
                >
            `;

            gallery.appendChild(card);

            const image = card.querySelector("img");

            image.addEventListener("click", () => {

                openModal(
                    image.src,
                    image.alt
                );

            });

            image.setAttribute("tabindex", "0");

            image.addEventListener("keydown", event => {

                if (event.key === "Enter" || event.key === " ") {

                    event.preventDefault();

                    openModal(
                        image.src,
                        image.alt
                    );

                }

            });

        }

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // สำหรับ Browser รุ่นเก่า
        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    if (sections.length > 0 && navItems.length > 0) {

        window.addEventListener("scroll", () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navItems.forEach(link => {

                link.classList.remove("active");

                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    let backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document.addEventListener("error", event => {

        const image = event.target;

        if (image.tagName === "IMG") {

            image.classList.add("image-error");

            console.warn(
                "ไม่พบไฟล์รูปภาพ:",
                image.getAttribute("src")
            );

        }

    }, true);


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "Portfolio Website loaded successfully 💙"
    );

});
