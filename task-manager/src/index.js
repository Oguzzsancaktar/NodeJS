const express = require('express');
require('./db/mongoose.js');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');


const app = express()
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)


// app.use((req, res, next) => {
//   res.status(503).send()
// })

const port = process.env.PORT || 3000;


// const main = async () => {
//   const task = await Task.findById('619e322c85b33d1676bfcfb2');
//   await task.populate([{ path: 'owner' }]);
//   console.log(task.owner);
// }
// main()


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})