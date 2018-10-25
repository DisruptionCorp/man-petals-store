const express = require('express');
const app = express();
const router = require('./routes/api/users');
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/api', router);

// app.listen(port, () => {
//   console.log("it's....").then(() => {
//     setTimeout(() => {
//       console.log('....alive.');
//     }, 2000);
//   });
// });
//****giving error- Please check Kevin****//

app.listen(port, () => console.log(`App listening on PORT ${port}`));
