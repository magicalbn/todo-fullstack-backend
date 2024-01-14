const mongooseConnectDB = require("./config/mongoose.config");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3001;

const app = require("./app");
mongooseConnectDB();

app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Listening on PORT ${port} => http://localhost:${port}`);
});
