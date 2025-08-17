import React from "react";

export default function UsersPage({ users }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista e Përdoruesve</h1>
      {users.length === 0 ? (
        <p>Nuk u gjetën përdorues.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> - {user.email} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const host = context.req.headers.host;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  try {
    const res = await fetch(`${protocol}://${host}/api/users`);
    if (!res.ok) {
      return { props: { users: [] } };
    }
    const users = await res.json();

    return { props: { users } };
  } catch (err) {
    console.error("Gabim në marrjen e përdoruesve:", err);
    return { props: { users: [] } };
  }
}
