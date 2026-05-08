export interface PostData {
  id: string;
  authorAvatar: string;
  authorUsername: string;
  content: string;
  image?: string;
  date: Date;
}

export const postItems: PostData[] = [
  {
    id: "post_01",
    authorAvatar:
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    authorUsername: "johndoe497",
    content:
      "Building the MVP for Cleo! Flexbox makes this layout much cleaner.",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    date: new Date(),
  },
  {
    id: "post_02",
    authorAvatar:
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
    authorUsername: "johndoe497",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop",
    date: new Date(),
  },
];
