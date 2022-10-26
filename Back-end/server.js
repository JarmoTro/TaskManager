const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db')
const userRoutes = require('./routes/userRoutes')
const taskRoutes = require('./routes/taskRoutes')
const subtaskRoutes = require('./routes/subtaskRoutes')

app.use(cors());
app.use(express.json());

app.use(userRoutes)
app.use(taskRoutes)
app.use(subtaskRoutes)

app.listen(process.env.PORT || 3000 , () => {
    console.log("API is now running.")
});