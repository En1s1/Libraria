import Link from "next/link";
import cs from "classnames";
import Button from "../shared/button";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/logo.svg";
import CartIcon from "../../pages/components/CartIcon";

export function Header() {
  const router = useRouter();
  const items = [
    {
      name: "Home",
      pathName: "/",
    },
    {
      name: "MyProfile",
      pathName: "/profile",
    },
    {
      name: "Librat",
      pathName: "/librat",
    },
    
  ];

  return (
    <div className="py-3 fixed z-50 bg-white border-b w-full transition-all duration-300">
      <div className="container m-auto flex items-center">
        <Link href="/">
        <picture>
          <img className="h-10  ml-12" src={Logo.src} alt="Logo" />
          </picture>
          </Link>
        <div className="flex-1 flex gap-10 items-center justify-center">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.pathName}
              className={cs("text-black", {
                "underline font-semibold": router.pathname === item.pathName,
              })}
            >
              {item.name}
            </Link>
          ))}
           <header className="flex justify-between items-center px-4 py-2 shadow">
            <h1 className="text-xl font-bold"></h1>
            <CartIcon />
         </header>
          </div>
          </div>
          </div>
      );
}


    


export default Header;
