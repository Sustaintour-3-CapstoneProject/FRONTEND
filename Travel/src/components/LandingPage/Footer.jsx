import { Footer } from "flowbite-react";

const CustomFooter = () => (
  <Footer className="container bg-white py-8">
    {/* Flexbox untuk menjaga jarak antar kolom */}
    <div className="flex flex-col md:flex-row items-start justify-between gap-32 px-6 md:px-20">
      {/* Kolom Logo dan Deskripsi */}
      <div className="flex flex-col w-full max-w-[330px]">
        <Footer.Brand
          href="#"
          src="/logo2.png" // Ganti dengan URL logo Anda
          alt="TripWise Logo"
        />
        <p className="mt-5 text-gray-600 text-sm">
          TripWise empowers travelers with access to sustainable destination
          guides, personalized routes, cultural exchanges, and environmental
          education.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          We aim to connect you with meaningful, responsible travel experiences.
        </p>
      </div>

      {/* Kolom Links */}
      <div className="flex flex-col w-full max-w-[170px]">
        <Footer.Title title="Links" />
        <Footer.LinkGroup col={true} className="mt-2">
          <Footer.Link href="#">About Us</Footer.Link>
          <Footer.Link href="#">Contact Us</Footer.Link>
          <Footer.Link href="#">FAQ</Footer.Link>
          <Footer.Link href="#">Terms & Condition</Footer.Link>
        </Footer.LinkGroup>
      </div>

      {/* Kolom Kontak */}
      <div className="flex flex-col w-full max-w-[238px]">
        <Footer.Title title="Get In Touch" />
        <ul className="mt-2 text-gray-600 text-sm space-y-3">
          <li className="flex items-start gap-2">
            <span className="font-semibold">Phone:</span> +62-8888-222
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">Email:</span> tripwise@co.id
          </li>
          <li className="flex items-start gap-2">
            <span className="font-semibold">Address:</span>
            JL. Pondok Indah Raya, Pondok Indah, Cilandak, Jakarta Selatan, DKI
            Jakarta, Indonesia
          </li>
        </ul>
      </div>
    </div>
  </Footer>
);

export default CustomFooter;
