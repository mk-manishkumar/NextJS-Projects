import { Schema, Document, models, model, Types } from "mongoose";

export interface IUserLink extends Document {
  originalUrl: string;
  shortUrl: string;
  slug: string;
  userId: Types.ObjectId;
  savedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userLinkSchema = new Schema<IUserLink>(
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
      index: true,
    },

    savedAt: {
      type: Date,
      required: false,
      index: true,
    },
  },
  { timestamps: true }
);

const UserLink = models.UserLink || model<IUserLink>("UserLink", userLinkSchema);

export default UserLink;
