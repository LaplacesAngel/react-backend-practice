const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  setTimeout(() => {
    const data = {
      message: "hello world",
    };
    res.json(data);
  }, 300);
});

//Have Node serve the files for our built react app
app.use(express.static(path.resolve(__dirname, "../frontend")));

//Hangle GET requests to /api route
app.get("/api/server", (req, res) => {
  const data = {
    message: "Hello from the server",
  };
  res.json(data);
});

//All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
