// pages/products.jsx
export default function ProductsPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books").then(res => res.json()).then(setBooks);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista e Librave</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}><a href={`/product/${book._id}`}>{book.title}</a></li>
        ))}
      </ul>
    </div>
  );
}