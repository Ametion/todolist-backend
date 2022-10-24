import express from 'express'
import cors from 'cors';
import {myDataSource} from "./Database/dataSource";
import {loginRouter} from "./Routes/AccountRoutes/LoginRoute";
import {registerRouter} from "./Routes/AccountRoutes/RegisterRoute";
require("dotenv").config()
const app = express()

const corsConfig = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"]
}

app.use(cors(corsConfig))
app.use(express.json());

app.listen(process.env.SERVER_PORT, () => {

    myDataSource.initialize().then(() => {
        console.log("all ok")

        app.use(loginRouter)
        app.use(registerRouter)
    }).catch((err) => {
        console.log(err)
    })
})