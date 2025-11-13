import { useMemo, useState } from 'react';
import { PostCard } from './components/PostCard';
import { PostForm } from './components/PostForm';
import { TagFilter } from './components/TagFilter';
import { useLocalPosts } from './hooks/useLocalPosts';
import type { MoodTag } from './types';

function App() {
  const { posts, addPost } = useLocalPosts();
  const [activeTag, setActiveTag] = useState<MoodTag | 'すべて'>('すべて');
  const filtered = useMemo(
    () =>
      activeTag === 'すべて'
        ? posts
        : posts.filter((post) => post.tag === activeTag),
    [posts, activeTag]
  );

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">すきなもの、すきなところだけ。</p>
        <h1>すきすきノート</h1>
        <p className="subtitle">
          余白のあるSNS。ふと感じた「ここが好き！」をためておく場所です。
        </p>
      </header>
      <main>
        <section className="panel left">
          <PostForm onSubmit={addPost} />
        </section>
        <section className="panel right">
          <div className="list-header">
            <div>
              <p className="eyebrow">みんなの「すき」ログ</p>
              <h2>最近の投稿</h2>
            </div>
            <TagFilter active={activeTag} onChange={setActiveTag} />
          </div>
          <div className="post-grid">
            {filtered.length === 0 ? (
              <p className="empty">まだ投稿がありません。最初の一歩をぜひ！</p>
            ) : (
              filtered.map((post) => <PostCard key={post.id} post={post} />)
            )}
          </div>
        </section>
      </main>
      <footer>
        <p>データは端末に保存されます。気軽に心のスパークを書き留めてください。</p>
      </footer>
    </div>
  );
}

export default App;
