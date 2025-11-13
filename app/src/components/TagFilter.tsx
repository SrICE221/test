import type { MoodTag } from '../types';

interface Props {
  active: MoodTag | 'すべて';
  onChange: (tag: MoodTag | 'すべて') => void;
}

const options: (MoodTag | 'すべて')[] = ['すべて', '推し活', '日常', '趣味', '学び', 'その他'];

export function TagFilter({ active, onChange }: Props) {
  return (
    <div className="tag-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={option === active ? 'chip active' : 'chip'}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
