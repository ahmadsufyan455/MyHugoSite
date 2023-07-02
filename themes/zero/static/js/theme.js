const themeToggleButton = document.getElementById('theme-toggle-button');
const themeStyle = document.getElementById('theme-style');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  themeStyle.href = '/css/style-light.css';
  themeToggleButton.textContent = '🌚';
} else {
  themeStyle.href = '/css/style-dark.css';
  themeToggleButton.textContent = '🌝';
}

themeToggleButton.addEventListener('click', () => {
  if (themeStyle.href.includes('/css/style-light.css')) {
    themeStyle.href = '/css/style-dark.css';
    themeToggleButton.textContent = '🌝';
    localStorage.setItem('theme', 'dark');
  } else {
    themeStyle.href = '/css/style-light.css';
    themeToggleButton.textContent = '🌚';
    localStorage.setItem('theme', 'light');
  }
});
