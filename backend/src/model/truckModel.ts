import mongoose from "mongoose";
import { TruckState } from "../entities/Truck/TruckTypes.js";

const truckSchema = new mongoose.Schema({
  matriculation: { type: String, required: true, unique: true },
  state: { type: String, enum: Object.values(TruckState), default: TruckState.ACTIVE },
  brand: { type: String, required: true },
  mileage: { type: String, required: true },
}, { timestamps: true });

const TruckModel = mongoose.model("Truck", truckSchema);

export default TruckModel;