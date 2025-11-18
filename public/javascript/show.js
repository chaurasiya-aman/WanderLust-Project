document.addEventListener("DOMContentLoaded", () => {
  const cancelBtn = document.getElementById("cancel");
  const confirmBox = document.getElementById("confirmBox");
  const delBtn = document.getElementById("del");
  const verifyCode = document.getElementById("verify-code");
  const confirmBtn = document.getElementById("confirmBtn");
  const otp = window.otp; 

  if (!delBtn || !cancelBtn || !verifyCode || !confirmBtn || !confirmBox) return;

  delBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmBox.style.display = "flex";
    document.body.style.overflow = "hidden";
    confirmBtn.disabled = true;
    verifyCode.value = "";
    verifyCode.style.borderColor = "";
  });

  verifyCode.addEventListener("input", () => {
    if (verifyCode.value === otp) {
      verifyCode.style.borderColor = "green";
      confirmBtn.disabled = false;
    } else {
      verifyCode.style.borderColor = "red";
      confirmBtn.disabled = true;
    }
  });

  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmBox.style.display = "none";
    document.body.style.overflow = "auto";
    verifyCode.value = "";
    verifyCode.style.borderColor = "";
  });
});
