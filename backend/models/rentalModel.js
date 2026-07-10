import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "returned",
        "expired",
      ],
      default: "pending",
    },

    requestDate: {
      type: Date,
      default: Date.now,
    },

    approvalDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },

    returnDate: {
      type: Date,
    },

    adminMessage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;