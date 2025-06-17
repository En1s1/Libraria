import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Nëse përdoruesi është i kyçur, ridrejto në /profile
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/profile").then(() => router.reload());
    } else {
      setError("Email ose fjalëkalim i pasaktë");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 bg-gray-100 p-6 rounded shadow"
        >
          <h1 className="text-2xl font-bold text-center">Kyçu në llogari</h1>

          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded">{error}</div>
          )}

          <input
            className="border p-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Fjalëkalimi"
            required
          />
          <button
            className="bg-purple-400 text-white p-2 w-full rounded hover:bg-purple-500 transition"
            disabled={loading}
          >
            {loading ? "Duke u kyçur..." : "Kyçu"}
          </button>
        </form>

        {/* Regjistrimi */}
        <div className="text-center mt-6">
          <p className="mb-2">Nuk jeni i regjistruar?</p>
          <Link href="/register">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Regjistrohu
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

