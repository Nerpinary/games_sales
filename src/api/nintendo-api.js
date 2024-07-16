import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.nintendo.com/us/store/games/nintendo-switch-games/';

async function fetchData() {
  try {
    // Отправляем запрос на указанный URL
    const response = await axios.get(url);
    const html = response.data;

    // Загружаем HTML в cheerio
    const $ = cheerio.load(html);

    // Находим тег <script> с id="__NEXT_DATA__"
    const scriptTag = $('#__NEXT_DATA__');

    // Извлекаем содержимое тега и парсим его как JSON
    const jsonData = JSON.parse(scriptTag.html());

    // Извлекаем игры из jsonData
    const games = jsonData.props.pageProps.page.content.merchandisedGrid.flat();

    // Выводим данные об играх
    console.log(games);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
