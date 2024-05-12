async function checkPassword() {
    const inputPassword = document.getElementById("password").value;
    const encryptedPassword = "2c287c80f496e8f9f7e6e7e7e7e8e9f1"; // 암호화된 패스워드

    if (await sha256(inputPassword) === encryptedPassword) {
        document.getElementById("content").style.display = "block";
        document.getElementById("password-input").style.display = "none";
    } else {
        alert("잘못된 패스워드입니다!");
    }
}

// SHA-256 해시 함수를 사용하여 입력을 암호화하는 함수
async function sha256(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return bufferToHex(hashBuffer);
}

function bufferToHex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const paddedValue = stringValue.padStart(8, "0");
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}
