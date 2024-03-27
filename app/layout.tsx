import React from "react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "@/app/components/ClientOnly";
import Navbar from "@/app/components/navbar/Navbar";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/modals/RentModal";
import SearchModal from "@/app/components/modals/SearchModal";

export const metadata: Metadata = {
  title: "Homely",
  description: "Travel web-site",
};

const font = Nunito({
    subsets: ["latin"],
});

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="ru">
          <body className={font.className}>
          <ClientOnly>
              <ToasterProvider />
              <SearchModal />
              <RentModal />
              <LoginModal />
              <RegisterModal />
              <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className="pb-20 pt-28">
              {children}
          </div>
          </body>
        </html>
    );
}