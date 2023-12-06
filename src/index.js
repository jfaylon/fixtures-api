require("dotenv").config();
const PORT = process.env.PORT || 3000;

(async () => {
  const app = require("./app");
  console.log("connected");
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
