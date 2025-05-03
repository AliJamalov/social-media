export type User = {
  _id: string;
  username: string;
  bio: string;
  password: string;
  avatar: string;
  isPrivate: boolean;
  savedPosts: string[];
  followers: string[];
  following: string[];
  followRequests: string[];
  likedPosts: string[];
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Post = {
  _id: string;
  user: User;
  image: string;
  description: string;
  tags: string[];
  views: number[];
  likes: number;
  taggedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  _id: string;
  user: User;
  post: Post;
  likes: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Notification = {
  _id: string;
  sender: User;
  receiver: User;
  text: string;
  type: "like" | "comment" | "follow";
  post?: Post;
  createdAt: Date;
  updatedAt: Date;
};

export type Story = {
  _id: string;
  user: User;
  image: string;
  viewers: string[];
  text: string | null;
  createdAt: Date;
};
