import Image from "next/image";

interface PostImageProps {
  image?: string;
}

export default function PostImage({ image }: PostImageProps) {
  if (!image) return null;

  return (
    <div className="max-w-full border border-base-content/20 rounded-2xl overflow-hidden bg-base-200">
      <div className="relative w-full overflow-hidden">
        <Image
          alt="Post content"
          src={image}
          width={1200}
          height={675}
          className="w-full h-auto block object-cover"
        />
      </div>
    </div>
  );
}
