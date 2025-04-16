let projects = JSON.parse(localStorage.getItem("projects")) || []

// Modal thêm nhiệm vụ
document.addEventListener("DOMContentLoaded", function () {
    const btnAddTask = document.getElementById("btnAddTask");
    const taskPopup = document.getElementById("taskPopup");
    const closePopupBtn = document.querySelector(".close-popup");
    const dismissBtn = document.querySelector(".dismiss-btn");

    if (btnAddTask) {
        btnAddTask.onclick = function () {
            populateTaskOwnerOptions();
            taskPopup.style.display = "flex";
        };
    }

    // Đóng modal khi nhấn nút "X" hoặc "Hủy"
    closePopupBtn.onclick = function () {
        taskPopup.style.display = "none";
        clearTaskForm();
    };
    dismissBtn.onclick = function () {
        taskPopup.style.display = "none";
        clearTaskForm();
    };

});


// Hàm đổ danh sách người phụ trách vào select "taskOwner"
function populateTaskOwnerOptions() {
    const taskOwnerSelect = document.getElementById("taskOwner");
    taskOwnerSelect.innerHTML = '<option value="">Chọn người phụ trách</option>';
    const projectId = localStorage.getItem("key_detail");
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const currentProject = projects.find(project => project.id == projectId);

    if (currentProject && Array.isArray(currentProject.members)) {
        currentProject.members.forEach(function (member) {
            const option = document.createElement("option");
            option.value = member.userId;         // Dùng userId làm giá trị
            option.textContent = member.fullName;   // Hiển thị tên đầy đủ
            taskOwnerSelect.appendChild(option);
        });
    }
}

// Hàm hiển thị lỗi cho trường cụ thể
function showTaskError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerText = message;
        el.style.display = "block";
    }
}

// Hàm ẩn tất cả lỗi
function hideAllTaskErrors() {
    const errors = document.querySelectorAll(".error-text");
    errors.forEach(function (el) {
        el.style.display = "none";
    });
}

// Hàm reset form thêm nhiệm vụ
function clearTaskForm() {
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskOwner").value = "";
    document.getElementById("taskStatus").value = "";
    document.getElementById("taskStartDate").value = "";
    document.getElementById("taskDueDate").value = "";
    document.getElementById("taskPriority").value = "";
    document.getElementById("taskProgress").value = "";
    hideAllTaskErrors();
}

// Hàm xử lý lưu nhiệm vụ mới khi nhấn "Lưu"
function handleSaveTask() {
    // Lấy dữ liệu từ form
    const title = document.getElementById("taskTitle").value.trim();
    const owner = document.getElementById("taskOwner").value;
    const status = document.getElementById("taskStatus").value;
    const startDate = document.getElementById("taskStartDate").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const priority = document.getElementById("taskPriority").value;
    const progress = document.getElementById("taskProgress").value;

    // Lấy các phần tử hiển thị lỗi
    const titleErrorId = "taskTitleError";
    const ownerErrorId = "taskOwnerError";
    const statusErrorId = "taskStatusError";
    const startDateErrorId = "taskStartDateError";
    const dueDateErrorId = "taskDueDateError";
    const priorityErrorId = "taskPriorityError";
    const progressErrorId = "taskProgressError";

    // Ẩn tất cả lỗi cũ
    hideAllTaskErrors();

    let valid = true;
    const today = new Date().toISOString().split("T")[0]; // Định dạng yyyy-mm-dd

    // Lấy danh sách nhiệm vụ hiện có
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];


    // Kiểm tra tên nhiệm vụ
    if (title === "") {
        showTaskError(titleErrorId, "Tên nhiệm vụ không được để trống");
        valid = false;
    } else if (title.length < 3 || title.length > 50) {
        showTaskError(titleErrorId, "Tên nhiệm vụ phải từ 5 đến 50 ký tự");
        valid = false;
    } else if (tasks.some(task => tasks.some(task =>
        task.taskName.toLowerCase() === title.toLowerCase() &&
        task.projectId == idDetail
    ))) {
        console.log(tasks);
        showTaskError(titleErrorId, "Tên nhiệm vụ đã tồn tại");
        valid = false;
    }

    // Kiểm tra người phụ trách
    if (owner === "") {
        showTaskError(ownerErrorId, "Vui lòng chọn người phụ trách");
        valid = false;
    }

    // Kiểm tra trạng thái
    if (status === "") {
        showTaskError(statusErrorId, "Vui lòng chọn trạng thái");
        valid = false;
    }

    // Kiểm tra ngày bắt đầu
    if (startDate === "") {
        showTaskError(startDateErrorId, "Vui lòng chọn ngày bắt đầu");
        valid = false;
    }

    // Kiểm tra hạn chót
    if (dueDate === "") {
        showTaskError(dueDateErrorId, "Vui lòng chọn hạn chót");
        valid = false;
    } else if (dueDate <= startDate) {
        showTaskError(dueDateErrorId, "Hạn chót phải lớn hơn ngày bắt đầu");
        valid = false;
    }

    // Kiểm tra độ ưu tiên
    if (priority === "") {
        showTaskError(priorityErrorId, "Vui lòng chọn độ ưu tiên");
        valid = false;
    }

    // Kiểm tra tiến độ
    if (progress === "") {
        showTaskError(progressErrorId, "Vui lòng chọn tiến độ");
        valid = false;
    }

    // Nếu không hợp lệ, dừng hàm
    if (!valid) return;

    // Nếu hợp lệ, tạo nhiệm vụ mới
    const newTask = {
        id: Math.floor(Math.random() * 3456),
        taskName: title,
        assigneeId: parseInt(owner),
        projectId: parseInt(idDetail),
        asignDate: startDate,
        dueDate: dueDate,
        priority: priority,
        progress: progress,
        status: status
    };

    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Đóng modal và reset form
    document.getElementById("taskPopup").style.display = "none";
    clearTaskForm();

    // Gọi hàm showList() để cập nhật giao diện nhiệm vụ (nếu đã có hàm này)
    if (typeof showList === "function") {
        showList();
    }
}


// Chuyển trang sang trang đăng nhập
document.getElementById("logoutBtn").addEventListener("click", function () {
    window.location.href = "login.html";
});



// Mở modal xóa nhiệm vụ
function openDeleteModal(taskId) {
    console.log("openDeleteModal được gọi với ID:", taskId);
    taskIdToDelete = taskId;
    const deletePopup = document.querySelector(".delete-task-popup");
    deletePopup.classList.add("show");
}

function confirmDeleteTask() {
    if (taskIdToDelete !== null) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const index = tasks.findIndex(task => task.id == taskIdToDelete);

        if (index !== -1) {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));

        }

        closeDeleteModal();
        showList();
        taskIdToDelete = null;
    }
}

// Hàm đóng popup xác nhận xóa nhiệm vụ
function closeDeleteModal() {
    const deletePopup = document.querySelector(".delete-task-popup");
    deletePopup.classList.remove("show");
}

// Mở modal sửa nhiệm vụ
function openEditModal(taskId) {
    taskIdToEdit = taskId;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    populateEditTaskOwnerOptions();
    document.getElementById("taskName").value = task.taskName;
    document.getElementById("assignedTo").value = task.assigneeId;
    document.getElementById("status").value = task.status;
    document.getElementById("startDate").value = task.asignDate;
    document.getElementById("dueDate").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("progress").value = task.progress;

    document.getElementById("taskModal").style.display = "flex";
}

// Hàm đổ danh sách người phụ trách vào select "assignedTo" trong modal sửa
function populateEditTaskOwnerOptions() {
    const assignedToSelect = document.getElementById("assignedTo");

    // Xóa hết option cũ và thêm option mặc định
    assignedToSelect.innerHTML = '<option value="">Chọn người phụ trách</option>';
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const currentProject = projects.find(project => project.id == idDetail);

    // Nếu tìm thấy project và có danh sách thành viên
    if (currentProject && Array.isArray(currentProject.members)) {
        currentProject.members.forEach(function (member) {
            const option = document.createElement("option");
            option.value = member.userId;
            option.textContent = member.fullName;
            assignedToSelect.appendChild(option);
        });
    }
}


// Hàm đóng modal sửa nhiệm vụ
function closeEditModal() {
    const modal = document.getElementById("taskModal");
    modal.style.display = "none";
}
// Confirm sửa nhiệm vụ
function confirmEdit() {
    const taskName = document.getElementById("taskName").value;
    const assigneeId = parseInt(document.getElementById("assignedTo").value);
    const status = document.getElementById("status").value;
    const startDate = document.getElementById("startDate").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;
    const progress = document.getElementById("progress").value;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(t => t.id === taskIdToEdit);
    if (index !== -1) {
        tasks[index] = {
            ...tasks[index],
            taskName,
            assigneeId,
            status,
            asignDate: startDate,
            dueDate,
            priority,
            progress
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
        closeEditModal();
        showList();
    }
}


// Modal thêm thành viên
document.addEventListener("DOMContentLoaded", function () {
    const memberModal = document.getElementById("memberModal");
    const btnAddMember = document.getElementById("btnAddMember");
    const btnClose = document.querySelector(".btn-close");
    const btnCancel = document.querySelector(".btn-cancel");

    btnAddMember.addEventListener("click", function () {
        memberModal.classList.add("show");
    });

    btnClose.addEventListener("click", function () {
        memberModal.classList.remove("show");
    });

    btnCancel.addEventListener("click", function () {
        memberModal.classList.remove("show");
    });

});

// Lấy id của  project
let idDetail = localStorage.getItem("key_detail");

// Hiển thị tên dự án và tên mô tả dự án
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

// Hiển thị danh sách task
function showList() {

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const currentProject = projects.find(p => p.id == idDetail);
    if (!currentProject) {
        console.error("Không tìm thấy dự án");
        return;
    }

    const filteredTasks = tasks.filter(task => task.projectId == idDetail);

    const taskListElement = document.querySelector(".taskList");
    taskListElement.innerHTML = "";

    const statusGroups = ["To do", "In progress", "Pending", "Done"];

    statusGroups.forEach(status => {
        taskListElement.innerHTML += `
            <tr>
                <td colspan="7">
                    <img src="../assets/1.png" alt=""> <span><b>${status}</b></span>
                </td>
            </tr>
        `;

        const groupTasks = filteredTasks.filter(task => task.status === status);

        groupTasks.forEach(task => {
            const member = currentProject.members.find(m => m.userId === task.assigneeId);
            const assigneeName = member && member.fullName ? member.fullName : "Không rõ";

            let priorityClass = "";
            if (task.priority === "Cao") priorityClass = "red";
            else if (task.priority === "Trung bình") priorityClass = "yellow";
            else priorityClass = "blue";

            let progressClass = "";
            if (task.progress === "Trễ hạn") progressClass = "red";
            else if (task.progress === "Có rủi ro") progressClass = "yellow";
            else if (task.progress === "Có rủi ro") progressClass = "yellow";
            else progressClass = "green";

            // Chuyển ngày về dạng MM-DD
            const formatDate = (dateStr) => {
                const d = new Date(dateStr);
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");
                return `${month}-${day}`;
            };

            taskListElement.innerHTML += `
                <tr>
                    <td>${task.taskName}</td>
                    <td class="center">${assigneeName}</td>
                    <td class="center"><button class="${priorityClass}">${task.priority}</button></td>
                    <td class="center">${formatDate(task.asignDate)}</td>
                    <td class="center">${formatDate(task.dueDate)}</td>
                    <td class="center"><button class="${progressClass}">${task.progress}</button></td>
                    <td class="center">
                        <button class="edit-btn" onclick="openEditModal(${task.id})">Sửa</button>
                        <button class="delete-task-btn" onclick="openDeleteModal(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    });
}

// Tim kiem nhiem vu
function searchTask() {
    const searchValue = document.getElementById("searchTask").value.toLowerCase().trim();

    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const currentProject = projects.find(p => p.id == idDetail);
   

    const projectTasks = tasks.filter(task =>
        task.projectId == idDetail &&
        task.taskName.toLowerCase().includes(searchValue)
    );

    const taskListElement = document.querySelector(".taskList");
    taskListElement.innerHTML = "";

    if (projectTasks.length === 0) {
        taskListElement.innerHTML = "<tr><td colspan='7' class='center'>Không tìm thấy nhiệm vụ nào.</td></tr>";
        return;
    }

    const statusGroups = ["To do", "In progress", "Pending", "Done"];

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${month}-${day}`;
    };

    statusGroups.forEach(status => {
        taskListElement.innerHTML += `
            <tr>
                <td colspan="7">
                    <img src="../assets/1.png" alt=""> <span><b>${status}</b></span>
                </td>
            </tr>
        `;

        const groupTasks = projectTasks.filter(task => task.status === status);

        groupTasks.forEach(task => {
            const member = currentProject.members.find(m => m.userId === task.assigneeId);
            const assigneeName = member && member.fullName ? member.fullName : "Không rõ";

            let priorityClass = "";
            if (task.priority === "Cao") priorityClass = "red";
            else if (task.priority === "Trung bình") priorityClass = "yellow";
            else priorityClass = "blue";

            let progressClass = "";
            if (task.progress === "Trễ hạn") progressClass = "red";
            else if (task.progress === "Có rủi ro") progressClass = "yellow";
            else progressClass = "green";

            taskListElement.innerHTML += `
                <tr>
                    <td>${task.taskName}</td>
                    <td class="center">${assigneeName}</td>
                    <td class="center"><button class="${priorityClass}">${task.priority}</button></td>
                    <td class="center">${formatDate(task.asignDate)}</td>
                    <td class="center">${formatDate(task.dueDate)}</td>
                    <td class="center"><button class="${progressClass}">${task.progress}</button></td>
                    <td class="center">
                        <button class="edit-btn" onclick="openEditModal(${task.id})">Sửa</button>
                        <button class="delete-task-btn" onclick="openDeleteModal(${task.id})">Xóa</button>
                    </td>
                </tr>
            `;
        });
    });
}



// Gọi hàm khi trang load
document.addEventListener("DOMContentLoaded", showList);
showList();

//  Chuyển sang trang nhiệm vụ cá nhân
document.getElementById("myTask").addEventListener("click", function () {
    window.location = "myTask.html"
})

//  Chuyển sang trang quản lí dự án
document.getElementById("project").addEventListener("click", function () {
    window.location = "manager-prj.html";
})