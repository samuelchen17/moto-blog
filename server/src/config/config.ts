import dotenv from "dotenv";

dotenv.config();

const config = {
  mongo: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      poolSize: 50,
      autoIndex: false,
      retryWrites: false,
    },
    url: process.env.MONGODB_URL,
  },
  server: {
    host: "localhost",
    port: 6767,
  },
};

export default config;
