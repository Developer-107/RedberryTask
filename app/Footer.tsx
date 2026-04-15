import BootcampLogoandMediaBox from "./components/footer/BootcampLogoandMediaBox";
import ExploreAccountContactGrid from "./components/footer/ExploreAccountContactGrid";
import RightsTermsPolicyBox from "./components/footer/RightsTermsPolicyBox";

export default function Footer() {
  return (
    <footer className="px-44.25 pt-20 mt-25 border-t border-t-gray-200 text-gray-500">
      <div className="flex justify-between mb-18.5">
        <BootcampLogoandMediaBox />
        <ExploreAccountContactGrid />
      </div>
     
      <RightsTermsPolicyBox />
    </footer>
  );
}
