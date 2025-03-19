const express = require("express");
const { Client } = require("pg");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const client = new Client({
  connectionString: "postgresql://postgres:yourpassword@localhost:5432/yourdbname" 
});

client.connect();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
