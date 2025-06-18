// components/HomePage.jsx
import { motion } from "framer-motion";
import { Rocket, BookOpen, Users } from "lucide-react";
import Card from "@/components/shared/Card";
import Image from "next/image";
import Imazhi from "@/assets/images/Imazhi.png";


export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-purple-100 py-16 text-center">
        <div className="mt-8">
          {/* Hero image vendoset me img ose background */}
        <div className="w-full">
  <Image
    src={Imazhi}
    alt="Imazh Rreth Nesh"
    width={0}
    height={0}
    sizes="50vw"
    className="w-full h-[450px] object-cover rounded-xl shadow-md mx-auto"
  />
</div>

        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="w-full py-20 bg-white text-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="container m-auto px-6">
          <h2 className="text-4xl font-bold mb-10 text-red-700">Pse të na zgjidhni ne?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Librat më të kërkuar"
              description="Shfleto një koleksion të pasur librash që ofrohen për çdo kategori."
              icon={BookOpen}
            />
            <Card
              title="Platformë e Shpejtë"
              description="Përdorim i thjeshtë dhe performancë e lartë për të gjithë përdoruesit."
              icon={Rocket}
            />
            <Card
              title="Komunitet i Besueshëm"
              description="Përdorues të vërtetë me komente dhe vlerësime reale për çdo libër."
              icon={Users}
            />
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-4xl font-bold mb-10 text-white-700">Çka thonë përdoruesit tanë</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4">
          <div className="bg-white p-6 rounded shadow">
            <p className="italic">"Platforma më e mirë për të gjetur libra në shqip. Shumë e lehtë për përdorim!"</p>
            <span className="mt-4 block font-semibold text-red-700">– Arlind M.</span>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <p className="italic">"Kjo faqe ishte e nevojshme, pasi porositë përmes Instagramit ishin shumë më të vështira."</p>
            <span className="mt-4 block font-semibold text-red-700">– Elira B.</span>
          </div>
        </div>
      </section>
    

    {/*Contact section */}
        <motion.section
        className="w-full py-18 bg-neutral-800 text-white text-center px-4"
        initial={{ opacity: 0 }}
        animate= {{ opacity: 1}}
        transition= {{ duration: 1}}
        >
          <h2 className="text-4xl font-bold mb-6">Kontaktoni me ne</h2>
          <p className="mb-1">Email: Librariabuzuku@gmail.com</p>
          <p className="mb-1">Number: +333 33 333 333</p>
          <p className="mb-6">Adressa : Prishtine, Kosove</p>
          <br />
         
        </motion.section>
      </div>
  );
}
