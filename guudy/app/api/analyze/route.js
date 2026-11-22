// DEMO ONLY: this returns a mock report. Replace with the real agents and detection APIs.
// The uploaded file is read but never stored.
export async function POST(req) {
  const form = await req.formData();
  const file = form.get('file');
  const context = String(form.get('context') || '');
  const kind = file?.type?.startsWith('audio') ? 'voice note' : file?.type?.startsWith('video') ? 'video' : 'photo';

  const rules = [
    [/urgent|now|immediately|quick|asap/i, 'Urgency: pushes you to act before you can check.'],
    [/money|transfer|bank|pay|loan|rm\s?\d/i, 'Payment request: asks for money or banking details.'],
    [/secret|don'?t tell|do not tell/i, 'Secrecy: tells you not to ask anyone else.'],
    [/police|officer|boss|ceo|bank negara|mother|father|son|daughter/i, 'Impersonation: claims to be someone you trust or fear.'],
  ];
  const tactics = rules.filter(([re]) => re.test(context)).map(([, t]) => t);
  const risk = tactics.length >= 2 ? 'high' : tactics.length === 1 ? 'medium' : 'low';

  return Response.json({
    mock: true,
    kind,
    risk,
    confidence: 'Low (demo)',
    evidence: [
      'Detection models are not connected yet, so this report is a demo.',
      tactics.length ? 'The description you wrote contains scam warning signs.' : 'No scam warning signs were found in the description.',
    ],
    tactics,
    limitations: 'Results are estimates, not proof. Always verify through a number or channel you already trust.',
    drafts: [
      { title: 'Warning message', text: `Hi, I received a suspicious ${kind} that looks like it is from you. Please do not send money. Call me on your normal number to confirm it is really you.` },
      { title: 'Questions to ask the caller', text: '1. What is something only we would know?\n2. Can I call you back on your usual number?\n3. Why can it not wait until I verify?' },
      { title: 'Report summary', text: `Received a suspicious ${kind}. Description: ${context || '(none)'}. Warning signs: ${tactics.length ? tactics.join(' ') : 'none noted'}. I did not send any money or information.` },
    ],
  });
}
