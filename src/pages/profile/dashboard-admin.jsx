import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

export default function DashboardAdmin() {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState("/user-profile.jpg");
  const [orders, setOrders] = useState([]); 
  
  useEffect(() => {
    const storedImage = localStorage.getItem("adminProfileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);
  
   useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("❌ API nuk ktheu array për orders:", data);
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("adminProfileImage", imageUrl);
    }
  };

  return (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
    <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-300 mb-4 border-b pb-2 border-red-100">
        🔐 Paneli i Adminit
      </h1>

      <div className="flex items-center space-x-5">
        <Image
          src={profileImage}
          alt="Admin"
          width={90}
          height={90}
          className="rounded-full object-cover border-4 border-red-200 shadow-md"
        />
        <div>
          <p className="text-xl font-semibold text-gray-800">{session?.user?.name}</p>
          <p className="text-sm text-gray-600">{session?.user?.email}</p>
          <p className="text-sm font-bold text-red-500 mt-1">I/E kyçur si: Admin</p>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label className="inline-block bg-red-50 text-red-700 px-5 py-2 rounded-lg font-medium text-sm cursor-pointer hover:bg-red-100 transition duration-200">
          📁 Ndrysho Foton
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>
       <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Të gjitha Porositë</h1>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded mb-2">
          <p><strong>Klienti:</strong> {order.userId.email}</p>
          <p><strong>Totali:</strong> €{order.total}</p>
          <p><strong>Librat:</strong> {order.books.map(b => b.title).join(", ")}</p>
          <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
      <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
>
  🔓 Dil (Logout)
      </button>
    </div>
  </div>
);
}