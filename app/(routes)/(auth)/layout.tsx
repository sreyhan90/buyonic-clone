import React from "react";

import Header from "../Header";

interface AutLayoutProps {
  children: React.ReactNode;
}

const AutLayout = ({ children }: AutLayoutProps) => {
  return (
    <div>
      <div className="flex items-center justify-center px-6 py-1 lg:col-span-3 bg-white">
        <div className=" w-full max-w-4x">{children}</div>
      </div>
    </div>
  );
};

export default AutLayout;
