document.addEventListener("DOMContentLoaded", function () {
    let account = JSON.parse(localStorage.getItem("account")) || [];
    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let error = document.getElementById("passwordError");

    email.addEventListener("input", function () {
        error.textContent = "";
    });

    password.addEventListener("input", function () {
        error.textContent = "";
    });

    form.addEventListener("submit", function checkAcc(e) {
        let isValid = false;
        e.preventDefault();

        error.textContent = ""; // Xóa lỗi cũ trước khi kiểm tra

        let acc = {
            email: email.value.trim(),
            password: password.value.trim()
        };

        for (let i = 0; i < account.length; i++) {
            if (account[i].email === acc.email && account[i].password === acc.password) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            window.location = "manager-prj.html";
        } else {
            error.textContent = "Lỗi không đúng email hoặc password";
            email.value = "";
            password.value = "";
        }
    });
});

