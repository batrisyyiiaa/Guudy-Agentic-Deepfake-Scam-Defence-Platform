export const TAG_LABEL = {
  sender: 'sender address',
  urgency: 'pressure to act fast',
  link: 'suspicious link',
  info: 'asks for personal info',
  authority: 'pretends to be someone official',
};

export const LESSON = [
  { title: 'Look at the sender', text: 'The name can say anything. Check the actual address. Real banks and schools use their own domain, not odd endings like .top or extra words like "verify".' },
  { title: 'Watch for pressure', text: 'Scammers want you to act before you think: "within 24 hours", "account suspended", "final notice".' },
  { title: 'Do not trust the link', text: 'A link can say one thing and go somewhere else. Open the official app or type the website yourself instead.' },
  { title: 'Never share secrets', text: 'No real bank or employer asks for your password, PIN or OTP/TAC by email. Unexpected attachments and forms are a warning sign too.' },
];

export const QUESTIONS = [
  { fake: true, from: 'security@mybank-verify.top', subject: 'Account suspended: verify within 24 hours', body: 'Dear customer, we detected unusual activity. Your account will be closed unless you confirm your details now.', link: 'http://mybank-login.top/verify', flags: ['sender', 'urgency', 'link'], why: "The address ends in .top and is not the bank's real domain, it threatens closure, and the link goes to an unknown site." },
  { fake: false, from: 'statements@mybank.com.my', subject: 'Your January e-statement is ready', body: 'Open the MyBank app to view your statement. We will never ask for your password or OTP by email.', link: '', flags: [], why: 'Real domain, no pressure, no link to click, and it tells you to use the official app.' },
  { fake: true, from: 'delivery@parcel-my.info', subject: 'Parcel on hold: pay RM2.90 now', body: 'Your parcel could not be delivered. Pay the small fee today or it will be returned.', link: 'http://parcel-my.info/pay', flags: ['sender', 'urgency', 'link'], why: 'Courier scams use a tiny fee, a deadline and a look-alike address to get your card details.' },
  { fake: false, from: 'no-reply@university.edu.my', subject: 'Timetable updated for Semester 2', body: 'Your timetable has changed. Log in to the student portal as usual to see the new schedule.', link: '', flags: [], why: 'Expected message from a real school domain, no pressure and no request for personal details.' },
  { fake: true, from: 'hr@your-company.co', subject: 'Salary adjustment: action required', body: 'Open the attached form and sign in with your email and password to confirm your new salary.', link: 'salary-form.html (attachment)', flags: ['sender', 'authority', 'info'], why: 'It pretends to be HR, uses an unusual domain, and asks you to enter your password in an attachment.' },
];
