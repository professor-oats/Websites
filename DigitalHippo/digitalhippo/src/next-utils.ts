import next from "next"

const PORT = Number(process.env.PORT) || 3000;


/* Here we create a handler that will be able to take
requests into our nextApp that we deploy */

/* Make sure that the non-production nextApp gets the correct
port */

export const nextApp = next ({
  dev: process.env.NODE_ENV !== "production",
  port: PORT,
});

export const nextHandler = nextApp.getRequestHandler();