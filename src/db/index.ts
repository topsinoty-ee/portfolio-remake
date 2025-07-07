import mongoose from "mongoose";
import { env } from "~/env";

declare global {
  var _mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

if (!env.MONGODB_URI || typeof env.MONGODB_URI !== "string") {
  throw new Error("Missing or invalid MONGODB_URI in .env.local");
}

const uri = env.MONGODB_URI as string;

let clientPromise: Promise<typeof mongoose>;

if (env.NODE_ENV === "development") {
  global._mongooseConnectionPromise ??= mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  });
  clientPromise = global._mongooseConnectionPromise;
} else {
  clientPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
    family: 4,
  });
}

export { clientPromise };
