// Theme Toggle
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌙 / ☀️';
document.body.prepend(themeToggle);

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Breaking News Auto-scroll
const marquee = document.querySelector('.breaking-news marquee');
function updateBreakingNews() {
    const newsItems = [
        '🔴 नवीन आर्थिक धोरण जाहीर...',
        '🌟 लोकप्रिय अभिनेता नवीन चित्रपटासाठी तयारी करत आहे...',
        '⚽ भारतीय संघाची शानदार कामगिरी!',
    ];
    marquee.textContent = newsItems[Math.floor(Math.random() * newsItems.length)];
}
setInterval(updateBreakingNews, 5000);
 
