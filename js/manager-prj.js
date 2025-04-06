
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


// const projects = [
//     {
//         id: 1,
//         projectName: "Xây dựng website thương mại điện tử",
//         description: "Website mua bán trực tuyến hiện đại",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 2, role: "Frontend developer" },
//             { userId: 3, role: "Backend developer" }
//         ]
//     },
//     {
//         id: 2,
//         projectName: "Ứng dụng quản lý công việc cá nhân",
//         description: "Quản lý lịch và công việc hằng ngày",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 4, role: "UI/UX designer" }
//         ]
//     },
//     {
//         id: 3,
//         projectName: "Hệ thống quản lý sinh viên",
//         description: "Quản lý thông tin sinh viên khoa học",
//         members: [
//             { userId: 3, role: "Project owner" },
//             { userId: 1, role: "Tester" }
//         ]
//     },
//     {
//         id: 4,
//         projectName: "Landing page giới thiệu sản phẩm",
//         description: "Trang giới thiệu sản phẩm bắt mắt",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 4, role: "Frontend developer" }
//         ]
//     },
//     {
//         id: 5,
//         projectName: "App học từ vựng tiếng Anh",
//         description: "Ứng dụng học từ vựng hiệu quả",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 3, role: "Content manager" }
//         ]
//     },
//     {
//         id: 6,
//         projectName: "Hệ thống đặt phòng khách sạn",
//         description: "Đặt phòng nhanh chóng, dễ dàng",
//         members: [
//             { userId: 3, role: "Project owner" },
//             { userId: 2, role: "UI/UX designer" },
//             { userId: 4, role: "Tester" }
//         ]
//     },
//     {
//         id: 7,
//         projectName: "Ứng dụng thời tiết realtime",
//         description: "Xem thời tiết mọi nơi, realtime",
//         members: [
//             { userId: 4, role: "Project owner" },
//             { userId: 1, role: "Frontend developer" }
//         ]
//     },
//     {
//         id: 8,
//         projectName: "Blog chia sẻ kiến thức lập trình",
//         description: "Chia sẻ kiến thức lập trình hay",
//         members: [
//             { userId: 1, role: "Project owner" },
//             { userId: 2, role: "Editor" }
//         ]
//     },
//     {
//         id: 9,
//         projectName: "Hệ thống quản lý bài tập sinh viên",
//         description: "Theo dõi và quản lý bài tập",
//         members: [
//             { userId: 2, role: "Project owner" },
//             { userId: 3, role: "Backend developer" }
//         ]
//     }
// ];

// localStorage.setItem("projects", JSON.stringify(projects));

// Hiển thị danh sách các dự án mà user là chủ
function renderList() {
    // Giả sử user đã đăng nhập và được lưu trong localStorage
    const currentUserId = parseInt(localStorage.getItem("userId"));

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const ownedProjects = projects.filter(project =>
        project.members.some(member => member.userId === currentUserId && member.role === "Project owner")
    );
    const projectListDiv = document.getElementById("projectList");
    projectListDiv.innerHTML = "";
    if (ownedProjects.length === 0) {
        projectListDiv.innerHTML = "<p>Không có dự án nào bạn làm chủ.</p>";
    } else {
        let element = "";
        for (let i = 0; i < ownedProjects.length; i++) {
            element += `<tr>
            <td class="center">${ownedProjects[i].id}</td>
            <td>${ownedProjects[i].projectName}</td>
            <td class="center">
                <button class="edit-btn" onclick=" openEditModal()">Sửa</button>
                <button class="delete-btn" onclick="openDeletePopup(${i})">Xóa</button>
                <button class="detail-btn">Chi tiết</button>
            </td>
        </tr>`
        }
        projectListDiv.innerHTML = element;
    }
}
renderList();

// Hàm mở modal chỉnh sửa
function openEditModal() {
    const editModal = document.querySelector(".modal");
    editModal.classList.add("show");
}

// Hàm đóng modal chỉnh sửa
function closeEditModal() {
    const editModal = document.querySelector(".modal");
    editModal.classList.remove("show");
}

// Hàm hủy chỉnh sửa và đóng modal
function cancelEditAction() {
    const editModal = document.querySelector(".modal");
    editModal.classList.remove("show");
}


// Hàm mở popup xóa
function openDeletePopup(index) {
    const deletePopup = document.querySelector(".popup");
    deletePopup.classList.add("show");
    let confirmDeleteBtn = document.querySelector(".confirmDeleteBtn");
    confirmDeleteBtn.onclick = function () {
        confirmDelete(index);
        closeDeletePopup();
    }

}

// Hàm đóng popup xóa
function closeDeletePopup() {
    const deletePopup = document.querySelector(".popup");
    deletePopup.classList.remove("show");
}
// Hàm xác nhận xóa dự án
function confirmDelete(indexInOwnedProjects) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const currentUserId = parseInt(localStorage.getItem("userId"));

    // Tìm danh sách ownedProjects để xác định id
    const ownedProjects = projects.filter(project =>
        project.members.some(member => member.userId === currentUserId && member.role === "Project owner")
    );

    const projectIdToDelete = ownedProjects[indexInOwnedProjects].id;

    // Xóa đúng project trong mảng gốc theo id
    const updatedProjects = projects.filter(project => project.id !== projectIdToDelete);

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    renderList();
}

// Hàm hủy xóa và đóng popup
function cancelDeleteAction() {
    const deletePopup = document.querySelector(".popup");
    deletePopup.classList.remove("show");
}

// Hàm chuyển sang màn hình chi tiết
function goToDetailsPage() {
    window.location.href = "details-prj.html";
}

// Đảm bảo rằng bạn đã thêm sự kiện "click" vào các nút để chuyển sang màn hình chi tiết
document.querySelectorAll(".detail-btn").forEach(button => {
    button.addEventListener("click", goToDetailsPage);
});

// Đóng modal hoặc popup khi nhấn ra ngoài
window.addEventListener("click", function (e) {
    const editModal = document.querySelector(".modal");
    const deletePopup = document.querySelector(".popup");

    if (e.target === editModal) {
        editModal.classList.remove("show");
    }
    if (e.target === deletePopup) {
        deletePopup.classList.remove("show");
    }
});



// Modal thêm dự án
function openModal() {
    document.getElementById("addModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("addModal").style.display = "none";
}

// thêm dự án
function saveProject() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const newId = projects.length > 0 ? projects[projects.length - 1].id + 1 : 1;
    const userId = parseInt(localStorage.getItem("userId"));
    const projectName = document.querySelector(".addModal .namePrj").value.trim();
    const description = document.getElementById("projectDesc").value.trim();
    const errorText = document.getElementById("errorText");
    errorText.innerText = "";

    let isValid = true;

    // Kiểm tra rỗng
    if (projectName === "" || description === "") {
        errorText.innerText = "Tên và mô tả dự án không được để trống.";
        isValid = false;
    }

    // Kiểm tra độ dài tên dự án
    if (projectName.length < 5 || projectName.length > 50) {
        errorText.innerText = "Tên dự án phải từ 5 đến 50 ký tự.";
        isValid = false;
    }

    // Kiểm tra độ dài mô tả
    if (description.length < 10 || description.length > 50) {
        errorText.innerText = "Mô tả phải từ 5 đến 50 ký tự.";
        isValid = false;
    }

    // Kiểm tra tên trùng trong ownedProjects
    const ownedProjects = projects.filter(project =>
        project.members.some(member => member.userId === userId && member.role === "Project owner")
    );
    const isDuplicate = ownedProjects.some(project =>
        project.projectName.toLowerCase() === projectName.toLowerCase()
    );
    if (isDuplicate) {
        errorText.innerText = "Tên danh mục đã tồn tại.";
        isValid = false;
    }

    // Nếu không hợp lệ thì thoát
    if (!isValid) return;

    // Tạo và lưu dự án
    const newPrj = {
        id: newId,
        projectName: projectName,
        description: description,
        members: [
            { userId: userId, role: "Project owner" }
        ]
    };

    projects.push(newPrj);
    localStorage.setItem("projects", JSON.stringify(projects));
    renderList();
    closeModal();
    document.querySelector(".addModal .namePrj").value = "";
    document.getElementById("projectDesc").value = "";
}

// Tìm kiếm dự án
function searchPrj() {
    let searchValue = document.getElementById("searchPrj").value.toLowerCase().trim();
    let currentUserId = localStorage.getItem("userId");
    const projects = JSON.parse(localStorage.getItem("projects")) || []; 

    // Lọc các dự án mà người dùng là chủ
    let ownedProjects = projects.filter((project) =>
        project.members.some((member) => member.userId === parseInt(currentUserId) && member.role === "Project owner")
    );

    // Kiểm tra nếu tên dự án chứa giá trị tìm kiếm
    let filteredProjects = ownedProjects.filter((project) =>
        project.projectName.toLowerCase().includes(searchValue)
    );

    // Hiển thị kết quả tìm kiếm
    const projectListDiv = document.getElementById("projectList");
    projectListDiv.innerHTML = "";

    if (filteredProjects.length === 0) {
        projectListDiv.innerHTML = "<p>Không tìm thấy dự án nào.</p>";
    } else {
        let element = "";
        filteredProjects.forEach((project, index) => { 
            element += `<tr>
                <td class="center">${project.id}</td>
                <td>${project.projectName}</td>
                <td class="center">
                    <button class="edit-btn" onclick="openEditModal()">Sửa</button>
                    <button class="delete-btn" onclick="openDeletePopup(${index})">Xóa</button>
                    <button class="detail-btn">Chi tiết</button>
                </td>
            </tr>`;
        });
        projectListDiv.innerHTML = element;
    }
}
