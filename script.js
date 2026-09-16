const galleryGrid = document.getElementById("galleryGrid");

const imageFolder =
    "สีแดงเข้ม โมเดิร์น แฟ้มสะสมผลงาน พอร์ตโฟลิโอ Portfolio เอกสาร A4";

if (galleryGrid) {

    for (let i = 1; i <= 11; i++) {

        const item = document.createElement("div");

        item.className = "gallery-item";

        item.innerHTML = `
            <img
                src="${imageFolder}/${i}.png"
                alt="Portfolio หน้า ${i}"
            >

            <div class="gallery-number">
                Portfolio หน้า ${i}
            </div>
        `;

        item.addEventListener("click", function () {
            openModal(`${imageFolder}/${i}.png`);
        });

        galleryGrid.appendChild(item);
    }
}


const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");


function openModal(src) {

    if (!modal || !modalImage) {
        return;
    }

    modalImage.src = src;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeModal() {

    if (!modal || !modalImage) {
        return;
    }

    modal.classList.remove("active");

    modalImage.src = "";

    document.body.style.overflow = "";
}


if (modal) {

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {
            closeModal();
        }

    });

}


document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});
