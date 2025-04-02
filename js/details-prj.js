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
