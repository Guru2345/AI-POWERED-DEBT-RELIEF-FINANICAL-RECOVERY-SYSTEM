import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { readDB, writeDB } from "./db";
import { initGemini } from "./gemini";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// APIs
app.get("/api/loans", async (req, res) => {
  const db = await readDB();
  res.json(db.loans);
});

app.post("/api/loans", async (req, res) => {
  const db = await readDB();
  const newLoan = { id: Date.now().toString(), ...req.body };
  db.loans.push(newLoan);
  await writeDB(db);
  res.json(newLoan);
});

app.delete("/api/loans/:id", async (req, res) => {
  const db = await readDB();
  db.loans = db.loans.filter((l: any) => l.id !== req.params.id);
  await writeDB(db);
  res.json({ success: true });
});

app.post("/api/chat", async (req, res) => {
  try {
    const gemini = initGemini();
    if (!gemini) return res.status(500).json({ error: "Gemini API key not configured" });

    const { message, history, context } = req.body;
    
    const systemInstruction = `You are a helpful, empathetic financial wellness advisor helping a user with challenging financial obligations. 
    User context: ${JSON.stringify(context)}. 
    Provide actionable, realistic guidance on debt negotiation, hardship assistance programs, and budget optimization. Keep responses concise and supportive.`;

    const chat = gemini.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
      },
    });

    let responseText = "";
    if (history && history.length > 0) {
       const formattedHistory = history.map((h: any) => `${h.role}: ${h.text}`).join('\n');
       const prompt = `Previous conversation:\n${formattedHistory}\n\nUser: ${message}\nAssistant:`;
       const response = await gemini.models.generateContent({
         model: "gemini-3.5-flash",
         contents: prompt,
         config: { systemInstruction }
       });
       responseText = response.text;
    } else {
       const response = await chat.sendMessage({ message });
       responseText = response.text;
    }

    res.json({ text: responseText });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/generate-letter", async (req, res) => {
  try {
    const gemini = initGemini();
    if (!gemini) return res.status(500).json({ error: "Gemini API key not configured" });

    const { type, creditor, amount, hardshipReason, tone = 'Formal' } = req.body;
    
    const prompt = `Draft a professional ${type} correspondence to a financial institution. 
    Tone: ${tone}
    Institution Name: ${creditor}
    Outstanding Amount: ${amount}
    Reason for Financial Hardship: ${hardshipReason}
    
    The correspondence should be structured, clearly state the financial difficulty, and make a reasonable request for negotiated settlement, payment deferment, or interest reduction depending on the type. Do not include placeholders like [Your Name] unless absolutely necessary. Return the plain text response without markdown formatting if possible.`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ letter: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/project/backup", async (req, res) => {
  try {
    const filesToBackup = [
      "package.json",
      "tsconfig.json",
      "vite.config.ts",
      "backend/server.ts",
      "backend/db.ts",
      "backend/gemini.ts",
      "frontend/index.html",
      "frontend/src/main.tsx",
      "frontend/src/App.tsx",
      "frontend/src/index.css",
      "frontend/src/types.ts",
      "frontend/src/components/Dashboard.tsx",
      "frontend/src/components/EMICalculator.tsx",
      "frontend/src/components/SettlementPredictor.tsx",
      "frontend/src/components/LetterGenerator.tsx",
      "frontend/src/components/ChatAssistant.tsx",
      "frontend/src/components/Reports.tsx",
      "frontend/src/components/BudgetPlanner.tsx",
      "frontend/src/components/Architecture.tsx"
    ];

    let consolidatedCode = `==================================================\n`;
    consolidatedCode += `CREDITFLOW PRO ENTERPRISE PLATFORM - CODEBASE BACKUP\n`;
    consolidatedCode += `Generated on: ${new Date().toISOString()}\n`;
    consolidatedCode += `==================================================\n\n`;

    for (const relativePath of filesToBackup) {
      const fullPath = path.join(process.cwd(), relativePath);
      try {
        const content = await fs.readFile(fullPath, "utf-8");
        consolidatedCode += `\n\n--- FILE: ${relativePath} ---\n`;
        consolidatedCode += `\`\`\`typescript\n`;
        consolidatedCode += content;
        consolidatedCode += `\n\`\`\`\n`;
      } catch (err: any) {
        consolidatedCode += `\n\n--- FILE: ${relativePath} (Error reading file) ---\n`;
        consolidatedCode += `${err.message}\n`;
      }
    }

    res.json({ content: consolidatedCode, filename: "Project Drive Create.txt" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Vite Middleware for Development / Static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
