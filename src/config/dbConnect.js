import mongoose from "mongoose";

mongoose.connect("mongodb+srv://app:<password>@cluster0.gefzxkn.mongodb.net/Cluster0");

const db = mongoose.connection;

export default db;
