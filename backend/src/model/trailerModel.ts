import mongoose from "mongoose";
import { TrailerState } from "../entities/Trailer/TrailerTypes.js";

const trailerSchema = new mongoose.Schema({
  matriculation: { type: String, required: true, unique: true },
  state: { type: String, enum: Object.values(TrailerState), default: TrailerState.ACTIVE },
  brand: { type: String, required: true },
  capacity: { type: Number, required: true },
  mileage: { type: String, required: true },
}, { timestamps: true });

const TrailerModel = mongoose.model("Trailer", trailerSchema);

export default TrailerModel;