import React from "react";
import SheerpeaceWordmark from "../../../public/sheerpeace-word-mark.svg";

const Footer = () => {
  return (
    <footer className="bg-sheerpeace-black text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-[20px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-6 md:space-y-0">
          {/* Left Section - Brand */}
          <div className="md:w-1/3 flex flex-col sm:flex-row items-center">
            <SheerpeaceWordmark className="fill-white scale-90" />
            <span className="mx-6">|</span>
            <p className="text-sm text-gray-400">Gift & Decoration Store</p>
          </div>

          {/* Center Section - Navigation */}
          <div className="">
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-6 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-500 mt-[30px]" />
        {/* Bottom Section - Copyright */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-[20px]">
          <div className="text-center text-sm text-gray-400">
            <p>Copyright © 2023 3legant. All rights reserved.</p>
          </div>

          {/* Right Section - Policies */}
          <div className="">
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
