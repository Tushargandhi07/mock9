const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./route/user_route');
const { postRouter } = require('./route/post_route');
const { authentication } = require('./middleware/authenticate');
require('dotenv').config();

const PORT= process.env.port || 4440;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send('welcome');
});

app.use("/user",userRouter);
app.use(authentication);
app.use("/post",postRouter);







app.listen(PORT,async()=>{
    try {
        await connection
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error while connecting to DB', error);
    }
    console.log(`Server listening on ${PORT}`);
})