// 📁 pages/profile/dashboard-user.jsx
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function DashboardUser() {
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState("/user-profile.jpg");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("/api/users/getProfileImage");
      const data = await res.json();
      if (data.profileImage) setProfileImage(data.profileImage);
    };
    fetchImage();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    await fetch("/api/users/updateProfileImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="max-w-3xl w-full space-y-6">
      {/* Card i profilit */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Image
            src={profileImage}
            alt="Profili"
            width={80}
            height={80}
            className="rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{session?.user?.name}</h1>
            <p className="text-sm text-gray-500">{session?.user?.email}</p>
            <p className="text-green-600 font-medium text-sm mt-1">
              I/E kyçur si: Përdorues
            </p>
          </div>
        </div>
        <label className="bg-blue-100 text-blue-700 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-200 transition">
          Ndrysho Foton
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Card i librave të preferuar */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">📚 Librat e Preferuar</h2>
        <p className="text-gray-600 text-sm mt-2">
          Këtu do të shfaqen librat që i ke preferuar (pasi të lidhen me backend-in).
        </p>
      </div>

      {/* Card i komenteve */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">💬 Komentet e Mia</h2>
        <p className="text-gray-600 text-sm mt-2">
          Këtu do të shfaqen komentet e tua mbi libra.
        </p>
      </div>
    </div>
  </div>
);
}
