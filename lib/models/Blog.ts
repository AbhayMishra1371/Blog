import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: any[];
  quiz: Record<string, any>;
  facts: string;
  summary: string;
  key_notes: Record<string, any>;
  imageUrl: string;
  pdfUrl: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: [Schema.Types.Mixed], default: [] },
    quiz: { type: Schema.Types.Mixed, default: {} },
    facts: { type: String, default: "" },
    summary: { type: String, default: "" },
    key_notes: { type: Schema.Types.Mixed, default: {} },
    imageUrl: { type: String, default: "" },
    pdfUrl: { type: [String], default: [] },
  },
  {
    timestamps: true,
    collection: "content", // Targeting the existing 'content' collection
  }
);

export default mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
