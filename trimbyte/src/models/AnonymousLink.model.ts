import { Schema, Document, models, model } from "mongoose";

export interface IAnonymousLink extends Document {
  originalUrl: string;
  shortUrl: string;
  slug: string;
  expiresAt: Date;
  createdAt: Date;
}

const anonymousLinkSchema = new Schema<IAnonymousLink>(
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
      index: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: "7d" }, 
    },
  },
  { timestamps: true }
);

const AnonymousLink = models.AnonymousLink || model<IAnonymousLink>("AnonymousLink", anonymousLinkSchema);

export default AnonymousLink;
