import { motion } from "framer-motion";
import Image from "next/image";
import CostomImage from "@/assets/images/Imazhi.png"
import { div } from "framer-motion/dist/types/client";

export default function About() {
    return (
          	<div className="pt-14 bg-gray-50 min-h-screen flex flex-col items-center">
     
            {/* Our Mission Section */}
<motion.section
  className="w-full py-24 bg-indigo-200 text-white text-center shadow-lg w-50 "
  initial={{ x: -100 }}
  animate={{ x: 0 }}
  transition={{ duration: 1 }}
>
  
  <h2 className="text-4xl font-bold mb-6 text-black text-center font-mono text-lg">
    Want to learn some intresting things about us ?
  </h2>
  
  </motion.section>
<motion.section
  className="w-full py-18 bg-gradient-to-br from-slate-200 to-slate-100 text-center"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10">
    Disa fakte interesante për ne 📚
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-5xl mx-auto">
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">+2000 libra</h3>
      <p className="text-gray-600 text-sm">Ne katalogun tonë gjenden mbi 2000 libra nga autorë vendor dhe ndërkombëtar.</p>
    </motion.div>

    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">1000+ përdorues aktivë</h3>
      <p className="text-gray-600 text-sm">Platforma jonë vizitohet çdo ditë nga lexues që kërkojnë dije.</p>
    </motion.div>

    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-600"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Partnerë edukativë</h3>
      <p className="text-gray-600 text-sm">Bashkëpunojmë me shkolla dhe institucione arsimore për të promovuar leximin.</p>
    </motion.div>
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

  <motion.section
  className="w-full py-20 bg-gradient-to-br from-blue-300 to-blue-100 text-center mt-10 mb-20"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  >
    <h2 className="text-4xl font-bold text-blue-600 mb-10">📘 Udhëtimi i një Libri</h2>
    {/* Hapi 1 */}
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 px-4">
    <div className="flex flex-col items-center">
    <div className="bg-blue-100 text-blue-700 rounded-full p-4 text-3xl shdow-md">
      🛒</div>
    <p className="mt-4 font-semibold text-sm">1.Porosit librin</p>
    </div>

    {/* Hapi 2 */}
    <div className="flex flex-col items-center">
      <div className="bg-yellow-100 text-yellow-700 rounded-full p-4 text-3xl shadow-md">
      📦
    </div>
    <p className="mt-4 font-semibold text-sm">2.Paketohet me kujdes</p>
    </div>

    {/*Hapi 3 */}
    <div className="flex flex-col items-center">
      <div className="bg-green-100 text-green-700 rounded-full p-4 text-3xl shadow-md">
      🚚
      </div>
      <p className="mt-4 font-semibold text-sm">Niset per derges</p>
    </div>

    {/* Hapi 4 */}
    <div className="flex flex-col items-center">
      <div className="bg-indigo-100 text-indigo-700 rounded-full p-4 text-3xl shadow-md">
      🏠
      </div>
      <p className="mt-4 font-semibold text-sm">4.Arrin ne shtepin tende</p>
    </div>
    {/* Hapi 5 */}
    <div className="flex flex-col items-center">
      <div className="bg-purple-100 text-purple-700 rounded-full p-4 text-3xl shadow-md">
      📖
      </div>
      <p className="mt-4 font-semibold text-sm">Fillon Leximi 📚</p>
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