import BootcampLogoandMediaBox from "./components/footer/BootcampLogoandMediaBox";
import ExploreAccountContactGrid from "./components/footer/ExploreAccountContactGrid";
import RightsTermsPolicyBox from "./components/footer/RightsTermsPolicyBox";

export default function Footer() {
  return (
    <footer className="px-44.25 pt-20 border-t border-t-gray-200 text-gray-500">
      <div className="flex justify-between">
        <BootcampLogoandMediaBox />
        <ExploreAccountContactGrid />
      </div>
      <br />
      <br />
      <br />
      <RightsTermsPolicyBox />
    </footer>
  );
}
