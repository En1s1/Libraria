import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShoppingCart } from "lucide-react"; // ose përdor ndonjë ikonë tjetër që ke instaluar

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItemCount(cart.length);
  }, []);

  const handleClick = () => {
    router.push("/librat/shporta");
  };

  return (
    <div onClick={handleClick} className="relative cursor-pointer">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-black" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {itemCount}
        </span>
      )}
    </div>
  );
}
