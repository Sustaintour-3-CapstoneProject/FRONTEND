import { Footer, FooterDivider } from "flowbite-react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footers = () => (
  <>
    <Footer className=" bg-sky-100 py-8 flex flex-col " id="contact">
      {/* Flexbox untuk menjaga jarak antar kolom */}
      <div className="flex flex-col ">
        <div className="flex flex-col  md:flex-row items-start justify-between mx-auto gap-20  px-4 ">
          {/* Kolom Logo dan Deskripsi */}
          <div className="flex flex-col w-full text-center  md:ml-20 md:text-left">
            <Footer.Brand
              href="#"
              src="/logo2.png" // Ganti dengan URL logo Anda
              alt="TripWise Logo"
              className="flex justify-center md:justify-start"
            />
            <ul className="mt-5 text-gray-600 text-sm space-y-3">
              <li className="flex flex-col items-center md:flex-row md:items-start md:gap-2">
                <span className="font-semibold">Phone:</span>
                <span>+62-8888-222</span>
              </li>
              <li className="flex flex-col items-center md:flex-row md:items-start md:gap-2">
                <span className="font-semibold">Email:</span>
                <span>tripwise@co.id</span>
              </li>
              <li className="flex flex-col items-center md:flex-row md:items-start md:gap-2">
                <span className="font-semibold">Address:</span>
                <span>
                  JL. Pondok Indah Raya, Pondok Indah, Cilandak, Jakarta
                  Selatan, DKI Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>

          {/* Kolom Links */}
          <div className="flex flex-col w-full text-center md:text-left md:ml-20">
            <Footer.Title title="Features" />
            <Footer.LinkGroup col={true} className="ml-2 md:ml-0 mt-2">
              <Footer.Link href="#" className="pl-[15px] md:pl-0">
                Destinations
              </Footer.Link>
              <Footer.Link href="#">Route</Footer.Link>
              <Footer.Link href="#">Ai Asisstent</Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Kolom Links */}
          <div className="flex flex-col w-full text-center  md:justify-center md:text-left ">
            <Footer.Title title="Category" />
            <Footer.LinkGroup col={true} className="ml-2 md:ml-0 mt-2">
              <Footer.Link href="#">Nature</Footer.Link>
              <Footer.Link href="#">Culture & Historical</Footer.Link>
              <Footer.Link href="#">EcoTourism</Footer.Link>
            </Footer.LinkGroup>
          </div>

          {/* Kolom Kontak */}
          <div className="flex flex-col w-full text-center md:text-left  ">
            <Footer.Title title="Follow Us" />
            <ul className="mt-2 flex justify-center md:justify-start space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#4267B2] transition-colors"
                >
                  <FaFacebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
                >
                  <FaTwitter size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#E1306C] transition-colors"
                >
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#0077B5] transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <FooterDivider />
        <div className="flex flex-col justify-start w-full mx-20 text-gray-500 ">
          &copy; {new Date().getFullYear()} TripWise. All rights reserved.
        </div>
      </div>
      {/* Copyright Section */}
    </Footer>
  </>
);

export default Footers;
