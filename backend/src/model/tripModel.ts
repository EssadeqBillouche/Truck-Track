import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  truckId: { type: mongoose.Schema.Types.ObjectId, ref: "Truck", required: true },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true },
  status: { type: String, enum: ["todo", "in-progress", "completed"], default: "todo" },
  departureMileage: { type: String },
  arrivalMileage: { type: String },
  fuelVolume: { type: Number },
  notes: { type: String },
}, { timestamps: true });

const TripModel = mongoose.model("Trip", tripSchema);

export default TripModel;