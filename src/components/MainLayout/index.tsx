import Head from "next/head";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

interface Props {
  children?: ReactNode;
  name?: string;
}

export function MainLayout(props: Props) {
  return (
    <SessionProvider>
      <div>
        <Head>
          <title>{props.name}</title>
        </Head>
        <Header />
        <main className="bg-white">{props.children}</main>
        <Footer />
      </div>
    </SessionProvider>
  );
}

export default MainLayout;
