import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookCard from "../components/BookCard";

interface Book {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  author?: string;
  category?: string;
  language?: string;
  createdAt?: string;
}

export default function LibratPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [category, setCategory] = useState("");

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

  useEffect(() => {
    let result = [...books];

    if (searchQuery.trim()) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((book) => book.category === category);
    }

    if (sortBy === "newest") {
      result.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } else if (sortBy === "lowest") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highest") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredBooks(result);
  }, [books, searchQuery, sortBy, category]);

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

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Kërko librin..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-auto"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Të gjitha kategoritë</option>
          <option value="novel">Roman</option>
          <option value="poetry">Poezi</option>
          <option value="history">Histori</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="newest">Më të rinjtë</option>
          <option value="lowest">Çmimi më i ulët</option>
          <option value="highest">Çmimi më i lartë</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
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
