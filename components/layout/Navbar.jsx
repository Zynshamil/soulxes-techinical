import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white h-21 flex justify-center items-center border border-[#8D8D8D40] shadow">
      <Image width={128} height={52} src="/logo.svg" alt="logo" />
    </div>
  );
};

export default Navbar;
