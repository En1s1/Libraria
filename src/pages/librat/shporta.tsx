// pages/librat/shporta.tsx
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
}

export default function ShportaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Book[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [status]);

  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    try {
      const bookIds = cartItems.map((book) => book._id);
      const total = cartItems.reduce((sum, book) => sum + book.price, 0);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ books: bookIds, total }),
      });

      if (res.ok) {
        alert("Porosia u krye me sukses!");
        localStorage.removeItem("cart");
        setCartItems([]);
        router.push("/profile/dashboard-user");
      } else {
        alert("Gabim gjatë porosisë!");
      }
    } catch (err) {
      alert("Gabim në rrjet ose server!");
    }
  };

  const totalPrice = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shporta Juaj</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Shporta është bosh.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((book) => (
            <div
              key={book._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-sm text-gray-600">{book.price}€</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(book._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Hiqe
              </button>
            </div>
          ))}
          <div className="text-right text-lg font-bold">
            Totali: {totalPrice.toFixed(2)} €
          </div>
         
          <div className="text-right mt-4">
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            >
              Bli Tani
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
