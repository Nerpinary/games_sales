import HomeCardsGrid from "../components/HomeCardsGrid"

interface HomeCard {
  imgSrc: string,
  imgAlt: string,
  title: string,
  backgroundColor: string;
  path: string;
}

const HomeCards: HomeCard[] = [
  {
    imgSrc: "../../public/switch_sale.webp",
    imgAlt: "Игры Nintendo Switch по скидке",
    title: "Игры Nintendo Switch по скидке",
    backgroundColor: "#FF7E02",
    path: "/nintendo_sale"
  },
  {
    imgSrc: "../../public/switch_all.webp",
    imgAlt: "Все игры Nintendo Switch",
    title: "Все игры Nintendo Switch",
    backgroundColor: "#E30012",
    path: "/nintendo_all"
  },
]

const Home = () => {
  return (
    <main>
        <h1>Я буду покупать все игры!!!</h1>
        <HomeCardsGrid cards={HomeCards} />
    </main>
  );
};

export default Home;