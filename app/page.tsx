import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Reveals from "@/components/Reveals";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Capabilities from "@/components/Capabilities";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Supplier from "@/components/Supplier";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Intro />
        <Capabilities />
        <Portfolio />
        <Services />
        <Supplier />
        <Newsletter />
      </main>
      <Footer />
      <Reveals />
    </SmoothScroll>
  );
}
