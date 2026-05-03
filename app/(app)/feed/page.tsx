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

type PostItem = {
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  content: string;
  image?: string;
  date: Date;
};

const postItems: PostItem[] = [
  {
    authorAvatar:
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    authorName: "John Doe",
    authorUsername: "@johndoe497",
    content:
      "Building the MVP for Cleo! Flexbox makes this layout much cleaner.",
    image:
      "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp",
    date: new Date(),
  },
  {
    authorAvatar:
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    authorName: "John Doe",
    authorUsername: "@johndoe497",
    content:
      "Building the MVP for Cleo! Flexbox makes this layout much cleaner.",
    image: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
    date: new Date(),
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

          {/* Main Post Container */}
          {postItems.map((post) => (
            <div className="flex gap-3 p-4  max-w-2xl">
              {/* Left Column: Avatar */}
              <div className="shrink-0">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img src={post.authorAvatar} alt="avatar" />
                  </div>
                </div>
              </div>

              {/* Right Column: Content Area */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                {/* Header: Name, Handle, and Time */}
                <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
                  <span className="font-bold text-base-content truncate">
                    {post.authorName}
                  </span>
                  <div className="flex items-center gap-1 text-accent/60">
                    <span className="text-sm truncate">
                      {post.authorUsername}
                    </span>
                    {/* Custom weighted dot using the span method for precision */}
                    <span className="w-1 h-1 rounded-full bg-current opacity-60 self-center mx-0.5" />
                    <span className="text-sm">
                      {post.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Post Body Text (Optional - added for layout context) */}
                <p className="text-base-content text-[15px] leading-normal mb-2">
                  {post.content}
                </p>

                {/* Media: Post Image */}
                {post.image && (
                  <div className="max-w-full border border-base-content/20 rounded-2xl overflow-hidden bg-base-200">
                    <div className="relative w-full overflow-hidden">
                      <Image
                        alt="Post content"
                        src={post.image}
                        width={1200}
                        height={675}
                        className="w-full h-auto block object-cover hover:opacity-95 transition-opacity cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons could go here (Reply, Like, etc.) */}
              </div>
            </div>
          ))}
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
