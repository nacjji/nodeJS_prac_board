const express = require("express");
const app = express();
const port = 3000;
const Posts = require("./route/posts");
const connect = require("./schemas");
connect();
app.use(express.json());

app.use("/", [Posts]);

app.listen(port, () => {
  console.log(port, "번 포트로 서버가 열렸습니다.");
});
