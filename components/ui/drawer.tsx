"use client";

import { Home, LucideIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItem {
  name: string;
  icon: LucideIcon;
  link: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: Home,
    name: "Home",
    link: "/home",
  },
  {
    icon: Settings,
    name: "Settings",
    link: "#",
  },
];

export default function Drawer({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
          Open drawer
        </label>

        {children}
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
              className="flex p-4 bg-base-200 active:to-base-300 active:text-base-content"
            >
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <Image
                    alt="avatar"
                    width={500}
                    height={500}
                    src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                {/* Primary Text: High contrast, slightly bolder */}
                <h3 className="font-bold text-base text-base-content leading-tight">
                  John Doe
                </h3>

                {/* Secondary Text: Lower contrast, smaller, lighter weight */}
                <p className="text-sm leading-normal">@johndoe497</p>
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
  );
}
