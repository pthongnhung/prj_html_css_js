document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const errors = {
        fullName: document.getElementById("fullNameError"),
        email: document.getElementById("emailError"),
        password: document.getElementById("passwordError"),
        confirmPassword: document.getElementById("confirmPasswordError"),
    };
    // Xử lý validate form
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let isValid = true;
        let account = JSON.parse(localStorage.getItem("account")) || []
        // Xóa thông báo lỗi cũ
        Object.values(errors).forEach(error => error.textContent = "");

        // Validate Họ và tên
        if (!fullName.value.trim()) {
            errors.fullName.textContent = "Họ và tên không được để trống";
            isValid = false;
        }

        // Validate Email
       
        if (!email.value.trim()) {
            console.log("Mật khẩu nhập vào:", password.value); 
            errors.email.textContent = "Email không được để trống";
            isValid = false;
        } else if (
            email.value.indexOf("@") === -1 || // Kiểm tra có "@" không
            email.value.indexOf(".") === -1 || // Kiểm tra có "." không
            email.value.indexOf("@") > email.value.lastIndexOf(".") || // "." phải đứng sau "@"
            email.value.startsWith("@") || // Không được bắt đầu bằng "@"
            email.value.endsWith(".") || // Không được kết thúc bằng "."
            email.value.includes(" ") // Không được có khoảng trắng
        ) {
            errors.email.textContent = "Email không hợp lệ";
            isValid = false;
        }

        // Validate Mật khẩu
        if (!password.value.trim()) {
            errors.password.textContent = "Mật khẩu không được để trống";
            isValid = false;
        } else if (password.value.length < 8) {
            errors.password.textContent = "Mật khẩu phải có ít nhất 8 ký tự";
            isValid = false;
        }

        // Validate Xác nhận mật khẩu
        if (!confirmPassword.value.trim()) {
            errors.confirmPassword.textContent = "Vui lòng nhập lại mật khẩu";
            isValid = false;
        } else if (confirmPassword.value !== password.value) {
            errors.confirmPassword.textContent = "Mật khẩu không khớp";
            isValid = false;
        }

        // Nếu hợp lệ, hiển thị thông báo
        if (isValid) {
            let newCourse = {
                email: email.value.trim(),
                password: password.value.trim()
            }
            account.push(newCourse);
            localStorage.setItem("account", JSON.stringify(account));
            alert("Đăng ký thành công!");
            form.reset();
            window.location = "manager-prj.html";
        }
    });
});


