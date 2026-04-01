import Footer from "../(routes)/Footer";
import Header from "../(routes)/Header";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Buyonic",
  description: "Modern E-commerce App",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Toaster />

      <Footer />
    </div>
  );
}
