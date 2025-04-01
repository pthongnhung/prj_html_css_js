document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.querySelector(".modal");
    const deletePopup = document.querySelector(".popup");

    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const detailButtons = document.querySelectorAll(".detail-btn");

    const closeEditBtn = document.querySelector(".modal .close");
    const closeDeleteBtn = document.querySelector(".popup .close");

    // Mở modal chỉnh sửa
    editButtons.forEach(button => {
        button.addEventListener("click", function () {
            editModal.classList.add("show");
        });
    });

    // Đóng modal chỉnh sửa
    closeEditBtn.addEventListener("click", function () {
        editModal.classList.remove("show");
    });

    // Mở popup xoá
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            deletePopup.classList.add("show");
        });
    });

    // Đóng popup xoá
    closeDeleteBtn.addEventListener("click", function () {
        deletePopup.classList.remove("show");
    });

    // Chuyển sang màn hình chi tiết khi click vào "Chi tiết"
    detailButtons.forEach(button => {
        button.addEventListener("click", function () {
            window.location.href = "details-prj.html";
        });
    });

    // Đóng modal khi nhấn ra ngoài
    window.addEventListener("click", function (e) {
        if (e.target === editModal) {
            editModal.classList.remove("show");
        }
        if (e.target === deletePopup) {
            deletePopup.classList.remove("show");
        }
    });
});
//Thanh dieu huong
document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentPage = 1;

    function updatePagination() {
        pages.forEach((page, index) => {
            if (index + 1 === currentPage) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }
        });

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === pages.length;
    }

    pages.forEach((page, index) => {
        page.addEventListener("click", function () {
            currentPage = index + 1;
            updatePagination();
        });
    });

    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentPage < pages.length) {
            currentPage++;
            updatePagination();
        }
    });

    updatePagination();
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "login.html"; 
});