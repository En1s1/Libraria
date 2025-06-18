// pages/librat/edit/[id].tsx
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EditBookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

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

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      const res = await fetch(`/api/books/${id}`);
      const book = await res.json();
      setTitle(book.title);
      setPrice(book.price);
      setImage(book.image);
      setDescription(book.description || "");
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, price, image, description }),
    });

    if (res.ok) {
      alert("Libri u përditësua me sukses!");
      router.push("/librat");
    } else {
      alert("Gabim gjatë përditësimit të librit.");
    }
  };
   const handleDelete = async () => {
    const confirmDelete = confirm("A je i sigurt që do ta fshish këtë libër?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Libri u fshi me sukses!");
      router.push("/librat");
    } else {
      alert("Gabim gjatë fshirjes së librit.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Përditëso Librin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titulli"
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Çmimi €"
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL e Fotos"
          className="border px-4 py-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Përshkrimi (opsional)"
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Ruaj Ndryshimet
        </button>
      </form>
      {session?.user?.role === "admin" && (
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          🗑 Fshije Librin
        </button>
      )}
    </div>

  );
}
