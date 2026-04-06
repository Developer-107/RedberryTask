import Carousel from "./components/homePage/Carousel";
import StartLearningToday from "./components/homePage/StartLearningToday";


export default async function Home() {

  return (
    <div className="">
     <Carousel />
     <StartLearningToday />
    </div>
    
  );
}
