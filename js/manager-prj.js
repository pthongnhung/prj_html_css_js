
//Thanh dieu huong
document.addEventListener("DOMContentLoaded", function () {
    const pageButtons = document.querySelectorAll(".pagination .page");
    const prevBtn = document.querySelector(".pagination .prev");
    const nextBtn = document.querySelector(".pagination .next");

    pageButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentPage = index + 1;
            renderList();
        });
    });

    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderList();
        }
    });

    nextBtn.addEventListener("click", () => {
        currentPage++;
        renderList();
    });

    renderList(); // Gọi lần đầu khi trang tải
});


function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const pageButtons = document.querySelectorAll(".pagination .page");
    const prevBtn = document.querySelector(".pagination .prev");
    const nextBtn = document.querySelector(".pagination .next");

    // Cập nhật class active
    pageButtons.forEach((btn, index) => {
        btn.classList.toggle("active", index + 1 === currentPage);
    });

    // Vô hiệu hóa nút prev và next nếu cần
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}


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
let currentPage = 1;
const itemsPerPage = 9;

function renderList() {
    const currentUserId = parseInt(localStorage.getItem("userId"));
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    const ownedProjects = projects.filter(project =>
        project.members?.some(member => member.userId === currentUserId && member.role === "Project owner")
    );

    const projectListDiv = document.getElementById("projectList");
    projectListDiv.innerHTML = "";

    if (ownedProjects.length === 0) {
        projectListDiv.innerHTML = "<p>Không có dự án nào bạn làm chủ.</p>";
        return;
    }

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProjects = ownedProjects.slice(start, end);

    let element = "";
    for (let i = 0; i < paginatedProjects.length; i++) {
        const indexInOwned = start + i;
        element += `<tr>
            <td class="center">${paginatedProjects[i].id}</td>
            <td>${paginatedProjects[i].projectName}</td>
            <td class="center">
                <button class="edit-btn" onclick="openEditModal(${paginatedProjects[i].id})">Sửa</button>
                <button class="delete-btn" onclick="openDeletePopup(${indexInOwned})">Xóa</button>
                <button class="detail-btn">Chi tiết</button>
            </td>
        </tr>`;
    }

    projectListDiv.innerHTML = element;
    attachDetailEvents();
    updatePagination(ownedProjects.length);
}

renderList();

// Hàm mở modal chỉnh sửa
let editingProjectId = null;
function openEditModal(projectId) {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    editingProjectId = projectId;

    document.getElementById("projectName").value = project.projectName;
    document.getElementById("projectDescription").value = project.description;

    // Ẩn thông báo lỗi nếu có
    document.querySelector(".error-message").style.display = "none";

    // Mở modal
    document.getElementById("modal").classList.add("show");
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

// Hàm xác nhận chỉnh sửa
function confirmEdit() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const currentUserId = parseInt(localStorage.getItem("userId"));
    const projectNameInput = document.getElementById("projectName");
    const descriptionInput = document.getElementById("projectDescription");
    const errorText = document.querySelector(".error-message");

    const newName = projectNameInput.value.trim();
    const newDesc = descriptionInput.value.trim();

    let isValid = true;
    errorText.style.display = "none";
    errorText.innerText = "";

    // Kiểm tra rỗng
    if (newName === "" || newDesc === "") {
        errorText.innerText = "Tên và mô tả dự án không được để trống.";
        isValid = false;
    }

    // Kiểm tra độ dài tên dự án
    else if (newName.length < 5 || newName.length > 50) {
        errorText.innerText = "Tên dự án phải từ 5 đến 50 ký tự.";
        isValid = false;
    }

    // Kiểm tra độ dài mô tả
    else if (newDesc.length < 10 || newDesc.length > 50) {
        errorText.innerText = "Mô tả phải từ 10 đến 50 ký tự.";
        isValid = false;
    }

    // Kiểm tra trùng tên với các project khác của người dùng
    else {
        const ownedProjects = projects.filter(project =>
            project.members.some(member => member.userId === currentUserId && member.role === "Project owner")
        );

        const isDuplicate = ownedProjects.some(project =>
            project.projectName.toLowerCase() === newName.toLowerCase() &&
            project.id !== editingProjectId
        );

        if (isDuplicate) {
            errorText.innerText = "Tên danh mục đã tồn tại.";
            isValid = false;
        }
    }

    if (!isValid) {
        errorText.style.display = "block";
        return;
    }

    // Cập nhật dữ liệu
    const projectIndex = projects.findIndex(p => p.id === editingProjectId);
    if (projectIndex !== -1) {
        projects[projectIndex].projectName = newName;
        projects[projectIndex].description = newDesc;
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    // Đóng modal và cập nhật UI
    closeEditModal();
    renderList();
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

// Đảm bảo rằng thêm sự kiện "click" vào các nút để chuyển sang màn hình chi tiết
function attachDetailEvents() {
    document.querySelectorAll(".detail-btn").forEach(button => {
        button.addEventListener("click", goToDetailsPage);
    });
}

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
    if (description.length < 10 || description.length > 100) {
        errorText.innerText = "Mô tả phải từ 5 đến 100 ký tự.";
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
        filteredProjects.forEach((project) => {
            const ownedProjects = projects.filter(p =>
                p.members.some(member => member.userId === parseInt(currentUserId) && member.role === "Project owner")
            );

            const indexInOwned = ownedProjects.findIndex(p => p.id === project.id);

            element += `<tr>
                    <td class="center">${project.id}</td>
                    <td>${project.projectName}</td>
                    <td class="center">
                        <button class="edit-btn" onclick="openEditModal(${project.id})">Sửa</button>
                        <button class="delete-btn" onclick="openDeletePopup(${indexInOwned})">Xóa</button>
                        <button class="detail-btn">Chi tiết</button>
                    </td>
            </tr>`;
        });
        projectListDiv.innerHTML = element;
        attachDetailEvents();
    }
}
