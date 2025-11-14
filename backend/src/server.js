import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import User from "./models/User.js"; // ADD THIS IMPORT

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import webhookRoutes from "./routes/webhookRoutes.js";

const app = express();

const __dirname = path.resolve();

// 🔥 Webhook routes FIRST (before express.json)
app.use("/api/webhooks", webhookRoutes);

// 🔥 ADD MANUAL USER CREATION ROUTE HERE
app.post("/api/create-user", express.json(), async (req, res) => {
  try {
    const { clerkId, email, name, profileImage } = req.body;
    
    console.log("👤 Creating user manually:", email);
    
    // Check if user already exists
    let user = await User.findOne({ clerkId });
    
    if (user) {
      console.log("✅ User already exists:", user.email);
      return res.json({ success: true, user, message: "User already exists" });
    }
    
    // Create new user in MongoDB
    user = await User.create({
      clerkId,
      email,
      name,
      profileImage
    });
    
    console.log("✅ User created successfully:", user.email);
    res.json({ success: true, user });
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Then other middleware
app.use(express.json());
// credentials:true meaning?? => server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => console.log("Server is running on port:", ENV.PORT));
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();