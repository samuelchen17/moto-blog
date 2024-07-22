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
    url: "mongodb+srv://admin:<password>@learning.jltuol3.mongodb.net/?retryWrites=true&w=majority&appName=Learning",
  },
  server: {
    host: "localhost",
    port: 6767,
  },
};

export default config;
