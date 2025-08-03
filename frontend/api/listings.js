import { connectDB } from "../lib/mongodb.js";
import Listing from "../models/Listing.js";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const listings = await Listing.find();
    return res.status(200).json(listings);
  }

  if (req.method === "POST") {
    const { title, price, description } = req.body;
    const newListing = new Listing({ title, price, description });
    await newListing.save();
    return res.status(201).json(newListing);
  }

  res.status(405).json({ message: "Method not allowed" });
}
