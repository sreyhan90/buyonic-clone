import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Cart", path: "/cart" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-300 bg-gray-100 mt-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Buyonic</h3>
          <p className="mt-2 max-w-sm text-sm text-gray-500">
            Shop smart, fast and easy with a clean, simple experience.
          </p>
          <div className="flex flex-row gap-2 mt-3">
            <Instagram className=" hover:bg-gray-100 hover:text-gray-900" />
            <Twitter />
            <Facebook />
          </div>
        </div>

        <div className="flex gap-6 text-sm text-gray-600">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="relative transition-all duration-200 hover:scale-110 hover:text-black
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black
      after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        © Buyonic. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
