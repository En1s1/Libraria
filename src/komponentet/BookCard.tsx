/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Heart, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";


interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
}

interface Props {
  book: Book;
  isAdmin?: boolean;
}

export  function BookCard({ book, isAdmin }: Props) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(false);

  // Kontrollo nëse libri është i preferuar
  useEffect(() => {
    const checkFavorite = async () => {
      if (!session) return;
      const res = await fetch("/api/favorites/user");
      const data = await res.json();
      const found = data.find((fav: any) => fav.book === book._id);
      setIsFavorite(!!found);
    };
    checkFavorite();

  }, [book._id, session]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Libri u shtua në shportë!");
  };

  const toggleFavorite = async () => {
    if (!session) {
      alert("Ju lutem kyçuni për të shtuar në të preferuarat.");
      return;
    }

    if (isFavorite) {
      // Hiqe nga favorites
      await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book._id }),
      });
    } else {
      // Shtoje në favorites
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book._id }),
      });
    }

    setIsFavorite(!isFavorite);
  };

  const handleDelete = () => {
    if (confirm("A jeni i sigurt që doni ta fshini këtë libër?")) {
      alert(`Libri me ID ${book._id} u fshi (simulim)`);
    }
  };

  const submitComment = async (type: "good" | "notgood") => {
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book: book._id,
          content: type === "good" ? "Koment pozitiv" : "Koment negativ",
        }),
      });

      if (res.ok) {
        alert(`Komentuar si: ${type === "good" ? "Pozitiv 👍" : "Negativ 👎"}`);
        setShowCommentOptions(false);
      } else {
        alert("Ndodhi një gabim gjatë dërgimit.");
      }
    } catch (err) {
      alert("Gabim në rrjet.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col relative group transition-all duration-300 hover:shadow-xl">
      

        <img
        src={book?.image || "/placeholder.jpg"}
        alt={book?.title || "Pa titull"}
        className="w-full h-113 object-cover rounded mb-3"
    />

      <div className="flex flex-col justify-between flex-1">
        <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-600">{book.description}</p> {/* 👈 përshkrimi */}
        <p className="text-gray-500 mb-4">{book.price} €</p>

        {isAdmin ? (
          <div className="flex gap-3 mt-auto">
            <a
              href={`/librat/edit/${book._id}`}
              className="p-2 rounded hover:bg-yellow-100 text-yellow-600 border border-yellow-400"
              title="Përditëso"
            >
              <Pencil size={20} />
            </a>
            <button
              onClick={handleDelete}
              className="p-2 rounded hover:bg-red-100 text-red-600 border border-red-400"
              title="Fshij"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-auto gap-2">
            <button
              onClick={addToCart}
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
              title="Shto në shportë"
            >
              <ShoppingCart size={20} />
            </button>

            {/* Koment */}
            <div className="relative">
              <button
                onClick={() => setShowCommentOptions(!showCommentOptions)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300 transition"
                title="Komento"
              >
                💬
              </button>

              {showCommentOptions && (
                <div className="absolute bottom-8 left-0 z-10 bg-white shadow rounded p-2 flex gap-2">
                  <button
                    onClick={() => submitComment("good")}
                    className="bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200"
                  >
                    👍
                  </button>
                  <button
                    onClick={() => submitComment("notgood")}
                    className="bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                  >
                    👎
                  </button>
                </div>
              )}
            </div>

            {/* Favorite */}
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full border transition ${
                isFavorite
                  ? "text-pink-600 border-pink-400 bg-pink-100 hover:bg-pink-200"
                  : "text-gray-400 border-gray-300 hover:bg-gray-100"
              }`}
              title="Shto në të preferuarat"
            >
              <Heart
                size={20}
                fill={isFavorite ? "#ec4899" : "none"}
                strokeWidth={1.8}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

