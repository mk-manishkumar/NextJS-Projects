import { Schema, Document, models, model, Types } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  slug: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<IUrl>(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, 
    },
  },
  { timestamps: true }
);

const Url = models.Url || model<IUrl>("Url", urlSchema);

export default Url;
