import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { validateLoginInput } from "../shared/loginValidation.js";

const app = express();
app.use(cors());
app.use(express.json());

// 🔧 Necesario para __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 Servir carpeta frontend
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/shared", express.static(path.join(__dirname, "../shared")));

const USERS = [
  { email: "admin@test.com", password: "Admin123!" }
];

// 🔗 Ruta raíz → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const validationError = validateLoginInput(email, password);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const user = USERS.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.json({ success: true });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});