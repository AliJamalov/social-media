import mongoose from "mongoose";
import { connectDB } from "../lib/db.js";
import Post from "../models/post.model.js";
import dotenv from "dotenv";

dotenv.config();

const data = [
  {
    user: "67f95c88b31d4c10f8d05bae",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744919645/gameEnd_afpxft.jpg",
    description: "Enjoying a sunny day at the beach 🌞",
    tags: ["beach", "sun", "vacation"],
    taggedUsers: [],
    views: 120,
    likes: 34,
  },
  {
    user: "67f95c88b31d4c10f8d05bae",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744919714/stegozavr_utnqxx.avif",
    description: "Birthday cake vibes 🎂",
    tags: ["cake", "birthday", "party"],
    taggedUsers: ["662051e9a67c894755a18fa4"],
    views: 95,
    likes: 17,
  },
  {
    user: "67f95c88b31d4c10f8d05bae",
    image:
      "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920362/%D0%90%D0%BA%D0%BE%D0%BD%D0%B8%D1%82_g3bxoo.jpg",
    description: "My dream car finally arrived! 🚗",
    tags: ["car", "luxury"],
    taggedUsers: [],
    views: 450,
    likes: 102,
  },
  {
    user: "67f95c88b31d4c10f8d05bae",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920399/samuray_ul1mvm.jpg",
    description: "Hiking through the wild 🏞️",
    tags: ["hiking", "adventure"],
    taggedUsers: [],
    views: 210,
    likes: 59,
  },
  {
    user: "67f95cc7b31d4c10f8d05bb1",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920426/Veles_slaael.jpg",
    description: "New art piece finished 🎨",
    tags: ["art", "canvas", "painting"],
    taggedUsers: ["662051e9a67c894755a18fa5"],
    views: 135,
    likes: 45,
  },
  {
    user: "67f95cc7b31d4c10f8d05bb1",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920453/islam_h9wcsz.jpg",
    description: "City nights and lights 🌃",
    tags: ["city", "night", "travel"],
    taggedUsers: [],
    views: 300,
    likes: 78,
  },
  {
    user: "67f95cc7b31d4c10f8d05bb1",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920426/Veles_slaael.jpg",
    description: "Lost in a good book 📚",
    tags: ["books", "reading"],
    taggedUsers: [],
    views: 75,
    likes: 12,
  },
  {
    user: "67fceea31eea0c1cca019c92",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920426/Veles_slaael.jpg",
    description: "Late night coding session 👨‍💻",
    tags: ["coding", "developer", "javascript"],
    taggedUsers: [],
    views: 500,
    likes: 150,
  },
  {
    user: "67fceea31eea0c1cca019c92",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920426/Veles_slaael.jpg",
    description: "Meet my new buddy 🐶",
    tags: ["dog", "pets", "cute"],
    taggedUsers: [],
    views: 180,
    likes: 43,
  },
  {
    user: "67fceea31eea0c1cca019c92",
    image: "https://res.cloudinary.com/dqeshvhfo/image/upload/v1744920426/Veles_slaael.jpg",
    description: "Fuel for the morning ☕",
    tags: ["coffee", "morning", "routine"],
    taggedUsers: [],
    views: 90,
    likes: 23,
  },
];

const seedData = async () => {
  try {
    console.log("⏳ Подключение к базе данных...");
    await connectDB();

    console.log("📝 Добавление новых данных...");
    await Post.insertMany(data);

    console.log("✅ Данные успешно добавлены!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Ошибка при добавлении данных:", error);
  }
};

seedData();
