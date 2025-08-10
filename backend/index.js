const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/db");
const employeeRoutes = require("./routes/employee.routes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRoutes);

connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
