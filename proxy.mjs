import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Существующий маршрут для /api/v1/discount
app.get('/api/v1/discount', async (req, res) => {
    const { platformType, regionType, pageSize, pageNumber } = req.query;
    const apiUrl = `https://trendy-eng-shop.ru/api/v1/discount/?platformType=${platformType}&regionType=${regionType}&pageSize=${pageSize}&pageNumber=${pageNumber}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
                'Referer': 'https://trendy-eng-shop.ru/nintendo-discount',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching discount data:', error);
        res.status(500).json({ error: 'Error fetching data from API' });
    }
});

// Новый маршрут для Nintendo Switch Games
app.get('/api/v1/nintendo-games', async (req, res) => {
    const url = 'https://www.nintendo.com/us/store/games/nintendo-switch-games/';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'Connection': 'keep-alive',
            }
        });
        const html = await response.text();

        // Находим тег <script> с id="__NEXT_DATA__"
        const cheerio = await import('cheerio');
        const $ = cheerio.load(html);
        const scriptTag = $('#__NEXT_DATA__');
        const jsonData = JSON.parse(scriptTag.html());

        if (!jsonData || !jsonData.props || !jsonData.props.pageProps || !jsonData.props.pageProps.page || !jsonData.props.pageProps.page.content || !jsonData.props.pageProps.page.content.merchandisedGrid) {
            throw new Error('Invalid JSON structure');
        }

        // const games = jsonData.props.pageProps.page.content.merchandisedGrid.flat();

        const games = jsonData.props.pageProps.page.content.merchandisedGrid.flat().map((game) => {
            const variations = game.variations || [];
            return variations.map((variation) => ({
                name: variation.product.name,
                productImage: variation.product.productImage.publicId,
                price: variation.product.prices.minimum.finalPrice,
                releaseDate: variation.product.releaseDate,
                categories: game.categories,
                urlKey: variation.product.urlKey,
            }));
        }).flat();

        res.json(games);
        console.log(games);
    } catch (error) {
        console.error('Error fetching Nintendo games data:', error);
        res.status(500).json({ error: 'Error fetching data from Nintendo website' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
