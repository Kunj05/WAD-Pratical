document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern = /^[A-Z](?=.*[\W_]).{7,}$/;

    if (!emailPattern.test(email)) {
        alert("Invalid email format!");
        return;
    }
    if (!passwordPattern.test(password)) {
        alert("Password must start with an uppercase letter, contain at least one special character, and be 8 characters long.");
        return;
    }

    let user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});
