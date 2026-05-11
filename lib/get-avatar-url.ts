export function getAvatarUrl(username: string, avatarUrl?: string | null) {
  return (
    avatarUrl ||
    `https://api.dicebear.com/9.x/open-peeps/svg?seed=${encodeURIComponent(username)}`
  );
}
