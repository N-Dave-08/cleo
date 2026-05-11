"use client";

import { signOut } from "@/app/auth/action";
import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  Home,
  LucideIcon,
  Settings,
  PanelLeftOpen,
  Cat,
  Plus,
  Send,
  MessageSquareDot,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import PostCreateModal from "@/app/(app)/home/_components/post-create-modal";
import { getAvatarUrl } from "@/lib/get-avatar-url";

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
  {
    icon: Send,
    name: "Messages",
    link: "#",
  },
  {
    icon: MessageSquareDot,
    name: "Notifications",
    link: "#",
  },
];

type DrawerUser = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export default function Drawer({
  children,
  user,
}: {
  children: ReactNode;
  user: DrawerUser;
}) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full border border-b border-base-content/5 bg-base-100 z-10 sticky top-0">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <PanelLeftOpen className="size-5" />
            </label>
          </div>
          <div className="flex-1 px-4 font-bold">
            <div className="flex gap-1">
              <Cat /> <span>Cleo</span>
            </div>
          </div>
          <PostCreateModal />
        </nav>

        {/* Main Page Content */}
        <main className="grow w-full flex flex-col">{children}</main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible z-20">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
          {/* Navigation Links */}
          <ul className="menu w-full grow">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.link;
              return (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={cn(
                      "is-drawer-close:tooltip is-drawer-close:tooltip-right",
                      isActive && "menu-active",
                    )}
                    data-tip={item.name}
                  >
                    <item.icon className="my-1 inline-block size-4" />
                    <span className="is-drawer-close:hidden">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-top dropdown-start w-full p-2">
            <div
              tabIndex={0}
              role="button"
              className={cn(
                "btn btn-ghost w-full px-1 flex justify-start gap-4",

                "is-drawer-close:btn-ghost",
                "is-drawer-close:w-10 is-drawer-close:h-10",
                "is-drawer-close:p-0",
                "is-drawer-close:gap-0",
                "is-drawer-close:rounded-lg",
                "is-drawer-close:flex is-drawer-close:items-center is-drawer-close:justify-center",
              )}
            >
              {/* Avatar */}
              <div className="avatar shrink-0">
                <div className="w-8 rounded-lg">
                  <Image
                    alt="avatar"
                    width={32}
                    height={32}
                    unoptimized
                    src={getAvatarUrl(user.username, user.avatar_url)}
                  />
                </div>
              </div>

              {/* Name + icon */}
              <div className="flex flex-1 items-center justify-between overflow-hidden is-drawer-close:hidden">
                <span className="text-sm truncate">{user.username}</span>
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
                <a>Activity</a>
              </li>
              <hr className="text-base-content/5" />
              <li>
                <button type="button" onClick={signOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
