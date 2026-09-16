document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       📁 โฟลเดอร์รูปจริงใน GitHub
       ชื่อโฟลเดอร์มี "เว้นวรรค 2 ช่อง" ระหว่าง
       ผลงาน  พอร์ตโฟลิโอ
       ===================================================== */

    const folderName =
        "สีแดงเข้ม โมเดิร์น แฟ้มสะสมผลงาน  พอร์ตโฟลิโอ Portfolio เอกสาร A4";

    // เข้ารหัสชื่อโฟลเดอร์เพื่อให้รองรับภาษาไทยและช่องว่าง
    const imageFolder =
        "./" + encodeURIComponent(folderName);


    /* =====================================================
       🖼️ ฟังก์ชันสร้าง URL รูป
       ===================================================== */

    function getImagePath(number) {
        return `${imageFolder}/${number}.png`;
    }


    /* =====================================================
       🔧 แก้รูปที่อยู่ใน index.html
       เช่น รูปหน้าแรก / transcript / activity / certificate
       ===================================================== */

    const allImages = document.querySelectorAll("img");

    allImages.forEach((img) => {

        const currentSrc =
            img.getAttribute("src") || "";

        // ถ้าเป็นรูปที่อยู่ในโฟลเดอร์ Portfolio
        if (
            currentSrc.includes("สีแดงเข้ม") ||
            currentSrc.includes("โมเดิร์น") ||
            currentSrc.includes("แฟ้มสะสมผลงาน")
        ) {

            // หาชื่อไฟล์ เช่น 1.png, 2.png
            const match =
                currentSrc.match(/(\d+)\.png$/);

            if (match) {

                const number = match[1];

                img.src = getImagePath(number);

                console.log(
                    `แก้ path รูป ${number}.png แล้ว →`,
                    img.src
                );
            }
        }
    });


    /* =====================================================
       📱 MOBILE MENU
       ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            const opened =
                navLinks.classList.toggle("open");

            menuBtn.textContent =
                opened ? "✕" : "☰";

            menuBtn.setAttribute(
                "aria-label",
                opened ? "ปิดเมนู" : "เปิดเมนู"
            );
        });


        navLinks
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener("click", () => {

                    navLinks.classList.remove("open");

                    menuBtn.textContent = "☰";

                    menuBtn.setAttribute(
                        "aria-label",
                        "เปิดเมนู"
                    );
                });

            });
    }


    /* =====================================================
       🔍 IMAGE MODAL
       ===================================================== */

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");

    const modalClose =
        document.getElementById("modalClose");


    function openModal(
        src,
        alt = "ผลงาน Portfolio"
    ) {

        if (!modal || !modalImage) {
            return;
        }

        modalImage.src = src;

        modalImage.alt = alt;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";
    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );
    }


    if (modal) {

        modal.addEventListener(
            "click",
            (event) => {

                if (event.target === modal) {
                    closeModal();
                }

            }
        );
    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeModal();
            }

        }
    );


    /* =====================================================
       🖼️ GALLERY
       สร้างรูป 1.png - 11.png อัตโนมัติ
       ===================================================== */

    const galleryGrid =
        document.getElementById("galleryGrid");


    if (galleryGrid) {

        // ป้องกันการสร้างซ้ำ
        galleryGrid.innerHTML = "";


        for (let i = 1; i <= 11; i++) {

            const card =
                document.createElement("article");

            card.className =
                "gallery-card reveal";


            const src =
                getImagePath(i);


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


            const img =
                card.querySelector("img");


            /* เปิดรูปใหญ่ */

            img.addEventListener(
                "click",
                () => {

                    openModal(
                        img.src,
                        img.alt
                    );

                }
            );


            /* ถ้ารูปหาไม่เจอ */

            img.addEventListener(
                "error",
                () => {

                    card.classList.add(
                        "image-missing"
                    );

                    console.warn(
                        "❌ ไม่พบรูป:",
                        src
                    );

                }
            );


            /* ถ้ารูปโหลดสำเร็จ */

            img.addEventListener(
                "load",
                () => {

                    card.classList.remove(
                        "image-missing"
                    );

                    console.log(
                        `✅ โหลดรูป ${i}.png สำเร็จ`
                    );

                }
            );

        }
    }


    /* =====================================================
       🖱️ รูปในเนื้อหาหลัก
       ===================================================== */

    const contentImages =
        document.querySelectorAll(
            ".hero-card img, " +
            ".transcript-image, " +
            ".activity-card img, " +
            ".certificate-card img, " +
            ".sop-image img"
        );


    contentImages.forEach((img) => {

        img.style.cursor = "pointer";


        img.addEventListener(
            "click",
            () => {

                if (
                    img.complete &&
                    img.naturalWidth > 0
                ) {

                    openModal(
                        img.src,
                        img.alt
                    );

                }

            }
        );

    });


    /* =====================================================
       ✨ SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },
                {
                    threshold: 0.1
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "show"
                );

            }
        );

    }


    /* =====================================================
       🧭 ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navItems =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navItems.length
    ) {

        const updateActiveNav =
            () => {

                let current = "";


                sections.forEach(
                    (section) => {

                        const top =
                            section.offsetTop - 160;


                        if (
                            window.scrollY >= top
                        ) {

                            current =
                                section.id;

                        }

                    }
                );


                navItems.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${current}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    }
                );

            };


        window.addEventListener(
            "scroll",
            updateActiveNav
        );


        updateActiveNav();

    }


    /* =====================================================
       💙 ตรวจสอบสถานะ
       ===================================================== */

    console.log(
        "💙 Portfolio พร้อมใช้งานแล้ว"
    );

    console.log(
        "📁 โฟลเดอร์รูป:",
        folderName
    );

    console.log(
        "🔗 Image folder:",
        imageFolder
    );

});
