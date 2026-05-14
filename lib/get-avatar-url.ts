export function getAvatarUrl(username: string, avatarUrl?: string | null) {
  return (
    avatarUrl ||
    `https://api.dicebear.com/9.x/dylan/svg?seed=${encodeURIComponent(username)}`
  );
}
