const catContainer = document.getElementById('cat-container');
const refreshBtn = document.getElementById('refresh-btn');
const loader = document.getElementById('loader');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10';

async function fetchCats() {

    loader.classList.remove('d-none');
    catContainer.innerHTML = '';

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        displayCats(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        catContainer.innerHTML = '<p class="text-center text-danger">Oops! There is something wrong. MEOW!.</p>';
    } finally {

        loader.classList.add('d-none');
    }
}

function displayCats(cats) {
    cats.forEach(cat => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3'; 

        col.innerHTML = `
            <div class="card h-100">
                <img src="${cat.url}" class="card-img-top cat-card-img" alt="Cat Image">
                <div class="card-body text-center">
                    <p class="card-text text-muted small">ID: ${cat.id}</p>
                    <a href="${cat.url}" target="_blank" class="btn btn-sm btn-primary">View Full Image</a>
                </div>
            </div>
        `;
        catContainer.appendChild(col);
    });
}

refreshBtn.addEventListener('click', fetchCats);

fetchCats();