const express = require("express");
const routes = require("./routes");

const app = express()

app.use("/comments", routes.comments);
app.use("/users", routes.users);
app.use("/posts", routes.posts);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening at port ${ PORT }`);
})

