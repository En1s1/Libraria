import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();
   
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      alert("Regjistrimi u krye me sukses!");
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.message || "Gabim gjatë regjistrimit");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Regjistrohu</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Emri i plotë"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2"
            required
          />
          <input
            type="password"
            placeholder="Fjalëkalimi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2"
            required
          />
          <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2"
          >
          <option value="user">Përdorues</option>
          <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700 transition"
          >
            Regjistrohu
          </button>
        </form>
      </div>
    </div>
  );
}
