import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { BeforeLoginHeader } from "@/components/header/beforeLoginHeader";
import { createClient } from "@/lib/supabase/server";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calendar Task App",
  description: "To manage tasks on a calendar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const {
  data: { user },
  } = await supabase.auth.getUser()

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">


        { user? (
          <>
            <Header/>
            <SidebarProvider defaultOpen={false}>
            <AppSidebar/>
            <main className="flex-1">
              <SidebarTrigger/>
              {children}
            </main>
            </SidebarProvider>
          </>
        )
          :(
            <>
              <BeforeLoginHeader/>
              {children}
            </>

          )
          
        }

        </body>

    </html>
  );
}


