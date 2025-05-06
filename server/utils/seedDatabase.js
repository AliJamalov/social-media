import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Post from "../models/post.model.js";
import dotenv from "dotenv";

dotenv.config();

const stathamUserId = new mongoose.Types.ObjectId("681a713325115bb899e6777d");

const data = [
  {
    user: stathamUserId,
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1746564027/images_8_j1o2hz.jpg",
    description: "Не важно, сколько их. Важно, кто с ними. 💣",
    tags: ["jasonstatham", "quote", "power"],
    views: 41000,
    likes: 8400,
    taggedUsers: [],
  },
  {
    user: stathamUserId,
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1746564076/Jason-Statham-768x1149_t8qndy.jpg",
    description: "Я не предупреждаю дважды. Да и первый раз — редко. 🚗💥",
    tags: ["action", "thetransporter", "attitude"],
    views: 62000,
    likes: 10300,
    taggedUsers: [],
  },
];

const seedData = async () => {
  try {
    console.log("⏳ Подключение к базе данных...");
    await connectDB();

    console.log("📝 Добавление новых постов...");
    await Post.insertMany(data);

    console.log("✅ Посты для Джона Джонса успешно добавлены!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных:", error);
    mongoose.connection.close();
  }
};

seedData();
