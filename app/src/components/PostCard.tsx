import type { Post } from '../types';

interface Props {
  post: Post;
}

export function PostCard({ post }: Props) {
  const date = new Date(post.createdAt);
  const formatted = date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="tag-label">#{post.tag}</span>
        <span className="time">{formatted}</span>
      </div>
      <h3>{post.title}</h3>
      <p className="highlight">{post.favoritePoint}</p>
      {post.detail && <p className="detail">{post.detail}</p>}
    </article>
  );
}
