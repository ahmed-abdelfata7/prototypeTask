//server configuration
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 6000;
const HOST = process.env.SERVER_IP || "http://localhost";

const app = require("./app");
//running express server
app.listen(PORT, () => {
  console.log(`Server is running at ${HOST}:${PORT}`);
});
