import express from 'express'

const app = express();
const serverPort  = 3000;

app.listen(serverPort, () => {
    console.log("Server started ---> ${"+serverPort+"}");
});