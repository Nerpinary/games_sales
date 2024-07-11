import HomeCardsGrid from "../components/HomeCardsGrid"

interface HomeCard {
  imgSrc: string,
  imgAlt: string,
  title: string,
  backgroundColor: string;
}

const HomeCards: HomeCard[] = [
  {
    imgSrc: "../../public/switch_sale.webp",
    imgAlt: "Игры Nintendo Switch по скидке",
    title: "Игры Nintendo Switch по скидке",
    backgroundColor: "#FF7E02"
  },
  {
    imgSrc: "../../public/switch_all.webp",
    imgAlt: "Все игры Nintendo Switch",
    title: "Все игры Nintendo Switch",
    backgroundColor: "#E30012",
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