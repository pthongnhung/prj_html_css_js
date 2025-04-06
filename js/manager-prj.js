document.addEventListener("DOMContentLoaded", function () {
    const editModal = document.querySelector(".modal");
    const deletePopup = document.querySelector(".popup");

    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");
    const detailButtons = document.querySelectorAll(".detail-btn");

    const closeEditBtn = document.querySelector(".modal .close");
    const closeDeleteBtn = document.querySelector(".popup .close");
    const cancelDelete = document.querySelector(".popup .cancelDeleteBtn");
    const cancelEdit = document.querySelector(".modal .cancel-btn");
    

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

    // Đóng modal xóa khi ấn nút hủy
    cancelEdit.addEventListener("click", function () {
        editModal.classList.remove("show");
    })

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


    // Đóng popup xóa khi ấn nút hủy
    cancelDelete.addEventListener("click", function () {
        deletePopup.classList.remove("show");
    })

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

// Modal thêm dự án
function openModal() {
    document.getElementById("addModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addModal").style.display = "none";
}


// const projects = [
//     {
//         id: 1,
//         projectName: "Xây dựng website thương mại điện tử",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 2, role: "Frontend developer" },
//             { userId: 3, role: "Backend developer" }
//         ]
//     },
//     {
//         id: 2,
//         projectName: "Ứng dụng quản lý công việc cá nhân",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 4, role: "UI/UX designer" }
//         ]
//     },
//     {
//         id: 3,
//         projectName: "Hệ thống quản lý sinh viên",
//         members: [
//             { userId: 3, role: "Project owner" },
//             { userId: 1, role: "Tester" }
//         ]
//     },
//     {
//         id: 4,
//         projectName: "Landing page giới thiệu sản phẩm",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 4, role: "Frontend developer" }
//         ]
//     },
//     {
//         id: 5,
//         projectName: "App học từ vựng tiếng Anh",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 3, role: "Content manager" }
//         ]
//     },
//     {
//         id: 6,
//         projectName: "Hệ thống đặt phòng khách sạn",
//         members: [
//             { userId: 3, role: "Project owner" },
//             { userId: 2, role: "UI/UX designer" },
//             { userId: 4, role: "Tester" }
//         ]
//     },
//     {
//         id: 7,
//         projectName: "Ứng dụng thời tiết realtime",
//         members: [
//             { userId: 4, role: "Project owner" },
//             { userId: 1, role: "Frontend developer" }
//         ]
//     },
//     {
//         id: 8,
//         projectName: "Blog chia sẻ kiến thức lập trình",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 2, role: "Editor" }
//         ]
//     },
//     {
//         id: 9,
//         projectName: "Hệ thống quản lý bài tập sinh viên",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 3, role: "Backend developer" }
//         ]
//     }
// ];
// localStorage.setItem("projects", JSON.stringify(projects));

// Giả sử user đã đăng nhập và được lưu trong localStorage
const currentUserId = parseInt(localStorage.getItem("userId"));

const projects = JSON.parse(localStorage.getItem("projects")) || [];

const ownedProjects = projects.filter(project =>
    project.members.some(member => member.userId === currentUserId && member.role === "Project owner")
);

const projectListDiv = document.getElementById("projectList");
// Hiển thị danh sách các dự án mà user là chủ
if (ownedProjects.length === 0) {
    projectListDiv.innerHTML = "<p>Không có dự án nào bạn làm chủ.</p>";
} else {
    let element = "";
    for (let i = 0; i < ownedProjects.length; i++){
        element += `<tr>
            <td class="center">${ownedProjects[i].id}</td>
            <td>${ownedProjects[i].projectName}</td>
            <td class="center">
                <button class="edit-btn">Sửa</button>
                <button class="delete-btn">Xóa</button>
                <button class="detail-btn">Chi tiết</button>
            </td>
        </tr>`
    }
    projectListDiv.innerHTML = element;
     
}


