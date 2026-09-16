/* =====================================================
   PORTFOLIO IMAGE SYSTEM
   ระบบค้นหาโฟลเดอร์รูปอัตโนมัติ
===================================================== */

const USERNAME = "467002-rgb";
const REPOSITORY = "myportforio";
const BRANCH = "main";



/* =====================================================
   ค้นหาโฟลเดอร์รูปใน GitHub
===================================================== */

async function findImageFolder() {

    const apiURL =
        `https://api.github.com/repos/${USERNAME}/${REPOSITORY}/contents/?ref=${BRANCH}`;

    try {

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("ไม่สามารถเชื่อมต่อ GitHub ได้");
        }

        const files = await response.json();

        /*
         ค้นหาโฟลเดอร์ที่มีคำว่า
         แฟ้มสะสมผลงาน / Portfolio
        */

        const folder = files.find(item =>
            item.type === "dir" &&
            (
                item.name.includes("แฟ้มสะสมผลงาน") ||
                item.name.includes("Portfolio") ||
                item.name.includes("พอร์ตโฟลิโอ")
            )
        );


        if (!folder) {

            console.error("ไม่พบโฟลเดอร์รูป");

            showImageError();

            return null;
        }


        return folder.name;

    } catch (error) {

        console.error(error);

        showImageError();

        return null;
    }
}



/* =====================================================
   สร้าง URL รูป
===================================================== */

function createImageURL(folderName, number) {

    const encodedFolder =
        encodeURIComponent(folderName);

    return `https://${USERNAME}.github.io/${REPOSITORY}/${encodedFolder}/${number}.png`;
}



/* =====================================================
   ใส่รูปให้กับหน้าเว็บ
===================================================== */

async function loadPortfolioImages() {

    const folderName = await findImageFolder();

    if (!folderName) return;


    /* รูปในส่วนต่าง ๆ */

    const images =
        document.querySelectorAll("[data-portfolio-image]");


    images.forEach(image => {

        const number =
            image.getAttribute("data-portfolio-image");

        const imageURL =
            createImageURL(folderName, number);

        image.src = imageURL;

    });



    /* =================================================
       สร้าง Gallery หน้า 1-11
    ================================================= */

    const galleryGrid =
        document.getElementById("galleryGrid");


    if (!galleryGrid) return;


    galleryGrid.innerHTML = "";


    for (let i = 1; i <= 11; i++) {

        const imageURL =
            createImageURL(folderName, i);


        const item =
            document.createElement("div");

        item.className =
            "gallery-item";


        item.innerHTML = `

            <img
                src="${imageURL}"
                alt="Portfolio หน้า ${i}"
            >

            <div class="gallery-number">
                Portfolio หน้า ${i}
            </div>

        `;


        item.addEventListener("click", function () {

            openModal(imageURL);

        });


        galleryGrid.appendChild(item);

    }

}



/* =====================================================
   ถ้ารูปโหลดไม่ได้
===================================================== */

function showImageError() {

    const gallery =
        document.getElementById("galleryGrid");


    if (gallery) {

        gallery.innerHTML = `

            <div style="
                width:100%;
                text-align:center;
                padding:30px;
            ">

                <h3>
                    🥺 ยังโหลดรูปไม่ได้
                </h3>

                <p>
                    กรุณารอสักครู่แล้วรีเฟรชหน้าเว็บ
                </p>

            </div>

        `;

    }

}



/* =====================================================
   IMAGE MODAL
===================================================== */

const modal =
    document.getElementById("imageModal");


const modalImage =
    document.getElementById("modalImage");



function openModal(src) {

    if (!modal || !modalImage) return;


    modalImage.src = src;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

}



function closeModal() {

    if (!modal || !modalImage) return;


    modal.classList.remove("active");

    modalImage.src = "";

    document.body.style.overflow = "";

}



/* คลิกพื้นหลังเพื่อปิด */

if (modal) {

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeModal();

            }

        }
    );

}



/* กด ESC เพื่อปิด */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

        }

    }
);



/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");


const navMenu =
    document.getElementById("navMenu");


if (menuBtn && navMenu) {

    menuBtn.addEventListener(
        "click",
        function() {

            navMenu.classList.toggle("active");

        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            function() {

                navMenu.classList.remove("active");

            }
        );

    });

}



/* =====================================================
   เริ่มระบบ
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPortfolioImages();

    }
);
