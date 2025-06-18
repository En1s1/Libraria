// pages/product/[id].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/books/${id}`).then(res => res.json()).then(setBook);
    }
  }, [id]);

  if (!book) return <p>Duke u ngarkuar...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p>{book.description}</p>
      <p>Autori: {book.author}</p>
    </div>
  );
}
