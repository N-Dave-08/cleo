// =======================
// CORE POST TYPES
// =======================

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
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
};

// =======================
// MAIN POST MODEL
// =======================

export type Post = {
  id: string;
  content: string;
  created_at: string;

  profiles: PostProfile;
  post_images: PostImage[];
  likes: PostLike[];
  comments: PostComment[];
};
