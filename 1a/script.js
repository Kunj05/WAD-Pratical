// SIGNUP FUNCTION
document.getElementById("signupForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Password validation
    let passwordRegex = /^[A-Z][A-Za-z0-9@#$%^&*!]{7,}$/;
    if (!passwordRegex.test(password)) {
        alert("Invalid Password! Password must be at least 8 characters, start with a capital letter, and contain at least one special character.");
        return;
    }

    // Store user in localStorage
    let user = { email: email, password: password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});

// LOGIN FUNCTION
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let loginEmail = document.getElementById("loginEmail").value;
    let loginPassword = document.getElementById("loginPassword").value;

    // Retrieve stored user data
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("No user found! Please signup first.");
        return;
    }

    if (loginEmail === storedUser.email && loginPassword === storedUser.password) {
        alert("Login successful! Redirecting to registration...");
        window.location.href = "registration.html";
    } else {
        alert("Invalid email or password! Try again.");
    }
});

// REGISTRATION FUNCTION
document.getElementById("registrationForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let gender = document.getElementById("gender").value;
    let country = document.getElementById("country").value;
    let state = document.getElementById("state").value;
    let hobbies = document.getElementById("hobbies").value;

    // Store registration details in localStorage
    let registrationData = {
        name: name,
        phone: phone,
        gender: gender,
        country: country,
        state: state,
        hobbies: hobbies
    };

    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    alert("Registration successful! Your data has been saved.");
});
