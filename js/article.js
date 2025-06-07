// Format Date in Marathi
const publishDateElement = document.getElementById('publish-date');
const publishDate = new Date(2025, 5, 7); // Example date (June 7, 2025)
const formattedDate = new Intl.DateTimeFormat('mr-IN', { dateStyle: 'full' }).format(publishDate);
publishDateElement.textContent = formattedDate;
