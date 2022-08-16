require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const sequelize = require("./src/utils/db");
const router = require("./src/routes/index");


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use(express.static(path.resolve(__dirname, "static")));

app.use("/api/v1", router)
app.use((req, res) => {
    res.status(404).send("Not found");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));
    } catch (error) {
        console.log(error);
    };
};

start();