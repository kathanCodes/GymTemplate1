import Hero from './components/Hero';
import Senses from './components/Senses';
import ClubCollage from './components/ClubCollage';
import FloatingPlate from './components/FloatingPlate';
import Ethos from './components/Ethos';
import Facilities from './components/Facilities';
import Classes from './components/Classes';
import Memberships from './components/Memberships';
import Clubs from './components/Clubs';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#DFFF00] selection:text-black relative">
      <Preloader />
      {/* Absolute/Fixed Parallax Element spanning across scroll */}
      <FloatingPlate />
      
      {/* Sections Flow */}
      <Hero />
      <Senses />
      <ClubCollage />
      
      {/* Remaining Layout */}
      <Ethos />
      <Facilities />
      <Classes />
      <Memberships />
      <Clubs />
      <Footer />
    </div>
  );
}

export default App;
