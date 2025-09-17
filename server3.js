import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

const app = express();
app.use(express.json()); // to parse JSON body

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Schema & Model
const userSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
});

const userModel = mongoose.model("Users", userSchema, "Users");

// ============ ROUTES ============

// Create user
app.post("/addUser", async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all users
app.get("/getUsers", async (req, res) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user by ID
app.put("/updateUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ============ SERVER ============
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
