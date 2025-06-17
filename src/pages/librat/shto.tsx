// pages/librat/shto.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ShtoLiberPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    else if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price,
        image,
        description,
      }),
    });

    if (res.ok) {
      alert("Libri u shtua me sukses!");
      router.push("/librat");
    } else {
      alert("Gabim gjatë shtimit të librit!");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Shto Libër të Ri</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titulli"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Çmimi €"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="URL e Fotos"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Përshkrimi (opsional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Shto Librin
        </button>
      </form>
    </div>
  );
}
