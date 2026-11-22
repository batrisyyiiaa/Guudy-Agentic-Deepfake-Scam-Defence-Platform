export default function Blob({ mood = 'happy', color = '#2e9e6b', className = 'blob' }) {
  const mouths = {
    happy: <path d="M42 72 Q60 90 78 72" stroke="#231d4f" strokeWidth="5" fill="none" strokeLinecap="round" />,
    calm: <path d="M46 74 Q60 82 74 74" stroke="#231d4f" strokeWidth="5" fill="none" strokeLinecap="round" />,
    unsure: <ellipse cx="60" cy="76" rx="7" ry="4" fill="#231d4f" />,
    alarm: <ellipse cx="60" cy="78" rx="9" ry="11" fill="#231d4f" />,
  };
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M60 8C95 8 112 40 108 72C104 104 82 114 60 114C34 114 10 104 12 72C14 40 28 8 60 8Z" fill={color} />
      <circle cx="44" cy="50" r="10" fill="#fff" /><circle cx="76" cy="50" r="10" fill="#fff" />
      <circle cx="45" cy="52" r="5" fill="#231d4f" /><circle cx="75" cy="52" r="5" fill="#231d4f" />
      {mouths[mood]}
      {mood === 'unsure' && <path d="M100 18C94 28 92 34 100 38C108 34 106 28 100 18Z" fill="#6fb6ff" />}
    </svg>
  );
}
