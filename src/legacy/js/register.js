// TODO better password strength evaluation, better error handling, better password storage, better structure of the code
// FORM SUBMIT HANDLER
const registerForm = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("register-password");
const passwordConfirmInput = document.getElementById("confirm-register-password");
const passwordStrengthOutput = document.getElementById("password-strength");

if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
}

if (passwordInput) {
    passwordInput.addEventListener("input", updatePasswordStrength);
}

// Handle form submission
function handleRegister(event) {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (password !== passwordConfirm) {
        alert("❌ Passwords do not match!");
        return;
    }

    // Save to localStorage (not secure – demo only)
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("loggedIn", "true");

    // Redirect to travel list
    window.location.href = "TravelListPage.jsx";
}

// Update password strength feedback
function updatePasswordStrength() {
    const password = passwordInput.value;
    const strength = evaluatePasswordStrength(password);

    passwordStrengthOutput.innerHTML = strength;
    passwordStrengthOutput.style.color = getStrengthColor(strength);
}

// Calculate password strength
function evaluatePasswordStrength(password) {
    let score = 0;
    if (/\d/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\W/.test(password)) score++;
    if (password.length >= 8) score++;

    if (score <= 2) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
}

// Style the strength indicator
function getStrengthColor(strength) {
    if (strength === "Weak") return "red";
    if (strength === "Medium") return "orange";
    return "green";
}
