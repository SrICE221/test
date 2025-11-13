export type MoodTag = '推し活' | '日常' | '趣味' | '学び' | 'その他';

export interface Post {
  id: string;
  title: string;
  detail: string;
  tag: MoodTag;
  createdAt: string;
  favoritePoint: string;
}
