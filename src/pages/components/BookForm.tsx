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
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl mx-auto min-h-[460px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {initialData ? "Përditëso Librin" : "Shto Libër të Ri"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
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

        {/* Preview i fotos */}
        {image && (
          <div>
            <p className="text-sm text-gray-600">Preview i fotos:</p>
            <img
              src={image}
              alt="Foto e librit"
              className="w-32 h-48 object-cover rounded border mt-1"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Përshkrimi (opsional)"
          className="border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded mt-auto"
        >
          Ruaj
        </button>
      </form>
    </div>
  );
}
