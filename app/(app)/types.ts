export type PostImage = {
  id: string;
  image_url: string;
  position: number;
};

export type PostProfile = {
  username: string;
  avatar_url: string | null;
};

export type PostLike = {
  user_id: string;
};

export type PostComment = {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: PostProfile | null;
};

export type Post = {
  id: string;
  content: string;
  created_at: string;

  profiles: PostProfile;
  post_images: PostImage[];
  likes: PostLike[];
  comments: PostComment[];
};
