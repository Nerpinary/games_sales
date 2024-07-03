document.addEventListener('DOMContentLoaded', () => {
    const PROXY_API_URL = 'http://localhost:3000/api/v1/discount?platformType=SWITCH&regionType=US&pageSize=16&pageNumber=';
    let currentPage = 1;
    const pageSize = 16;
    let totalPages = 1;

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

            const truncatedName = game.name.length > 40 ? game.name.slice(0, 40) + '...' : game.name;

            gameItem.innerHTML = `
                <div class="game__img-block">
                    <img src="${game.cover}" alt="${game.name}" class="game__img">
                    <div class="game__label">Скидка ${game.discountPercent}%</div>
                </div>
                <div class="game__description">
                    <h3 class="game__title" title="${game.name}">${truncatedName}</h3>
                    <div class="prices">
                        <p class="price__new">${game.price}</p>
                        <p class="price__old">${game.originalPrice}</p>
                    </div>
                </div>
            `;
            grid.appendChild(gameItem);
        });
    }

    function createPageButton(pageNumber, isActive = false) {
        const button = document.createElement('button');
        button.textContent = pageNumber;
        button.className = 'pagination__button';
        if (isActive) {
            button.classList.add('pagination__button_active');
        } else {
            button.addEventListener('click', () => changePage(pageNumber));
        }
        return button;
    }

    function createEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        ellipsis.className = 'pagination__ellipsis';
        return ellipsis;
    }

    function updatePagination() {
        const paginationTop = document.getElementById('pagination-top');
        const paginationBottom = document.getElementById('pagination-bottom');

        paginationTop.innerHTML = '';
        paginationBottom.innerHTML = '';

        const appendButton = (container, button) => container.appendChild(button);

        if (currentPage > 1) {
            const prevButtonTop = document.createElement('button');
            const prevButtonBottom = document.createElement('button');
            prevButtonTop.innerHTML = '&larr;';
            prevButtonBottom.innerHTML = '&larr;';
            prevButtonTop.className = 'pagination__button pagination__button_prev';
            prevButtonBottom.className = 'pagination__button pagination__button_prev';
            prevButtonTop.addEventListener('click', () => changePage(currentPage - 1));
            prevButtonBottom.addEventListener('click', () => changePage(currentPage - 1));
            appendButton(paginationTop, prevButtonTop);
            appendButton(paginationBottom, prevButtonBottom);
        }

        if (currentPage > 4) {
            appendButton(paginationTop, createPageButton(1));
            appendButton(paginationBottom, createPageButton(1));
            appendButton(paginationTop, createEllipsis());
            appendButton(paginationBottom, createEllipsis());
        }

        for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
            appendButton(paginationTop, createPageButton(i, i === currentPage));
            appendButton(paginationBottom, createPageButton(i, i === currentPage));
        }

        if (currentPage < totalPages - 3) {
            appendButton(paginationTop, createEllipsis());
            appendButton(paginationBottom, createEllipsis());
            appendButton(paginationTop, createPageButton(totalPages));
            appendButton(paginationBottom, createPageButton(totalPages));
        }

        if (currentPage < totalPages) {
            const nextButtonTop = document.createElement('button');
            const nextButtonBottom = document.createElement('button');
            nextButtonTop.innerHTML = '&rarr;';
            nextButtonBottom.innerHTML = '&rarr;';
            nextButtonTop.className = 'pagination__button pagination__button_next';
            nextButtonBottom.className = 'pagination__button pagination__button_next';
            nextButtonTop.addEventListener('click', () => changePage(currentPage + 1));
            nextButtonBottom.addEventListener('click', () => changePage(currentPage + 1));
            appendButton(paginationTop, nextButtonTop);
            appendButton(paginationBottom, nextButtonBottom);
        }
    }

    async function changePage(pageNumber) {
        currentPage = pageNumber;
        const data = await fetchGames(currentPage);
        totalPages = Math.ceil(data.count / pageSize);
        document.getElementById('total-games').textContent = `Всего игр по скидке сегодня: ${data.count}`;
        renderGames(data.results);
        updatePagination();
    }

    changePage(currentPage);
});