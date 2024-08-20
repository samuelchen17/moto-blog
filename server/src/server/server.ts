// code to run server: npx ts-node src/server/server.ts

import http from "http";
import app from "./app";
import config from "../config/config";
// ensures db connection
import "../database/index.database";
// ensures firebase initialization
// import "../firebase";

// create HTTP server
const httpServer = http.createServer(app);

// listen for requests
httpServer.listen(config.server.port, () => {
  console.log(
    `Server is running at ${config.server.host} on port ${config.server.port}`
  );
});
