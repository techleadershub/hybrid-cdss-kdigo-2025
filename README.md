# Hybrid CDSS: KDIGO 2025 Anemia Guidelines (Research Prototype)

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Research%20Prototype-orange)
![Tech](https://img.shields.io/badge/tech-Node.js%20%7C%20OpenAI%20%7C%20Vanilla%20JS-blue)

A **hybrid Clinical Decision Support System (CDSS)** that combines **deterministic rule-based algorithms** with a **constrained AI Explainer** to model the [KDIGO 2025 Anemia in CKD Guidelines (Public Review Draft)](https://kdigo.org/).

> **⚠️ ACADEMIC/ENGINEERING DEMO ONLY.**
> This is NOT a medical device. It is based on **DRAFT** guidelines which are subject to change. Do NOT use for clinical care.

## 🌟 Key Features

### 1. Deterministic Rule Engine (The "Safety Core")
- **Zero AI Hallucination Risk**: Dosing logic is pure JavaScript `if/else` logic based strictly on:
  - **Rec 3.2.1**: ESA Initiation logic (Hb ≤ 9.0–10.0 g/dL in CKD G5D).
  - **Rec 3.3.1**: Maintenance targets (Hb < 11.5 g/dL).
  - **Table 7**: Stepwise dosing adjustments (±25% or specific unit steps).
- **Verified Alignment**: Logic has been cross-referenced with the Nov 2024 Public Review Draft PDF.

### 2. AI Rationale Generator (The "Documentation Layer")
- **Read-Only / Explanation-Only**: The AI (GPT-4o) **never** calculates the dose.
- **Strictly Constrained**: It receives the *already computed* rule output and explains *why* that rule triggered using hard-coded KDIGO citations.
- **Safety Prompting**: System instructions explicitly forbid the AI from offering medical advice or changing strict numerical values.

## 🛠️ Architecture

- **Frontend**: Vanilla HTML/CSS/JS (Lightweight, accessible).
- **Backend**: Node.js + Express (Handles secure API calls).
- **AI**: OpenAI API (Server-side to protect keys).

## 🚀 Quick Start

### Prerequisites
- Node.js installed.
- OpenAI API Key.

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR-USERNAME/hybrid-cdss-kdigo-2025.git
    cd hybrid-cdss-kdigo-2025
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root:
    ```env
    OPENAI_API_KEY=sk-your-key-here
    ```

4.  **Run Locally:**
    ```bash
    npm start
    ```
    Visit `http://localhost:3000`.

## 📜 Medical & Legal Disclaimer

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.**

1.  **Not FDA/CE Cleared**: This software has not been evaluated by any regulatory body.
2.  **Draft Guidelines**: Based on the *KDIGO 2025 Public Review Draft*. Final guidelines may differ significantly.
3.  **No Liability**: The authors are not responsible for errors or clinical outcomes. This is an engineering portfolio piece demonstrating **Guidelines-Based Software Engineering (GBSE)** techniques.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
