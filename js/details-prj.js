// Modal sửa
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("taskModal");
    const addTaskBtns = document.querySelectorAll(".edit-btn");
    const closeBtn = document.querySelector(".close"); 
    const cancelBtn = document.querySelector(".cancel-btn");

    addTaskBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            modal.style.display="flex";
        });
    });

    
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";

    });

    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
});

// Modal thêm nhiệm vụ

document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("taskPopup");
    const addTaskBtns = document.querySelectorAll(".add-btn");
    const closePopupBtn = document.querySelector(".close-popup");
    const dismissBtn = document.querySelector(".dismiss-btn");

    addTaskBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            popup.style.display = "flex";
        });
    });

    closePopupBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    dismissBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });
});
// Chuyển trang sang trang đăng nhập
document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "login.html";
});

// Modal xóa
document.addEventListener("DOMContentLoaded", function () {
    const deletePopup = document.querySelector(".delete-task-popup");
    const cancelBtn = document.querySelector(".cancel-delete-task-btn");
    const deleteButtons = document.querySelectorAll(".delete-task-btn");
    const closeDeleteBtn = document.querySelector(".close-delete-task-popup");

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

    // Đóng popup khi ấn nút hủy
    cancelBtn.addEventListener("click", function () {
        deletePopup.classList.remove("show");
    });

    // Đóng modal khi nhấn ra ngoài
    window.addEventListener("click", function (e) {
        if (e.target === deletePopup) {
            deletePopup.classList.remove("show");
        }
    });
});

// Modal thêm thành viên
document.addEventListener("DOMContentLoaded", function () {
    const memberModal = document.getElementById("memberModal");
    const btnAddMember = document.getElementById("btnAddMember");
    const btnClose = document.querySelector(".btn-close");
    const btnCancel = document.querySelector(".btn-cancel");

    // Hiển thị modal
    btnAddMember.addEventListener("click", function () {
        memberModal.classList.add("show");
    });

    // Ẩn modal khi nhấn vào nút X
    btnClose.addEventListener("click", function () {
        memberModal.classList.remove("show");
    });

    // Ẩn modal khi nhấn nút "Huỷ"
    btnCancel.addEventListener("click", function () {
        memberModal.classList.remove("show");
    });

    // Ẩn modal khi nhấn ra ngoài
    window.addEventListener("click", function (event) {
        if (event.target === memberModal) {
            memberModal.classList.remove("show");
        }
    });
});