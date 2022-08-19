const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");

const generateFileName = (fileName) => {
    const name = uuid() + fileName;
    return [name, `${process.env.API_URL}/static/` + name];
};

const deleteFile = (fileName) => {
    const [, name] = fileName.split("static")
    fs.unlinkSync(path.join(__dirname, "../../static", name));
};

const createFile = (fileName, data) => {
    fs.writeFileSync(path.join(__dirname, "../../static", fileName), data);
}

module.exports = { generateFileName, deleteFile, createFile };