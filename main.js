const content = document.querySelector(".profile-info");
const btn = document.getElementById("fetch-btn");
const input = document.getElementById("username");
const loadingOverlay = document.getElementById("loading-overlay");
const changeMode = document.querySelector('.changeMode');
const body = document.body;

btn.addEventListener("click", async () => {
    const username = input.value;
    showLoading();
    await show_repos(username);
    hideLoading();
});

changeMode.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

async function getData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            alert(`HTTP error! status: ${response.status}`);
            return;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert('There was a problem with the fetch operation:', error);
    }
}

async function show_repos(username) {
    const x = await getData(username);
    content.innerHTML = '';
    if (x) {
        x.forEach(repo => {
            const div = document.createElement('div');
            div.classList.add('item-repo');
            let description = repo.description;
            if (description === null) description = "No description provided.";
            div.innerHTML = `
                <div class="repo-header">
                    <svg class="repo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    <span class="repo-title">Repository</span>
                </div>
                <h2 class="repo-name">${repo.name}</h2>
                <div class="repo-info">
                    <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>${repo.owner.login}</span>
                </div>
                <div class="repo-info">
                    <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                    <span class="language">${repo.language || 'Not specified'}</span>
                </div>
                <p class="description">${description}</p>`;
            content.appendChild(div);
        });
    }
}
