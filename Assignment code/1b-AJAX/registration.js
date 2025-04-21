document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let country = document.getElementById('country').value;
    let state = document.getElementById('state').value;
    let city = document.getElementById('city').value;
    
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let hobbies = [...document.querySelectorAll('input[name="hobby"]:checked')].map(hobby => hobby.value);

    let registrationData = { name, age, country, state, city, gender, hobbies };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function() {
        if (xhr.status === 201) {
            alert("Registration successful!");
            localStorage.setItem('registrationData', JSON.stringify(registrationData));
            console.log("Response:", xhr.responseText);
        } else {
            alert("Failed to register. Try again!");
        }
    };

    xhr.send(JSON.stringify(registrationData));
});
