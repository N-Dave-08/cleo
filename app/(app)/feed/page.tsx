"use client";

import { Home, LucideIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItem = {
  name: string;
  icon: LucideIcon;
  link: string;
};

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    name: "Home",
    link: "/feed",
  },
  {
    icon: Settings,
    name: "Settings",
    link: "#",
  },
];
export default function FeedPage() {
  const pathname = usePathname();

  return (
    <>
      {/* sidebar */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col p-4">
          {/* Page content here */}
          <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
            Open drawer
          </label>

          <div className="border w-3xl h-160 rounded-lg border-base-content relative overflow-hidden">
            <div className="w-full max-h-140 overflow-hidden">
              <Image
                alt="spiderman"
                fill
                className="object-contain"
                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
              />
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 p-4 border-r border-base-content/5 bg-base-200 lg:bg-base-100">
            {/* Sidebar content here */}
            <li className="mb-4">
              <Link
                href={"#"}
                className="flex flex-col p-4 bg-base-200 active:to-base-300 active:text-base-content"
              >
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <Image
                      alt="avatar"
                      width={500}
                      height={500}
                      src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-xl">John Doe</span>
                  <span>something here</span>
                </div>
              </Link>
            </li>
            {sidebarItems.map((item) => {
              const isActive = pathname === item.link;

              return (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={`${isActive ? "menu-active" : ""}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
