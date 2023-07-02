const themeToggleButton = document.getElementById('theme-toggle-button');
const themeStyle = document.getElementById('theme-style');

const savedTheme = localStorage.getItem('theme');
const lightTheme = {
  href: '/css/style-light.css',
  textContent: '🌚',
};
const darkTheme = {
  href: '/css/style-dark.css',
  textContent: '🌝',
};

function setTheme(theme) {
  themeStyle.href = theme.href;
  themeToggleButton.textContent = theme.textContent;
  localStorage.setItem('theme', theme.href.includes('light') ? 'light' : 'dark');
}

if (savedTheme === 'light') {
  setTheme(lightTheme);
} else {
  setTheme(darkTheme);
}

themeToggleButton.addEventListener('click', () => {
  if (themeStyle.href.includes('light')) {
    setTheme(darkTheme);
  } else {
    setTheme(lightTheme);
  }
});
