import { FormEvent, useState } from 'react';
import type { MoodTag, Post } from '../types';

interface Props {
  onSubmit: (post: Post) => void;
}

const tags: MoodTag[] = ['推し活', '日常', '趣味', '学び', 'その他'];

export function PostForm({ onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [favoritePoint, setFavoritePoint] = useState('');
  const [detail, setDetail] = useState('');
  const [tag, setTag] = useState<MoodTag>('推し活');

  const canSubmit = title.trim() && favoritePoint.trim();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;

    const now = new Date().toISOString();

    onSubmit({
      id: crypto.randomUUID(),
      title: title.trim(),
      favoritePoint: favoritePoint.trim(),
      detail: detail.trim(),
      tag,
      createdAt: now
    });

    setTitle('');
    setFavoritePoint('');
    setDetail('');
    setTag('推し活');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>今日も「すき」を残そう</h2>
        <p>一番刺さったポイントや余韻を短くメモできます。</p>
      </div>
      <label>
        タイトル
        <input
          type="text"
          placeholder="例: 深夜に飲むチャイ"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        いちばん好きなところ
        <textarea
          placeholder="温かさがほどける感じ、とか"
          value={favoritePoint}
          onChange={(e) => setFavoritePoint(e.target.value)}
          rows={3}
          required
        />
      </label>
      <label>
        メモ（任意）
        <textarea
          placeholder="背景やストーリーを自由に"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
        />
      </label>
      <label className="tag-field">
        タグ
        <div className="tag-options">
          {tags.map((option) => (
            <button
              type="button"
              key={option}
              className={option === tag ? 'tag active' : 'tag'}
              onClick={() => setTag(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </label>
      <button type="submit" className="primary" disabled={!canSubmit}>
        投稿する
      </button>
    </form>
  );
}
