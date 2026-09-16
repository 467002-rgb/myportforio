// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}


// ปิดเมนูเมื่อกดลิงก์
document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});



// ========================================
// PORTFOLIO GALLERY
// ========================================

const galleryGrid =
    document.getElementById("galleryGrid");

const imageFolder = "images";


// สร้างรูปทั้งหมด 11 หน้า
for (let i = 1; i <= 11; i++) {

    const item = document.createElement("div");

    item.className = "gallery-item";

    item.innerHTML = `
        <img
            src="${imageFolder}/${i}.png"
            alt="Portfolio หน้า ${i}"
            loading="lazy"
        >

        <div class="gallery-number">
            Portfolio หน้า ${i}
        </div>
    `;

    item.addEventListener("click", () => {

        openModal(`${imageFolder}/${i}.png`);

    });

    galleryGrid.appendChild(item);
}



// ========================================
// IMAGE MODAL
// ========================================

const modal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");


function openModal(imageSrc) {

    modalImage.src = imageSrc;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal() {

    modal.classList.remove("active");

    modalImage.src = "";

    document.body.style.overflow = "";
}



// คลิกพื้นหลังเพื่อปิด
modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        closeModal();

    }

});



// กด ESC เพื่อปิดรูป
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});
