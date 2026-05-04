interface PostHeaderProps {
  authorName: string;
  authorUsername: string;
  date: Date;
}

export default function PostHeader({
  authorName,
  authorUsername,
  date,
}: PostHeaderProps) {
  return (
    <div className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
      <span className="font-semibold text-base-content text-sm truncate">
        {authorName}
      </span>
      <div className="flex items-center gap-1 text-accent/60">
        <span className="text-sm truncate">{authorUsername}</span>
        {/* Custom weighted dot using the span method for precision */}
        <span className="w-1 h-1 rounded-full bg-current opacity-60 self-center mx-0.5" />
        <span className="text-sm">{date.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
