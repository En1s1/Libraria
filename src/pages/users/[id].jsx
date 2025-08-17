import React from "react";

export default function UserPage({ user }) {
  if (!user) {
    return <div>Përdoruesi nuk u gjet.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Roli: {user.role}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const host = context.req.headers.host;
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  try {
    const res = await fetch(`${protocol}://${host}/api/users/${id}`);
    const user = await res.json();

    return {
      props: { user },
    };
  } catch (error) {
    console.error("Gabim në marrjen e përdoruesit:", error);
    return { props: { user: null } };
  }
}
