import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from "next/script";

interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
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

  const handleOrderAfterPayPal = async () => {
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
  };

  const totalPrice = cartItems.reduce((sum, book) => sum + book.price, 0);

  return (
    <>
     <Script
  src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"
  strategy="beforeInteractive"
/>
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
                    <p className="text-xs text-gray-500">{book.description}</p>
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
              <PayPalScriptProvider options={{ clientId: "Af_cIPk0wHtsTW6A2_XMG4NiSaOYq3vTZNk9V_9LV5j0ztS-pxx7p0KIS12nsmZCigbztaEja2pVkXdv", currency: "EUR" }}>
              <div style={{ maxWidth: "300px", }}>
                <PayPalButtons
                  style={{
            layout: "vertical", 
            color: "gold",      
            shape: "pill",      
            label: "paypal",    
            height: 40, 
          }}
  createOrder={(data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "EUR",
            value: totalPrice.toFixed(2),
          },
        },
      ],
    });
  }}
  onApprove={async (data, actions) => {
    if (!actions || !actions.order) {
      console.error("actions.order is undefined");
      return Promise.resolve(); 
    }

    try {
            await actions.order.capture();
            await handleOrderAfterPayPal();
    } catch (error) {
            console.error("Gabim gjatë kapjes së pagesës:", error);
           }
        }}
    />
</div>
              </PayPalScriptProvider>

            </div>
          </div>
        )}

      </div>
    </>
  );
}
