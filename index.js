import express from "express";
import mysql from "mysql";
import cors from "cors";

require('dotenv').config()

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASS,
  database: "myTaskDB",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/tasks", (req, res) => {
  const q = "SELECT * FROM tasktable";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/tasks", (req, res) => {
  const q = "INSERT INTO tasktable(`taskName`, `desc`, `priority`) VALUES (?,?,?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.priority,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/task/:id", (req, res) => {
  const taskId = req.params.id;
  const q = " DELETE FROM tasktable WHERE id = ? ";

  db.query(q, [taskId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}); 

 app.put("/task/:id", (req, res) => {
  const taskId = req.params.id;
  const q = "UPDATE tasktable SET `title`= ?, `desc`= ?, `priority`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.priority,
   
  ];

  db.query(q, [...values,taskId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}); 

app.listen(8800, () => {
  console.log("server running on port 8800.");
});
