# Guudy — Agentic Deepfake & Scam Defence Platform

Built for the **GDEX × ANON × UTAR Hackathon**, Guudy is an agentic AI web application designed to detect synthetic media, explain online scam tactics in plain language, generate guided incident reports, and provide interactive anti-scam training[cite: 4, 5].

---

## Overview

As AI-generated voices, videos, and images make online impersonation scams more convincing, standard detection tools often return a binary "real" or "fake" label without explaining the underlying warning signs or guiding users on next steps[cite: 4, 5]. 

Guudy combines multimodal media forensics with structured user guidance—helping users assess suspicious audio, images, and videos, generate editable reports for official Malaysian response channels, and build long-term scam awareness[cite: 4, 5, 6].

---

## Core Features

* **Check (Multimodal Media Analysis):** Upload suspicious audio, images, or video with optional context to receive a structured investigation report containing a risk level, confidence estimate, supporting evidence, and model limitations.
* **Chat (AI Scam Assistant):** Ask follow-up questions grounded in the generated investigation report and verified anti-scam guidance (such as whether a bank would request an OTP)[cite: 5, 6].
* **Report (Guided Incident Reporting):** Produces an editable case summary and directs users to appropriate reporting channels, including **NSRC 997**, **MCMC**, **PDRM Semak Mule**, and local police.
* **Learn (Adaptive Awareness Coach):** Interactive lessons and image-based Real/Fake quizzes covering phishing emails, fake advertisements/news, and fraudulent bank or shopping messages, complete with instant feedback, XP, badges, and weak-topic recommendations[cite: 5, 6].

---

## Agentic AI Workflow

Guudy coordinates six specialised stages rather than relying on a single classifier[cite: 5]:

1. **Input & Routing:** Receives uploaded media and context, routing tasks to the relevant forensic agents[cite: 5].
2. **Media Forensics Analysis:**
   * **Voice Forensics Agent:** Evaluates audio for indicators of synthetic speech[cite: 5].
   * **Image Forensics Agent:** Uses CNN-based classification to examine facial manipulation, unnatural textures, blending boundaries, and lighting inconsistencies[cite: 5].
   * **Video Forensics Agent:** Analyses sampled frames, lip-sync alignment, temporal consistency, and **remote photoplethysmography (rPPG)** blood-flow signals across facial regions[cite: 5].
3. **Scam Interpretation:** The Context & Manipulation Agent identifies social engineering tactics such as urgency, fear, authority impersonation, secrecy, and suspicious payment requests[cite: 5].
4. **Report Generation:** The Orchestrator synthesises forensic and contextual findings into an explainable report with confidence scores and limitations[cite: 5, 6].
5. **Safety Guidance:** The Safety Guidance Agent prepares verification questions, warning messages, and draft reporting summaries for user review[cite: 5].
6. **Follow-Up & Learning:** The Chatbot Agent handles follow-up queries while the Adaptive Coach recommends targeted modules based on frequently missed warning signs[cite: 5].

---

## Tech Stack & Project Structure

* **Framework:** Next.js (App Router) & React[cite: 6, 7]
* **Backend / Deployment:** Vercel Serverless API Routes[cite: 6]
* **AI & Forensics Pipeline:** LLM Agent Orchestration, CNN Image Forensics, rPPG Video Signal Analysis[cite: 5, 6]
* **Data & Storage:** Structured JSON learning modules, browser-based progress tracking, and transient media handling with automatic deletion[cite: 6]

```text
guudy/
├── app/
│   ├── api/analyze/route.js   # Serverless analysis & agent orchestration endpoint
│   ├── check/page.js          # Media upload & investigation report interface
│   ├── learn/page.js          # Adaptive scam awareness modules & quizzes
│   ├── globals.css            # Global styling
│   ├── layout.js              # Root application layout
│   └── page.js                # Landing page & navigation
├── components/
│   └── Blob.js                # Interactive UI visual component
├── data/
│   └── module1.js             # Structured anti-scam quiz & lesson dataset
├── package.json
└── README.md
```[cite: 6, 7]

---

## Privacy, Safeguards & Limitations

* **Privacy-First Design:** Requires explicit user consent prior to upload, enforces HTTPS, minimises data retention, and automatically deletes uploaded media after processing[cite: 6].
* **Human-in-the-Loop:** Never requests sensitive credentials (OTPs, PINs, or passwords) and never submits external reports without explicit user approval[cite: 6].
* **Transparent Limitations:** Deepfake detection and rPPG pulse analysis can be affected by low video resolution, heavy compression, poor lighting, or rapid head movement[cite: 6]. Every report includes confidence estimates and encourages independent verification[cite: 6].

---

## Getting Started

```bash
# 1. Clone the repository
git clone [https://github.com/batrisyyiiaa/guudy.git](https://github.com/batrisyyiiaa/guudy.git)
cd guudy

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env.local file and add your LLM / inference API keys

# 4. Run the development server
npm run dev
