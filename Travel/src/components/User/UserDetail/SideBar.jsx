import { useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiLogout,
  HiHeart,
  HiMenu,
} from "react-icons/hi";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State untuk sidebar di layar kecil

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Fungsi untuk toggle sidebar

  return (
    <>
      {/* Hamburger Icon untuk layar kecil */}
      <div className="lg:hidden absolute top-20 left-4 z-50">
        <button onClick={toggleSidebar} className="text-[#0EA5E9]">
          <HiMenu className="h-8 w-8" />
        </button>
      </div>

      {/* Sidebar untuk layar besar */}
      <div className="hidden lg:block px-4 py-6 h-full">
        <Sidebar className="flex-grow">
          <Sidebar.Items className="h-full flex flex-col">
            <div className="flex-grow">
              <Sidebar.ItemGroup className="space-y-4">
                <Sidebar.Item
                  href="/profile"
                  className="text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9] font-bold py-3"
                >
                  <div className="flex flex-row items-center gap-3">
                    <HiUser className="text-2xl" />
                    <p className="text-lg">Profile</p>
                  </div>
                </Sidebar.Item>
                <Sidebar.Item
                  href="/profile/Route"
                  className="text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9] font-bold py-3"
                >
                  <div className="flex flex-row items-center gap-3">
                    <HiHeart className="text-2xl" />
                    <p className="text-lg">Saved Route</p>
                  </div>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </div>

            <Sidebar.ItemGroup className="mt-auto">
              <Sidebar.Item
                href="/"
                className="text-[#DC2626] hover:text-white hover:bg-[#DC2626] font-bold py-3"
              >
                <div className="flex flex-row items-center gap-3">
                  <HiLogout className="text-2xl" />
                  <p className="text-lg">Logout</p>
                </div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Sidebar untuk layar kecil */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      >
        <div
          className={`w-64 h-full bg-white shadow-xl transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()} // Mencegah sidebar menutup saat diklik
        >
          <Sidebar className="flex-grow">
            <Sidebar.Items className="h-full flex flex-col">
              <div className="flex-grow">
                <Sidebar.ItemGroup className="space-y-4">
                  <Sidebar.Item
                    href="/profile"
                    className="text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9] font-bold py-3"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <HiUser className="text-2xl" />
                      <p className="text-lg">Profile</p>
                    </div>
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="/profile/Route"
                    className="text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9] font-bold py-3"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <HiHeart className="text-2xl" />
                      <p className="text-lg">Saved Route</p>
                    </div>
                  </Sidebar.Item>
                </Sidebar.ItemGroup>
              </div>

              <Sidebar.ItemGroup className="mt-auto">
                <Sidebar.Item
                  href="/"
                  className="text-[#DC2626] hover:text-white hover:bg-[#DC2626] font-bold py-3"
                >
                  <div className="flex flex-row items-center gap-3">
                    <HiLogout className="text-2xl" />
                    <p className="text-lg">Logout</p>
                  </div>
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
    </>
  );
};

export default SideBar;
