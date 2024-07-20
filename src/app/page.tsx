import {HeroSection} from "./components/HeroSection";
import  {BackgroundGradientDemo}  from "./components/About";
import {InfiniteMovingCardsDemo} from "./components/success";
import Instructors from "./components/Instructors";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div>
    
      <HeroSection/>
     < BackgroundGradientDemo/>
     <InfiniteMovingCardsDemo/>
     <Instructors/>
     <Footer/>
    
     
    </div>
  );
}
