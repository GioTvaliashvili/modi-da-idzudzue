let isLogin = false;

const form = document.getElementById('auth-form');
const toggle = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const message = document.getElementById('message');

toggle.addEventListener('click', () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? 'შესვლა' : 'Რეგისტრაცია';
  submitBtn.textContent = isLogin ? 'შესვლა' : 'დარეგისტრირება';
  toggle.textContent = isLogin ? 'რეგისტრაცია' : 'შესვლა';
  message.textContent = '';
  message.className = '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  // მომხმარებელთა სია localStorage-იდან
  let users = JSON.parse(localStorage.getItem('users')) || [];

  if (isLogin) {
    // შესვლა
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      window.location.href = 'https://example.com'; // შეცვალე საჭირო ლინკზე
    } else {
      showMessage('მონაცემები არასწორია ან არ არსებობს.', 'error');
    }

  } else {
    // რეგისტრაცია
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      showMessage('ეს იმეილი უკვე რეგისტრირებულია.', 'error');
    } else {
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      window.location.href = 'https://giotvaliashvili.github.io/modi-da-idzudzue/'; // წარმატების შემდეგ გადაგიყვანს
    }
  }
});

function showMessage(text, type = 'error') {
  message.textContent = text;
  message.className = '';
  message.classList.add(type === 'success' ? 'success' : 'error');
}
