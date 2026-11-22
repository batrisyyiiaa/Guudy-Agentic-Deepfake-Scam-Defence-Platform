'use client';
import { useState } from 'react';
import Link from 'next/link';
import Blob from '../../components/Blob';

const LOOK = {
  low: { label: 'Low risk', color: '#2e9e6b', mood: 'calm' },
  medium: { label: 'Be careful', color: '#e8512b', mood: 'unsure' },
  high: { label: 'High risk', color: '#b3261e', mood: 'alarm' },
};

export default function Check() {
  const [file, setFile] = useState(null);
  const [context, setContext] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState(null);
  const [approved, setApproved] = useState({});

  async function run() {
    setBusy(true); setError(''); setReport(null); setApproved({});
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('context', context);
      const res = await fetch('/api/analyze', { method: 'POST', body });
      if (!res.ok) throw new Error();
      setReport(await res.json());
    } catch {
      setError('The check failed. Try a smaller file or try again.');
    }
    setBusy(false);
  }

  const look = report && LOOK[report.risk];

  return (
    <>
      <Link href="/" className="back">&larr; Home</Link>
      {!report && (
        <div className="sheet">
          <h2>Check something suspicious</h2>
          <label>Voice note, video or photo
            <input type="file" accept="audio/*,video/*,image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
          </label>
          <label style={{ display: 'block', marginTop: 12 }}>What happened? (optional)
            <textarea rows={3} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Example: My son says he is in trouble and needs money now." />
          </label>
          <label style={{ display: 'block', marginTop: 12 }}>
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /> I agree to upload this file for checking. It is deleted after the check.
          </label>
          <button className="btn" disabled={!file || !consent || busy} onClick={run}>{busy ? 'Checking...' : 'Check this file'}</button>
          {error && <p className="bad">{error}</p>}
        </div>
      )}

      {report && (
        <>
          <div className={`banner ${report.risk}`}>
            <Blob mood={look.mood} color="rgba(255,255,255,.35)" />
            <div><h2>{look.label}</h2><p>Confidence: {report.confidence}</p></div>
          </div>
          {report.mock && <p className="note">Demo result. Detection models are not connected yet.</p>}

          <div className="sheet">
            <h2>What we found</h2>
            <ul>{report.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
            {report.tactics.length > 0 && (<><h3>Scam tactics</h3><ul>{report.tactics.map((t) => <li key={t}>{t}</li>)}</ul></>)}
            <p className="note">{report.limitations}</p>
          </div>

          <div className="sheet">
            <h2>Drafted actions</h2>
            <p>Nothing is sent. Review each one and approve it first.</p>
            {report.drafts.map((d) => (
              <div className="draft" key={d.title}>
                <strong>{d.title}</strong>{'\n'}{d.text}
                {approved[d.title] ? (
                  <button className="btn alt" onClick={() => navigator.clipboard?.writeText(d.text)}>Approved. Copy text</button>
                ) : (
                  <button className="btn" onClick={() => setApproved({ ...approved, [d.title]: true })}>Approve</button>
                )}
              </div>
            ))}
          </div>
          <button className="btn alt" onClick={() => setReport(null)}>Check another file</button>
        </>
      )}
    </>
  );
}
