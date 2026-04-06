import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {/* Navbar height padding top */}
      <div className="pt-27 px-44.25">{children}</div>
      <Footer />
    </div>
  );
}
