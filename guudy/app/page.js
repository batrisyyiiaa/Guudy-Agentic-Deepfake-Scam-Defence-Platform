import Link from 'next/link';
import Blob from '../components/Blob';

const items = [
  { href: '/check', title: 'Check', text: 'Upload a voice note, video or photo you are unsure about.', color: '#2e9e6b', mood: 'calm' },
  { href: '/learn', title: 'Learn', text: 'Short lessons, then a real or fake quiz.', color: '#e8512b', mood: 'happy' },
  { title: 'Chat', text: 'Ask Guudy about a scam. Coming next.', color: '#2f6fd0', mood: 'calm' },
  { title: 'Report', text: 'Get a summary ready for NSRC 997 and other channels. Coming next.', color: '#d6347f', mood: 'unsure' },
];

export default function Home() {
  return (
    <>
      <h1 className="logo">Guudy</h1>
      <p className="tag">Check it. Understand it. Stay one step ahead of scams.</p>
      {items.map((it) => {
        const inner = (
          <>
            <h2>{it.title}</h2>
            <p>{it.text}</p>
            <Blob mood={it.mood} color={it.color} />
          </>
        );
        return it.href ? (
          <Link key={it.title} href={it.href} className="card" style={{ background: it.color }}>{inner}</Link>
        ) : (
          <div key={it.title} className="card off" style={{ background: it.color }}>{inner}</div>
        );
      })}
    </>
  );
}
