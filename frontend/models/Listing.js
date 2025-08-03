import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Listing || mongoose.model("Listing", ListingSchema);
