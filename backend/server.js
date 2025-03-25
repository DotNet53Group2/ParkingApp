const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/payments", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
