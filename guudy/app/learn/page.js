'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Blob from '../../components/Blob';
import { LESSON, QUESTIONS, TAG_LABEL } from '../../data/module1';

export default function Learn() {
  const [stage, setStage] = useState('list'); // list | lesson | quiz | result
  const [step, setStep] = useState(0);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState([]);
  const [saved, setSaved] = useState({ xp: 0, miss: {} });

  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem('guudy') || 'null'); if (s) setSaved(s); } catch {}
  }, []);

  function start() { setStage('lesson'); setStep(0); setI(0); setPicked(null); setScore(0); setMissed([]); }

  function answer(choice) {
    if (picked !== null) return;
    const q = QUESTIONS[i];
    setPicked(choice);
    if ((choice === 'fake') === q.fake) setScore((s) => s + 1);
    else setMissed((m) => [...m, ...q.flags]);
  }

  function next() {
    if (i + 1 < QUESTIONS.length) { setI(i + 1); setPicked(null); return; }
    const miss = { ...saved.miss };
    missed.forEach((t) => { miss[t] = (miss[t] || 0) + 1; });
    const s = { xp: saved.xp + score * 10, miss };
    setSaved(s);
    try { localStorage.setItem('guudy', JSON.stringify(s)); } catch {}
    setStage('result');
  }

  const weakest = Object.entries(saved.miss).sort((a, b) => b[1] - a[1])[0];
  const q = QUESTIONS[i];
  const right = picked !== null && (picked === 'fake') === q.fake;

  return (
    <>
      <Link href="/" className="back">&larr; Home</Link>

      {stage === 'list' && (
        <>
          <h1 className="logo" style={{ fontSize: '2.4rem' }}>Learn</h1>
          <p className="tag">You have {saved.xp} XP.</p>
          <button className="card" style={{ background: '#2f6fd0', width: '100%', border: 0, textAlign: 'left', cursor: 'pointer' }} onClick={start}>
            <h2>Spot the scam email</h2>
            <p>Learn the warning signs, then try 5 emails.</p>
            <Blob mood="happy" color="#5b94ea" />
          </button>
          <div className="card off" style={{ background: '#e8512b' }}><h2>Fake ads and news</h2><p>Coming next.</p><Blob mood="calm" color="#f08a5d" /></div>
          <div className="card off" style={{ background: '#d6347f' }}><h2>Bank and shopping messages</h2><p>Coming next.</p><Blob mood="unsure" color="#e86aa6" /></div>
          {weakest && <p className="note">Your most missed warning sign: {TAG_LABEL[weakest[0]]}.</p>}
        </>
      )}

      {stage === 'lesson' && (
        <div className="sheet">
          <p className="note">Lesson {step + 1} of {LESSON.length}</p>
          <h2>{LESSON[step].title}</h2>
          <p>{LESSON[step].text}</p>
          <button className="btn" onClick={() => (step + 1 < LESSON.length ? setStep(step + 1) : setStage('quiz'))}>
            {step + 1 < LESSON.length ? 'Next' : 'Start the quiz'}
          </button>
        </div>
      )}

      {stage === 'quiz' && (
        <div className="sheet">
          <p className="note">Email {i + 1} of {QUESTIONS.length}</p>
          <div className="mail" role="img" aria-label="Sample email">
            <small>From: {q.from}</small>
            <small>Subject: {q.subject}</small>
            <p>{q.body}</p>
            {q.link && <span className="lnk">{q.link}</span>}
          </div>
          {picked === null ? (
            <div className="row">
              <button className="btn" onClick={() => answer('real')}>Real</button>
              <button className="btn" onClick={() => answer('fake')}>Fake</button>
            </div>
          ) : (
            <>
              <p className={right ? 'good' : 'bad'}>{right ? 'Correct.' : 'Not quite.'} This email is {q.fake ? 'fake' : 'real'}.</p>
              <p>{q.why}</p>
              {q.flags.map((t) => <span className="pill" key={t}>{TAG_LABEL[t]}</span>)}
              <button className="btn" onClick={next}>{i + 1 < QUESTIONS.length ? 'Next email' : 'See my result'}</button>
            </>
          )}
        </div>
      )}

      {stage === 'result' && (
        <div className="sheet">
          <h2>You got {score} of {QUESTIONS.length}</h2>
          <p>+{score * 10} XP. Total: {saved.xp} XP.</p>
          {missed.length > 0 && (
            <p>Warning signs to practise: {[...new Set(missed)].map((t) => <span className="pill" key={t}>{TAG_LABEL[t]}</span>)}</p>
          )}
          <button className="btn" onClick={start}>Try again</button>
          <button className="btn alt" onClick={() => setStage('list')}>Back to modules</button>
        </div>
      )}
    </>
  );
}
