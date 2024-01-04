import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import express, { RequestHandler } from "express";
import routes from "./routes.js";

const app = express();
// adds security to our app
app.use(helmet());
app.use(cors());
app.use(express.json());

// Fallback Middleware function for returning
// 404 error for undefined paths
const invalidPathHandler: RequestHandler = (request, response, next) => {
  response.status(404);
  response.send("invalid path");
};

routes(app);
app.use(invalidPathHandler);

// creates and starts a server for our API on a defined port
app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
