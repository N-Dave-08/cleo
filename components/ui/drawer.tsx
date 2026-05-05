"use client";

import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  Home,
  LucideIcon,
  Settings,
  PanelLeftOpen,
} from "lucide-react";
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
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full border border-b border-base-content/5">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <PanelLeftOpen className="size-5" />
            </label>
          </div>
          <div className="flex-1 px-4 font-bold">Navbar Title</div>
        </nav>

        {/* Main Page Content */}
        <main className={cn("grow", "flex flex-col items-center")}>
          <div className="w-full max-w-4xl">{children}</div>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-20">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start  border-r border-base-content/5 is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300">
          {/* Navigation Links */}
          <ul className="menu w-full grow p-2 gap-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={cn(
                      "flex items-center gap-4 is-drawer-close:tooltip is-drawer-close:tooltip-right",
                      isActive && "menu-active",
                    )}
                    data-tip={item.name}
                  >
                    <item.icon className="size-5 shrink-0" />
                    <span className="is-drawer-close:hidden whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-top w-full p-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost w-full justify-start gap-4 px-2"
            >
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <Image
                    alt="avatar"
                    width={32}
                    height={32}
                    src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center justify-between is-drawer-close:hidden overflow-hidden">
                <span className="text-sm truncate">johndoe497</span>
                <EllipsisVertical className="size-4 opacity-50" />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg mb-2"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
