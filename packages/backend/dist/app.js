import express, {} from "express";
import routes from "./routes/index.js";
import { errorHandler404 } from "./controllers/errorHandler404.js";
import cors from "cors";
const app = express();
// cors
app.use(cors());
// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routes
app.use("/posts", routes.posts);
app.use("/users", routes.users);
app.use("/login", routes.login);
app.use(errorHandler404);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({ msg: err.message });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
//# sourceMappingURL=app.js.map