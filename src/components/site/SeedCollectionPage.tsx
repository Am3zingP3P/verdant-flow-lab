import { MotionConfig } from "framer-motion";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { CookieConsent } from "@/components/site/CookieConsent";
import { SeedCollection } from "@/components/site/SeedCollection";

export function SeedCollectionPage() {
  return <MotionConfig reducedMotion="user"><div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <Navbar />
    <main className="pt-20"><SeedCollection standalone /></main>
    <Footer />
    <CookieConsent />
  </div></MotionConfig>;
}