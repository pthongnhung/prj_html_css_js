let projects = JSON.parse(localStorage.getItem("projects")) || []

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

// Mở modal sửa nhiệm vụ
function openEditModal() {
    const modal = document.getElementById("taskModal");
    modal.style.display = "flex";
}
// Mở modal xóa nhiệm vụ
function openDeleteModal() {
    const deletePopup = document.querySelector(".delete-task-popup");
    deletePopup.classList.add("show");
}

// Đóng modal sửa và xóa nhiệm vụ
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("taskModal");
    const closeBtn = document.querySelector(".close");
    const cancelBtn = document.querySelector(".cancel-btn");

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    const deletePopup = document.querySelector(".delete-task-popup");
    const cancelDeleteBtn = document.querySelector(".cancel-delete-task-btn");
    const closeDeleteBtn = document.querySelector(".close-delete-task-popup");

    closeDeleteBtn.addEventListener("click", function () {
        deletePopup.classList.remove("show");
    });

    cancelDeleteBtn.addEventListener("click", function () {
        deletePopup.classList.remove("show");
    });

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

// Ham render
let idDetail = localStorage.getItem("key_detail");

function renderList() {
    let filterProject = projects.find((e) => e.id == idDetail)
    console.log(filterProject);
    let projectName = document.getElementById("projectName");
    let projectDescription = document.getElementById("projectDescription");
    projectName.innerText = filterProject.projectName;
    projectDescription.innerText = filterProject.description;
}
renderList();
// const tasks = [
//     {
//         id: 1,
//         taskName: "Soạn thảo đề cương dự án",
//         assigneeId: 1,
//         projectId: 1,
//         asignDate: "2025-03-24",
//         dueDate: "2025-03-26",
//         priority: "Thấp",
//         progress: "Đúng tiến độ",
//         status: "To do"
//     },
//     {
//         id: 2,
//         taskName: "Thiết kế giao diện người dùng",
//         assigneeId: 2,
//         projectId: 1,
//         asignDate: "2025-03-25",
//         dueDate: "2025-03-30",
//         priority: "Cao",
//         progress: "Trễ hạn",
//         status: "In progress"
//     },
//     {
//         id: 3,
//         taskName: "Thiết kế giao diện người dùng",
//         assigneeId: 2,
//         projectId: 1,
//         asignDate: "2025-03-25",
//         dueDate: "2025-03-30",
//         priority: "Trung bình",
//         progress: "Có rủi ro",
//         status: "Done"
//     },
//     {
//         id: 4,
//         taskName: "Thiết kế giao diện người dùng",
//         assigneeId: 2,
//         projectId: 1,
//         asignDate: "2025-03-25",
//         dueDate: "2025-03-30",
//         priority: "Cao",
//         progress: "Trễ hạn",
//         status: "Pending"
//     },
// ];

// localStorage.setItem("tasks", JSON.stringify(tasks));

function showList() {

    // Lấy dữ liệu từ localStorage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Tìm project hiện tại
    const currentProject = projects.find(p => p.id == idDetail);
    if (!currentProject) {
        console.error("Không tìm thấy dự án");
        return;
    }

    // Lọc các task thuộc project đó
    const filteredTasks = tasks.filter(task => task.projectId == idDetail);

    // Lấy phần tử hiển thị task
    const taskListElement = document.querySelector(".taskList");
    taskListElement.innerHTML = ""; // Xóa nội dung cũ

    // Gom theo status
    const statusGroups = ["To do", "In progress", "Pending", "Done"];

    statusGroups.forEach(status => {
        // Tiêu đề nhóm task
        taskListElement.innerHTML += `
            <tr>
                <td colspan="7">
                    <img src="../assets/1.png" alt=""> <span><b>${status}</b></span>
                </td>
            </tr>
        `;

        // Lọc task theo status
        const groupTasks = filteredTasks.filter(task => task.status === status);

        groupTasks.forEach(task => {
            // Tìm người phụ trách trong danh sách members của project
            const member = currentProject.members.find(m => m.userId === task.assigneeId);
            const assigneeName = member && member.fullName ? member.fullName : "Không rõ";

            // Gán class màu theo priority
            let priorityClass = "";
            if (task.priority === "Cao") priorityClass = "red";
            else if (task.priority === "Trung bình") priorityClass = "yellow";
            else priorityClass = "blue";

            // Gán class màu theo progress
            let progressClass = "";
            if (task.progress === "Trễ hạn") progressClass = "red";
            else if (task.progress === "Có rủi ro") progressClass = "yellow";
            else progressClass = "green";

            // Chuyển ngày về dạng MM-DD
            const formatDate = (dateStr) => {
                const d = new Date(dateStr);
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                return `${month}-${day}`;
            };

            // Thêm dòng task vào HTML
            taskListElement.innerHTML += `
                <tr>
                    <td>${task.taskName}</td>
                    <td class="center">${assigneeName}</td>
                    <td class="center"><button class="${priorityClass}">${task.priority}</button></td>
                    <td class="center">${formatDate(task.asignDate)}</td>
                    <td class="center">${formatDate(task.dueDate)}</td>
                    <td class="center"><button class="${progressClass}">${task.progress}</button></td>
                    <td class="center">
                        <button class="edit-btn" onclick="openEditModal()">Sửa</button>
                        <button class="delete-task-btn" onclick="openDeleteModal()">Xóa</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Gọi hàm khi trang load
document.addEventListener("DOMContentLoaded", showList);

showList();

