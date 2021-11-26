const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((success) => {
    console.log('DB Connected');
  })
  .catch((e) => {
    console.log('DB connection eror ' + e);
  });


