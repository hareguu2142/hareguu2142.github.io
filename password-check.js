function checkPassword() {
    const inputPassword = document.getElementById("password").value;
    const correctPassword = "tjdwndurh"; // 패스워드d

    if (inputPassword === correctPassword) {
        document.getElementById("content").style.display = "block";
        document.getElementById("password-input").style.display = "none";
    } else {
        alert("잘못된 패스워드입니다!");
    }
}
