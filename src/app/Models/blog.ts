export interface Blog {
  blogId: number;
  blogTitle: string;
  tags: string[];
  blogImage: string;
  blogImageFileName: string;
  bloggrUserName?: string;
  bloggerUserId?: number;
  bloggerImage?: string;
  bloggerName?: string;
  createdAt: string;
  description: string;
}
