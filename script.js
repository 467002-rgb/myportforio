/* =========================================
   PORTFOLIO IMAGE SYSTEM
========================================= */


/*
ชื่อโฟลเดอร์รูปใน GitHub
*/

const imageFolder =
    "สีแดงเข้ม โมเดิร์น แฟ้มสะสมผลงาน พอร์ตโฟลิโอ Portfolio เอกสาร A4";


/*
สร้าง URL ของรูป
*/

function getImageURL(number) {

    const folder =
        encodeURIComponent(imageFolder);

    return `${folder}/${number}.png`;

}


/* =========================================
   ใส่รูปให้ทุกตำแหน่ง
========================================= */

function loadImages() {

    const images =
        document.querySelectorAll("[data-image-number]");


    images.forEach(function (img) {

        const number =
            img.getAttribute("data-image-number");

        img.src =
            getImageURL(number);

    });


    /* =====================================
       Gallery 1 - 11
    ===================================== */

    const gallery =
        document.getElementById("galleryGrid");


    if (!gallery) return;


    gallery.innerHTML = "";


    for (let i = 1; i <= 11; i++) {

        const item =
            document.createElement("div");

        item.className =
            "gallery-item";


        const img =
            document.createElement("img");

        img.src =
            getImageURL(i);

        img.alt =
            `Portfolio หน้า ${i}`;


        const number =
            document.createElement("div");

        number.className =
            "gallery-number";

        number.textContent =
            `Portfolio หน้า ${i}`;


        item.appendChild(img);

        item.appendChild(number);


        item.addEventListener(
            "click",
            function () {

                openModal(img.src);

            }
        );


        gallery.appendChild(item);

    }

}


/* =========================================
   IMAGE MODAL
========================================= */

function openModal(src) {

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");


    if (!modal || !modalImage) return;


    modalImage.src = src;

    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeModal() {

    const modal =
        document.getElementById("imageModal");

    const modalImage =
        document.getElementById("modalImage");


    if (!modal || !modalImage) return;


    modal.classList.remove("active");

    modalImage.src = "";

    document.body.style.overflow =
        "";

}


/* คลิกพื้นหลังเพื่อปิด */

const modal =
    document.getElementById("imageModal");


if (modal) {

    modal.addEventListener(
        "click",
        function (event) {

            if (event.target === modal) {

                closeModal();

            }

        }
    );

}


/* กด ESC */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    const links =
        navMenu.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove(
                    "active"
                );

            }
        );

    });

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadImages();

    }
);
