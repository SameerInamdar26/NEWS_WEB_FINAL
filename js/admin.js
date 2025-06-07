// Simulated login system
const loginBtn = document.getElementById("login-btn");
const loginSection = document.querySelector(".login-section");
const newsManagement = document.querySelector(".news-management");

loginBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        loginSection.classList.add("hidden");
        newsManagement.classList.remove("hidden");
    } else {
        alert("अवैध प्रवेश! कृपया योग्य माहिती द्या.");
    }
});

// News management functionality
const newsForm = document.getElementById("news-form");
const newsList = document.getElementById("news-list");

newsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const title = document.getElementById("news-title").value;
    const content = document.getElementById("news-content").value;
    const category = document.getElementById("news-category").value;
    const imageFile = document.getElementById("news-image").files[0];
    
    if (!title || !content) {
        alert("कृपया पूर्ण माहिती भरा!");
        return;
    }

    const newsItem = document.createElement("li");
    newsItem.innerHTML = `<strong>${title}</strong> (${category}) - <button onclick="deleteNews(this)">हटवा</button>`;
    newsList.appendChild(newsItem);
    
    newsForm.reset();
});

// Delete news function
function deleteNews(element) {
    element.parentElement.remove();
}
