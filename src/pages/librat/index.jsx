import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookCard from "../components/BookCard";

export default function LibratPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista e Librave</h1>

      {session?.user?.role === "admin" && (
        <div className="mb-4">
          <a
            href="/librat/shto"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            ➕ Shto Liber
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            isAdmin={session?.user?.role === "admin"}
          />
        ))}
      </div>
    </div>
  );
}


