import "dotenv/config";
import express from "express";
import cors from "cors"
import router from "./src/routes/task-list.router.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use(router);


app.get("/", (req, res)=>{
    res.send({msg: 'Bienvenidos'});
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}/`);
})