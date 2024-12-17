import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiUsers,
  HiDocumentText,
  HiMap,
  HiLogout,
} from "react-icons/hi";
import { useLocation } from "react-router-dom"; // Import useLocation dari React Router
import useAuthStore from "../../store/authStore";

export const NavSidebar = () => {
  const location = useLocation(); // Ambil path saat ini

  // Fungsi untuk mengecek apakah path saat ini cocok dengan href item
  const isActive = (path) => location.pathname === path;

  return (
    <div className="hidden lg:block px-4 py-6 h-full">
      <Sidebar className="flex-grow">
        <Sidebar.Items className="h-full flex flex-col">
          <div className="flex-grow">
            <Sidebar.ItemGroup className="space-y-4">
              <Sidebar.Item
                href="/dashboard"
                className={`${
                  isActive("/dashboard")
                    ? "text-white bg-[#0EA5E9]"
                    : "text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]"
                } font-bold py-3`}
              >
                <div className="flex flex-row items-center gap-3">
                  <HiChartPie className="text-2xl" />
                  <p className="text-lg">Overview</p>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="/dashboard/user"
                className={`${
                  isActive("/dashboard/user")
                    ? "text-white bg-[#0EA5E9]"
                    : "text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]"
                } font-bold py-3`}
              >
                <div className="flex flex-row items-center gap-3">
                  <HiUsers className="text-2xl" />
                  <p className="text-lg">User</p>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="/dashboard/content"
                className={`${
                  isActive("/dashboard/content")
                    ? "text-white bg-[#0EA5E9]"
                    : "text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]"
                } font-bold py-3`}
              >
                <div className="flex flex-row items-center gap-3">
                  <HiDocumentText className="text-2xl" />
                  <p className="text-lg">Content</p>
                </div>
              </Sidebar.Item>
              <Sidebar.Item
                href="/dashboard/destination"
                className={`${
                  isActive("/dashboard/destination")
                    ? "text-white bg-[#0EA5E9]"
                    : "text-[#0EA5E9] hover:text-white hover:bg-[#0EA5E9]"
                } font-bold py-3`}
              >
                <div className="flex flex-row items-center gap-3">
                  <HiMap className="text-2xl" />
                  <p className="text-lg">Destination</p>
                </div>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </div>

          <Sidebar.ItemGroup className="mt-auto">
            <Sidebar.Item
              href="/"
              className="text-[#DC2626] hover:text-white hover:bg-[#DC2626] font-bold py-3"
              onClick={() => {
                useAuthStore.getState().clearAuth(); // Membersihkan data autentikasi
              }}
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
  );
};
