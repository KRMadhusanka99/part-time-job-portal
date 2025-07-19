import app from "./app.js";
import { PORT } from "./config/env.js";

app.listen(5000, () => {
    console.log(`server is running on port ${5000}`)
})