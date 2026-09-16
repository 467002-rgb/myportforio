document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       โฟลเดอร์รูปจริงใน GitHub
       ใช้ encodeURIComponent เพื่อรองรับภาษาไทยและช่องว่าง
       ===================================================== */
    const folderName =
        "สีแดงเข้ม โมเดิร์น แฟ้มสะสมผลงาน  พอร์ตโฟลิโอ Portfolio เอกสาร A4";

    const imageFolder =
        encodeURIComponent(folderName).replace(/%2F/g, "/");


    /* =====================================================
       MOBILE MENU
       ===================================================== */
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const opened = navLinks.classList.toggle("open");

            menuBtn.textContent = opened ? "✕" : "☰";
            menuBtn.setAttribute(
                "aria-label",
                opened ? "ปิดเมนู" : "เปิดเมนู"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.textContent = "☰";
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

    function openModal(src, alt = "ผลงาน Portfolio") {
        if (!modal || !modalImage) return;

        modalImage.src = src;
        modalImage.alt = alt;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });


    /* =====================================================
       GALLERY 1.png - 11.png
       ===================================================== */
    const galleryGrid = document.getElementById("galleryGrid");

    if (galleryGrid) {
        for (let i = 1; i <= 11; i++) {

            const card = document.createElement("article");
            card.className = "gallery-card reveal";

            const src = `${imageFolder}/${i}.png`;

            card.innerHTML = `
                <span class="gallery-number">
                    ${String(i).padStart(2, "0")}
                </span>

                <img
                    src="${src}"
                    alt="ผลงาน Portfolio หน้า ${i}"
                    loading="lazy"
                >
            `;

            galleryGrid.appendChild(card);

            const img = card.querySelector("img");

            img.addEventListener("click", () => {
                openModal(img.src, img.alt);
            });

            img.addEventListener("error", () => {
                card.classList.add("image-missing");
                console.warn("ไม่พบรูป:", src);
            });
        }
    }


    /* =====================================================
       รูปที่อยู่ในเนื้อหาหลัก
       ===================================================== */
    const contentImages = document.querySelectorAll(
        ".hero-card img, " +
        ".transcript-image, " +
        ".activity-card img, " +
        ".certificate-card img, " +
        ".sop-image img"
    );

    contentImages.forEach(img => {
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
            openModal(img.src, img.alt);
        });
    });


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
            { threshold: 0.1 }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("show");
        });
    }


    /* =====================================================
       ACTIVE NAV
       ===================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    if (sections.length && navItems.length) {

        const updateActiveNav = () => {
            let current = "";

            sections.forEach(section => {
                const top = section.offsetTop - 160;

                if (window.scrollY >= top) {
                    current = section.id;
                }
            });

            navItems.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        };

        window.addEventListener("scroll", updateActiveNav);
        updateActiveNav();
    }


    console.log("Portfolio พร้อมใช้งานแล้ว 💙");
});
