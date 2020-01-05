import express from "express";
import connectDB from "./config/db";

import users from "./routes/api/users";
import auth from "./routes/api/auth";
import profile from "./routes/api/profile";
import posts from "./routes/api/posts";

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("running...");
});

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} ...`));
