const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const { z } = require('zod');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-kdigo2025-final-accessible.html'));
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const KDIGO_BULLETS = `
- Recommendation 3.2.1 (CKD G5D): Initiate ESA when Hb is between 9.0 and 10.0 g/dL.
- Recommendation 3.3.1: In adults, target Hb < 11.5 g/dL.
- Table 7: Initial epoetin alfa/beta dose: 50-100 units/kg/dose, 3x/week.
- Table 7: Initial darbepoetin dose: 0.45 mcg/kg/week or 0.75 mcg/kg every 2 weeks.
- Table 7: Initial Mircera dose: 0.6 mcg/kg every 2 weeks.
- Practice Point 3.4.1.2: Avoid adjusting ESA dose more frequently than every 4 weeks.
- Practice Point 3.4.1.2 Exception: If Hb increases by > 1.0 g/dL in 2-4 weeks after initiation, reduce dose by 25-50%.
- Practice Point 3.4.1.3: Use the lowest ESA dose to achieve and maintain Hb goals.
- Table 7 Adjustment: If Hb rise < 1.0 g/dL over 4 weeks, increase dose (+25% or specific amount).
- Table 7 Adjustment: If Hb rise > 2.0 g/dL over 4 weeks, decrease dose (-25% or specific amount).
`;

const RequestSchema = z.object({
  inputs: z.object({
    hemoglobin: z.number(),
    prevHb: z.number().nullable().optional(),
    currentDose: z.number().nullable().optional(),
    esaAgent: z.string(),
    weight: z.number(),
    weeksSinceChange: z.number().nullable().optional(),
  }),
  ruleOutput: z.object({
    weeklyDose: z.number(),
    perDose: z.number(),
    unit: z.string(),
    note: z.string(),
  })
});

app.post('/api/kdigo-rationale', async (req, res) => {
  try {
    const { inputs, ruleOutput } = RequestSchema.parse(req.body);

    const prompt = `
System:
You are a constrained documentation assistant. You explain rule-based outputs using KDIGO guideline language only.

Developer:
You must not provide medical advice, change values, calculate doses, or introduce new recommendations.

User:
Provide:
- Structured inputs: ${JSON.stringify(inputs)}
- Deterministic rule outputs: ${JSON.stringify(ruleOutput)}
- KDIGO basis bullets (hard-coded):
${KDIGO_BULLETS}

Output format:
Title: "KDIGO-Aligned Rationale"
4–6 concise sentences explaining WHY the rule utilized the specific KDIGO bullet points based on the patient's Hb, trend, and timing.
Final disclaimer line:
"This explanation does not modify the underlying rule-based recommendation."
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1, 
    });

    let explanation = completion.choices[0].message.content || "No explanation generated.";

    // Simple safeguard to ensure we return explanation text only without markdown code blocks if AI adds them
    explanation = explanation.replace(/```/g, ""); 

    res.json({ explanation });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid inputs", details: error.errors });
    }
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate rationale" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
