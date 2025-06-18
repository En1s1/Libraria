// components/BookForm.tsx
import { useState, useEffect } from "react";

interface BookFormProps {
  initialData?: {
    title: string;
    price: number;
    image: string;
    description?: string;
  };
  onSubmit: (data: {
    title: string;
    price: number;
    image: string;
    description?: string;
  }) => void;
}

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setPrice(String(initialData.price));
      setImage(initialData.image);
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      price: Number(price),
      image,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titulli i librit"
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
        placeholder="URL e fotos së librit"
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
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
      >
        Ruaj
      </button>
    </form>
  );
}
