const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.send("Server");
});

app.post("/saveData", function (request, response) {
  fs.appendFile("data.txt", JSON.stringify(request.body, null, 2), function (
    err
  ) {
    if (err) throw err;
  });

  response.sendFile(path.join(__dirname + "/success.html"));
});

app.listen(5000, () => console.log(() => console.log("Y")));
