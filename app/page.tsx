import Carousel from "./components/frontPage/Carousel";
import MostPopularBoxes from "./components/frontPage/MostPopularBoxes";
import LearnFromTheBest from "./components/frontPage/LearnFromTheBest";
import NewOnKursebiGe from "./components/frontPage/NewOnKursebiGe";
import ExploreCareers from "./components/frontPage/ExploreCareers";
import WhatDoWeOffer from "./components/frontPage/WhatDoWeOffer";
import ExploreCategory from "./components/frontPage/ExploreCategory";
import MostPopularByCategory from "./components/frontPage/MostPopularByCategory";
import EncourageTextBox from "./components/frontPage/EncourageTextBox";
import WhyPeopleChooseUs from "./components/frontPage/WhyPeopleChooseUs";
import BannerComponent from "./components/BannerComponent";


export default async function Home() {

  return (
    <div className="mt-25">
      <div className="flex flex-col xl:px-23 lg:px-16 px-8 gap-10">

        <Carousel />
        <LearnFromTheBest />
        <MostPopularBoxes />
        <div className=" w-full h-[20vh] rounded-lg!">
        <BannerComponent position="homepage" />
        </div>
        <ExploreCategory />
        <NewOnKursebiGe />
        <ExploreCareers />
        <WhatDoWeOffer />
        <MostPopularByCategory />
        <EncourageTextBox />
        <WhyPeopleChooseUs />

      </div> 
    </div>
    
  );
}
