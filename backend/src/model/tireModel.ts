import mongoose from "mongoose";
import { TirePosition, TireState } from "../entities/Tire/TireTypes.js";

const tireSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  position: { type: String, enum: Object.values(TirePosition), required: true },
  state: { type: String, enum: Object.values(TireState), default: TireState.NEW },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  vehicleType: { type: String, enum: ["truck", "trailer"], required: true },
  installationDate: { type: Date, required: true },
  installationMileage: { type: String, required: true },
  replacementMileage: { type: String },
}, { timestamps: true });

const TireModel = mongoose.model("Tire", tireSchema);

export default TireModel;