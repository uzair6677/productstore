import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send("server is ready");
});
app.listen(7000, () => {
  console.log("server is running on port 7000");
});
