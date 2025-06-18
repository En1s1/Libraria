import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("/user-profile.jpg");

  // 👉 Merr foton nga databaza kur përdoruesi është i kyçur
  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch(`/api/users/getProfileImage`);
      const data = await res.json();
      if (data.profileImage) {
        setProfileImage(data.profileImage);
      }
    };

    if (status === "authenticated") {
      fetchImage();
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  // 👉 Ndrysho foton dhe ruaje në databazë
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);

    // Dërgo në backend
    await fetch("/api/users/updateProfileImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }), // në të ardhmen mund të përdorësh Cloudinary
    });
  };

  // 👉 Pas ngarkimit të sesionit, bëhet redirect sipas rolit
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      if (session.user.role === "admin") {
        router.push("/profile/dashboard-admin");
      } else {
        router.push("/profile/dashboard-user");
      }
    }
  }, [status, session]);

  return <p>Duke u ngarkuar profili...</p>;
}
