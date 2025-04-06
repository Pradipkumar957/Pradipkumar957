const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const roomType = document.getElementById('roomType').value;

    const booking = { name, email, phone, checkin, checkout, roomType };
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    document.getElementById('bookingMsg').textContent = 'Booking successful!';
    bookingForm.reset();
  });
}

// Load Bookings (Admin Panel)
const tableBody = document.querySelector('#bookingsTable tbody');
if (tableBody) {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.forEach((b, i) => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${b.name}</td><td>${b.email}</td><td>${b.phone}</td>
      <td>${b.checkin}</td><td>${b.checkout}</td><td>${b.roomType}</td>
      <td><button onclick="deleteBooking(${i})">Delete</button></td>`;
  });
}

function deleteBooking(index) {
  const bookings = JSON.parse(localStorage.getItem('bookings'));
  bookings.splice(index, 1);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  location.reload();
}

function exportToCSV() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  let csv = "Name,Email,Phone,Check-in,Check-out,Room Type\n";
  bookings.forEach(b => {
    csv += `${b.name},${b.email},${b.phone},${b.checkin},${b.checkout},${b.roomType}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'bookings.csv';
  link.click();
}

// Restaurant Menu Filtering
const menuItems = [
  { name: 'Pancakes', category: 'Breakfast' },
  { name: 'Burger', category: 'Lunch' },
  { name: 'Steak', category: 'Dinner' }
];

function filterMenu() {
  const cat = document.getElementById('categoryFilter').value;
  const list = document.getElementById('menuList');
  list.innerHTML = '';
  menuItems.filter(item => cat === 'All' || item.category === cat)
           .forEach(item => {
             const li = document.createElement('li');
             li.textContent = `${item.name} (${item.category})`;
             list.appendChild(li);
           });
}

// Login / Signup with LocalStorage
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (signupForm) {
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    localStorage.setItem(
      document.getElementById('signupUser').value,
      document.getElementById('signupPass').value
    );
    alert('Signup successful!');
    signupForm.reset();
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    if (localStorage.getItem(user) === pass) {
      alert('Login successful!');
      location.href = 'rooms.html';
    } else {
      alert('Invalid credentials!');
    }
  });
}