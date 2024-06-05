// Define how mongoose will handle the connection
// from mongodb

import mongoose from "mongoose";

export function mongooseConnect() {
  // Check if we have an existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  // Else make a new connection to the mongodb
  /* Will process expand the env properly?? */
  else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}