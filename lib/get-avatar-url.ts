export function getAvatarUrl(username: string, avatarUrl?: string | null) {
  return (
    avatarUrl ||
    `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(username)}`
  );
}
