import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="relative z-10 bg-white h-[84px] flex justify-center items-center" style={{ boxShadow: "0px 4px 4px 0px #8D8D8D40" }}>
      <Image width={128} height={52} src="/logo.svg" alt="logo" />
    </div>
  );
};

export default Navbar;
