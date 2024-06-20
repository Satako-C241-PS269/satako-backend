const mongoose = require("mongoose");

const PredictSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: { type: String, required: true },
    disease: { type: String, required: true },
    confidenceScore: { type: Number, required: true },
    description: { type: String, required: true },
    causes: { type: String, required: true },
    solutions: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model("Prediction", PredictSchema);
module.exports = Prediction;
