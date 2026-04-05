
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {


  return (
    <>
      <Navbar />
      {children}
      <Footer />
                
    </>
  );
}