const inputFirstName = document.querySelector("#first-name");
const checkImageFirstName = document.querySelector("#first-name+.check>img");
const spanFirstName = document.querySelector(".first-name-error");

const inputLastName = document.querySelector("#last-name");
const checkImageLastName = document.querySelector("#last-name+.check>img");
const spanLastName = document.querySelector(".last-name-error");

const inputEmail = document.querySelector("#email");
const checkImageEmail = document.querySelector("#email+.check>img");
const spanEmail = document.querySelector(".email-error");

const inputPhone = document.querySelector("#phone");
const checkImagePhone = document.querySelector("#phone+.check>img");
const spanPhone = document.querySelector(".phone-error");

const inputPassword = document.querySelector("#password");
const checkImagePassword = document.querySelector("#password+.check>img");
const spanPasswordUppercase = document.querySelector(".char-uppercase");
const spanPasswordLowercase = document.querySelector(".char-lowercase");
const spanPasswordNumber = document.querySelector(".char-number");
const spanPasswordSymbol = document.querySelector(".char-symbol");
const spanPasswordMinimum = document.querySelector(".char-minimum");
const spansPassword = document.querySelectorAll(".password-error");

const inputConfirmPassword = document.querySelector("#confirm-password");
const checkImageConfirmPassword = document.querySelector("#confirm-password+.check>img");
const spanConfirmPassword = document.querySelector(".confirm-password-error");

const submitButton = document.getElementById("submit-button");

inputFirstName.addEventListener("input", () => {
    if (inputFirstName.value.length === 0 ) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "");
        inputFirstName.style.removeProperty("border-color");
    } else if (inputFirstName.value.length < 3 || inputFirstName.value.length > 30) {
        spanFirstName.textContent = "FIRST NAME MUST BE 3-30 CHARACTERS";
        checkImageFirstName.setAttribute("src", "./image/red_x.png");
        inputFirstName.style.setProperty("border-color", "var( --red-color)");
    } else if (inputFirstName.value.length >= 3 || inputFirstName.value.length <= 30) {
        spanFirstName.textContent = "";
        checkImageFirstName.setAttribute("src", "./image/green_check.png");
        inputFirstName.style.removeProperty("border-color");
}})

inputLastName.addEventListener("input", () => {
    if (inputLastName.value.length === 0 ) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "");
        inputLastName.style.removeProperty("border-color");
    } else if (inputLastName.value.length < 3 || inputLastName.value.length > 30) {
        spanLastName.textContent = "LAST NAME MUST BE 3-30 CHARACTERS";
        checkImageLastName.setAttribute("src", "./image/red_x.png");
        inputLastName.style.setProperty("border-color", "var( --red-color)");
    } else if (inputLastName.value.length >= 3 || inputLastName.value.length <= 30) {
        spanLastName.textContent = "";
        checkImageLastName.setAttribute("src", "./image/green_check.png");
        inputLastName.style.removeProperty("border-color");
    }
})

inputEmail.addEventListener("input", () => {
    if (inputEmail.value.length === 0 ) {
        spanEmail.textContent = "EMAIL IS A REQUIRED FIELD";
        checkImageEmail.setAttribute("src", "./image/red_x.png");
        inputEmail.style.setProperty("border-color", "var( --red-color)");
    } else if (inputEmail.value.length > 0 && inputEmail.validity.valid !== true) {
        spanEmail.textContent = "PLEASE ENTER A VALID EMAIL";
        checkImageEmail.setAttribute("src", "./image/red_x.png");
        inputEmail.style.setProperty("border-color", "var( --red-color)");
    } else if (inputEmail.value.length > 0 && inputEmail.validity.valid === true) {
        spanEmail.textContent = "";
        checkImageEmail.setAttribute("src", "./image/green_check.png");
        inputEmail.style.removeProperty("border-color");
    }
})

document.addEventListener('DOMContentLoaded', () => {
    
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder");
        const slots = new Set(el.dataset.slots || "_");
        let prev = Array.from(pattern);
        for (let i = 0; i < prev.length; i++) {
            if (slots.has(prev[i])) {
                prev[i] = i + 1;
            } else if (i === 0) {
                prev[i] = 0;
            } else if (prev[i-1] > 0) {
                prev[i] = prev[i-1];
            } else {
                prev[i] = 0;
            }
        }

        const first = [...pattern].findIndex(c => slots.has(c));
        const accept = new RegExp(el.dataset.accept || "\\d", "g");

        function clean(input) {
            input = input.match(accept) || [];
            return Array.from(pattern, c => {
                if (input[0] === c || slots.has(c)) {
                    return input.shift() || c
                } else {
                    return c
                }
            })
        };

        function format() {
            const [i, j] = [el.selectionStart, el.selectionEnd].map(k => {
                k = clean(el.value.slice(0, k)).findIndex(c => slots.has(c));
                if (k < 0) {
                    return prev[prev.length-1]
                } else if (back) {
                    return prev[k-1] || first
                } else {
                    return k
                }
            });

            el.value = clean(el.value).join("");
            el.setSelectionRange(i, j);
            back = false;
        };

        let back = false;
        el.addEventListener("keydown", (e) => {
            back = e.key === "Backspace";
        });

        el.addEventListener("input", format);
        el.addEventListener("focus", format);

        el.addEventListener("blur", () => {
            if (el.value === pattern) {
                el.value = "";
        }});
    }

    inputPhone.addEventListener("input", () => {
    if (inputPhone.value === inputPhone.placeholder) {
            spanPhone.textContent = "";
            checkImagePhone.setAttribute("src", "");
            inputPhone.style.removeProperty("border-color");
        } else if (inputPhone.validity.patternMismatch) {
            spanPhone.textContent = "PLEASE ENTER A 10 DIGIT PHONE NUMBER";
            checkImagePhone.setAttribute("src", "./image/red_x.png");
            inputPhone.style.setProperty("border-color", "var( --red-color)");
        } else if (!inputPhone.validity.patternMismatch) {
            spanPhone.textContent = "";
            checkImagePhone.setAttribute("src", "./image/green_check.png");
            inputPhone.style.removeProperty("border-color");
        }
    })
});

inputPassword.addEventListener("input", () => {
    if (inputPassword.value === "") {
        checkImagePassword.setAttribute("src", "");
        inputPassword.style.removeProperty("border-color");
        for (let element of spansPassword) {
            element.textContent = "";
        }
    } else if (!inputPassword.validity.patternMismatch) {
        checkImagePassword.setAttribute("src", "./image/green_check.png");
        inputPassword.style.removeProperty("border-color");
        for (let element of spansPassword) {
            element.style.setProperty("color", "var(--green-color)");
        }
    } else if (inputPassword.validity.patternMismatch) {
        checkImagePassword.setAttribute("src", "./image/red_x.png");
        inputPassword.style.setProperty("border-color", "var( --red-color)");
        spanPasswordUppercase.textContent = "PASSWORD MUST HAVE 1 UPPERCASE CHAR";
        spanPasswordLowercase.textContent = "PASSWORD MUST HAVE 1 LOWERCASE CHAR";
        spanPasswordNumber.textContent = "PASSWORD MUST HAVE 1 NUMBER CHAR";
        spanPasswordSymbol.textContent = "PASSWORD MUST HAVE 1 SPECIAL CHAR";
        spanPasswordMinimum.textContent = "PASSWORD MUST BE MINIMUM 8 CHARS";
        for (let element of spansPassword) {
            element.style.removeProperty("color");
        }
        if (inputPassword.value.match(/[A-Z]/g) !== null) {
            spanPasswordUppercase.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[a-z]/g) !== null) {
            spanPasswordLowercase.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[0-9]/g) !== null) {
            spanPasswordNumber.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.match(/[!#\$%&'\(\)\*\+,\-\.\/:;=>\?@\[\\\]\^_`\{\|\}~]/g) !== null) {
            spanPasswordSymbol.style.setProperty("color", "var(--green-color)");
        }
        if (inputPassword.value.length >= 8) {
            spanPasswordMinimum.style.setProperty("color", "var(--green-color)");
        }
    }
    confirmPassword()
})


function confirmPassword() {
    if (inputConfirmPassword.value === "") {
            spanConfirmPassword.textContent = "";
            spanConfirmPassword.style.removeProperty("color");
            checkImageConfirmPassword.setAttribute("src", "");
            inputConfirmPassword.style.removeProperty("border-color");
        } else if (inputConfirmPassword.value !== inputPassword.value) {
            spanConfirmPassword.textContent = "PASSWORDS MUST MATCH";
            spanConfirmPassword.style.removeProperty("color");
            checkImageConfirmPassword.setAttribute("src", "./image/red_x.png");
            inputConfirmPassword.style.setProperty("border-color", "var( --red-color)");
        } else if (inputConfirmPassword.value === inputPassword.value) {
            spanConfirmPassword.textContent = "PASSWORDS MUST MATCH";
            spanConfirmPassword.style.setProperty("color", "var(--green-color)");
            checkImageConfirmPassword.setAttribute("src", "./image/green_check.png");
            inputConfirmPassword.style.removeProperty("border-color");
        }
    }

inputConfirmPassword.addEventListener("input", () => {
    confirmPassword()
})

submitButton.addEventListener("click", () => {
})