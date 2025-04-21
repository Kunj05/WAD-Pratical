// Utility to get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  // Utility to save users
  function saveUser(user) {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Registration logic
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const password = document.getElementById('password').value;
      const dob = document.getElementById('dob').value;
      const city = document.getElementById('city').value.trim();
      const address = document.getElementById('address').value.trim();
  
      // Basic validation
      if (!name || !email || !mobile || !password || !dob || !city || !address) {
        alert('All fields are required!');
        return;
      }
  
      // AJAX POST simulation
      fetch('/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, mobile, password, dob, city, address }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {}); // Simulate AJAX
  
      saveUser({ name, email, mobile, dob, city, address, password });
      alert('Registered successfully!');
      registerForm.reset();
      window.location.href = 'index.html';
    });
  }
  
  // Login logic
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('loginPassword').value;
  
      const users = getUsers();
      const user = users.find(
        u => (u.email === username || u.mobile === username) && u.password === password
      );
  
      if (user) {
        alert('Login successful!');
        window.location.href = 'users.html';
      } else {
        alert('Invalid credentials!');
      }
    });
  }
  
  // Display user list
  const userTableBody = document.getElementById('userTableBody');
  if (userTableBody) {
    const users = getUsers();
    users.forEach(u => {
      const row = `<tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.mobile}</td>
        <td>${u.dob}</td>
        <td>${u.city}</td>
        <td>${u.address}</td>
      </tr>`;
      userTableBody.innerHTML += row;
    });
  }
  