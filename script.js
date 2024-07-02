document.addEventListener('DOMContentLoaded', () => {
    const PROXY_API_URL = 'http://localhost:3000/api/v1/discount?platformType=SWITCH&regionType=US&pageSize=16&pageNumber=';
    let currentPage = 1;
    const pageSize = 16;

    async function fetchGames(pageNumber) {
        try {
            const response = await fetch(`${PROXY_API_URL}${pageNumber}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    }

    function renderGames(games) {
        const grid = document.getElementById('games-grid');
        grid.innerHTML = '';

        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.className = 'game__block';
            gameItem.innerHTML = `
                <div class="game__img-block">
                    <img src="${game.cover}" alt="${game.name}" class="game__img">
                    <div class="game__label">Скидка ${game.discountPercent}%</div>
                </div>
                <div class="game__description">
                    <h3>${game.name}</h3>
                    <p class="price__new">${game.price}</p>
                    <p class="price__old">${game.originalPrice}</p>
                </div>
            `;
            grid.appendChild(gameItem);
        });
    }

    function updatePagination() {
        const paginationTop = document.getElementById('pagination-top');
        const paginationBottom = document.getElementById('pagination-bottom');

        paginationTop.innerHTML = '';
        paginationBottom.innerHTML = '';

        if (currentPage > 1) {
            const prevButtonTop = document.createElement('button');
            const prevButtonBottom = document.createElement('button');
            prevButtonTop.textContent = 'Предыдущая';
            prevButtonBottom.textContent = 'Предыдущая';
            prevButtonTop.addEventListener('click', () => changePage(currentPage - 1));
            prevButtonBottom.addEventListener('click', () => changePage(currentPage - 1));
            paginationTop.appendChild(prevButtonTop);
            paginationBottom.appendChild(prevButtonBottom);
        }

        const nextButtonTop = document.createElement('button');
        const nextButtonBottom = document.createElement('button');
        nextButtonTop.textContent = 'Следующая';
        nextButtonBottom.textContent = 'Следующая';
        nextButtonTop.addEventListener('click', () => changePage(currentPage + 1));
        nextButtonBottom.addEventListener('click', () => changePage(currentPage + 1));
        paginationTop.appendChild(nextButtonTop);
        paginationBottom.appendChild(nextButtonBottom);
    }

    async function changePage(pageNumber) {
        currentPage = pageNumber;
        const data = await fetchGames(currentPage);
        renderGames(data.results); // Assuming the data format has a "results" array
        updatePagination();
    }

    changePage(currentPage);
});