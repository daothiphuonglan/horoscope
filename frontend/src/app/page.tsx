import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Header from "./components/Header/Header";
import ServicesSection from "./ServicesSection/ServicesSection";
import { InputData } from "./InputData/InputData";


export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <InputData/>
      <ServicesSection />
      <Footer />
    </>
  );
}
