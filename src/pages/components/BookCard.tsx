// components/BookCard.tsx
import React from "react";

interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
}

interface Props {
  book: Book;
  isAdmin?: boolean;
}
export default function BookCard({ book, isAdmin }: Props) {
const addToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({
    _id: book._id,
    title: book.title,
    price: book.price,
    image: book.image,
  }); // shtojmë edhe price dhe image

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Libri u shtua në shportë!");
};

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-118 object-cover rounded mb-2"
      />
      <div className="flex flex-col justify-end h-full">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-gray-600 mb-2">{book.price} €</p>
      </div>

      {isAdmin ? (
        <div className="flex gap-2 mt-auto">
          <a
            href={`/librat/edit/${book._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
          >
            Përditëso
          </a>
          {/* Optional: mund të shtosh edhe një buton për fshirje këtu */}
        </div>
      ) : (
        <button
          onClick={addToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-auto rounded"
        >
          Bli tani
        </button>
      )}
    </div>
  );
}
