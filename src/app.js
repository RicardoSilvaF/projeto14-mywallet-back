import express from "express";
import router from "./routes/index.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const port = 5000;
app.listen(port, () => console.log(`server online in the port: ${port}`));