const express = require("express");
const app = express();
const routes = require('./routes');
const path = require("path");
const src = path.join(__dirname, "src");

app.use(express.static(src));
app.use("/user", router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
