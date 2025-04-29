import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoute from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
//helmet helps to improve the security of your web application by setting various HTTP headers.
app.use(morgan("dev")); //log the requests in console
app.use(express.json()); //extracts json
app.use(cors()); //for not gettig cors error in client side

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, //specifies each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot access denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    //check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: "Spoofed Bot detected" });
      return;
    }
    next();
  } catch (error) {
    console.log("acrjet error: ", error);
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.use("/api/products", productRoute);

// app.listen(PORT, () => {
//   console.log(`server is running on this port ${PORT}`);
// });

async function initializeDB() {
  try {
    await sql`
        CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    console.log("DB initialized successfully");
  } catch (error) {
    console.log("Error while initializing DB", error);
  }
}

initializeDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running in the PORT " + PORT);
  });
});
