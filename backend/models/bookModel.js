import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    category: {
      type: String,
      enum: ["General", "Fiction", "Non-fiction", "Science", "History", "Technology"],
      default: "General",
    },

    coverImage: { type: String, default: "" },

    openLibraryId: {
      type: String,
      unique: true,
      sparse: true,
    },

    publishedYear: {
      type: Number,
    },

    available: {
      type: Boolean,
      default: true,
    },

    totalCopies: {
      type: Number,
      default: 1,
    },

    availableCopies: {
      type: Number,
      default: 1,
      validate: {
        validator: function (value) {
          return value <= this.totalCopies;
        },
        message: "Available copies cannot exceed total copies",
      },
    },

    pdfUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;