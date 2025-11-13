import { useEffect, useState } from 'react';
import type { Post } from '../types';

const STORAGE_KEY = 'sukisuki-posts';

const demoPosts: Post[] = [
  {
    id: 'demo-1',
    title: '北欧インテリア',
    favoritePoint: '朝日と馴染む淡い色の木目に心が落ち着く',
    detail: 'ミニマルなのに温かさがあって、毎日の暮らしを丁寧にしてくれる。',
    tag: '日常',
    createdAt: new Date().toISOString()
  },
  {
    id: 'demo-2',
    title: 'シンセの低音',
    favoritePoint: '鼓動みたいに身体を包む立体感',
    detail: 'ライブで浴びた瞬間に涙が出るほどグッと来た。',
    tag: '趣味',
    createdAt: new Date().toISOString()
  }
];

export function useLocalPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setPosts(JSON.parse(raw));
        return;
      } catch (error) {
        console.error('Failed to parse stored posts', error);
      }
    }
    setPosts(demoPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const addPost = (post: Post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return { posts, addPost };
}
