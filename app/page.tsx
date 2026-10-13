import { Artists } from "@/components/Artists";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Nav } from "@/components/Nav";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Styles } from "@/components/Styles";
import { WhyUs } from "@/components/WhyUs";
import { Work } from "@/components/Work";
import { SHOW_ARTISTS, SHOW_REVIEWS } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WhyUs />
        <Styles />
        <Work />
        {SHOW_ARTISTS && <Artists />}
        {SHOW_REVIEWS && <Reviews />}
        <Process />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
