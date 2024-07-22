import {HeroSection} from "./components/HeroSection";
import  {BackgroundGradientDemo}  from "./components/About";
import {InfiniteMovingCardsDemo} from "./components/success";
import Instructors from "./components/Instructors";
import {Navbar} from "./components/Navbar"
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div>
        <Navbar/>
    <HeroSection/>
     <InfiniteMovingCardsDemo/>
     <Instructors/>
     <Footer/>

     
    </div>
  );
}
