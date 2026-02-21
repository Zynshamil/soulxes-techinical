import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white h-[84px] flex justify-center items-center">
      <Image width={128} height={52} src="/logo.svg" alt="logo" />
    </div>
  );
};

export default Navbar;
