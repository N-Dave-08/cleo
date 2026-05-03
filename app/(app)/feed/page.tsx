"use client";

import { Home, LucideIcon, Settings } from "lucide-react";
import Post from "./_components/post";
import { PostData } from "./_types/post";
import Drawer from "@/components/ui/drawer";

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

const postItems: PostData[] = [
  {
    id: "post_01",
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
    id: "post_02",
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
  return (
    <>
      {/* sidebar */}
      <Drawer>
        {/* Main Post Container */}
        {postItems.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            authorAvatar={post.authorAvatar}
            authorName={post.authorName}
            authorUsername={post.authorUsername}
            content={post.content}
            image={post.image}
            date={post.date}
          />
        ))}
      </Drawer>
    </>
  );
}
