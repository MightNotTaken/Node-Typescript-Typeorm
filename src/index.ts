import dotenv from 'dotenv';
dotenv.config();
// place dotenv at top so that it can load the corrosponding ENVIRONMENT_VARIABLES

import express from "express";
import cors from "cors";
import http from 'http';

import { initializeDB } from "./db";
import WebSocketServer from './ws/index';

import routes from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", routes);


const server = http.createServer(app);
WebSocketServer.initialize(server);

server.listen(PORT, () => {
  initializeDB().then(
    () => {
      console.log("database successfully initialized");
    },
    (error) => {
      console.log(error)
      if (error.code === 'ER_BAD_DB_ERROR') {
        console.error('Database doesn\'t exists');
      }
    }
  );
  console.log(`Server listening on port ${PORT}`);
});
