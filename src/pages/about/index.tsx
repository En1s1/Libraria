import { motion } from "framer-motion";
import Image from "next/image";
import CostomImage from "@/assets/images/Imazhi.png"
import { div } from "framer-motion/dist/types/client";

export default function About() {
    return (
          	<div className="pt-14 bg-gray-50 min-h-screen flex flex-col items-center">
     
            {/* Our Mission Section */}
<motion.section
  className="w-full py-24 bg-blue-700 text-white text-center shadow-lg"
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1 }}
>
  
  <h2 className="text-4xl font-bold mb-6 text-white-600">
    Misioni Ynë
  </h2>
  <p className="text-black text-lg max-w-4xl mx-auto leading-relaxed">
  Misioni ynë është të promovojmë kulturën dhe dijen përmes ofrimit të librave
  cilësorë, duke e bërë leximin më të qasshëm për të gjithë. Me zgjerimin në shitjen online,
  synojmë t’u ofrojmë lexuesve tanë një përvojë të lehtë, të sigurt dhe moderne në blerjen e librave,
  duke ruajtur përkushtimin tonë ndaj cilësisë, shërbimit dhe dashurisë për librin.
  </p>
  </motion.section>

  <motion.section
  className="w-full py-20 bg-white-200 text-center shadow-inner"
  initial={{ y: 100 }}
  animate={{ y: 0 }}
  transition={{ duration: 1 }}
>
  <div className="container mx-auto px-6 max-w-6xl">
    <h2 className="text-4xl font-bold mb-6 text-blue-600">
      Vizioni Ynë
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="p-8  bg-blue-800  text-white rounded-xl shadow-lg leading-relaxed">
        <p>
         Vizioni ynë është të bëhemi platforma kryesore për shpërndarjen e librave në Kosovë
        dhe më gjerë, duke bashkuar traditën me teknologjinë moderne.
        </p>
      </div>
      
      <div>
        <Image
          src={CostomImage}
          alt="Ekipi ynë"
          width={500}
          height={300}
          className="rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  </div>
</motion.section>

{/* Our Values Section */}
<motion.section
  className="max-w-6xl py-20 px-6 text-center"
  initial={{ scale: 0.8 }}
  animate={{ scale: 1 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold mb-6 text-blue-400">
    Vlerat Tona
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
    <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-blue-400 text-blue-900 font-semibold">
      Integriteti & Transparenca
    </div>
    <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-blue-400 text-blue-900 font-semibold">
      Pasioni për Teknologjinë
    </div>
    <div className="p-8 bg-white rounded-xl shadow-lg border-2 border-bg-blue-400 text-blue-900 font-semibold">
      Kujdesi për Përdoruesin
    </div>
  </div>
</motion.section>
{/*Contact section */}
        <motion.section
        className="w-full py-20 bg-blue-700 text-black text-center shadow-inner"
        initial={{ opacity: 0 }}
        animate= {{ opacity: 1}}
        transition= {{ duration: 1}}
        >
          <h2 className="text-5xl font-bold mb-4">Antaret e Grupit</h2>
          <p className="mb-1">Enis Gashi</p>
          <p className="mb-4">Muhamed Cakaj</p>
          <p className="mb-1">Bleon Mehmetaj</p>
        </motion.section>
 </div>
        

    );

}
About.displayNAme = "About / My app"