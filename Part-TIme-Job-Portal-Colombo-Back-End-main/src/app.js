import express from "express";
import cors from 'cors'
import morgan from "morgan";
import helmet from "helmet";
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import resumeRouter from './routes/resumeRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import jobRouter from './routes/jobRoutes.js'
import jobApplicationRouter from './routes/jobApplicationRoutes.js'

const app = express()
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcome to Job Portal')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/admin', adminRouter)
app.use('/api/job', jobRouter)
app.use('/api/application', jobApplicationRouter)

app.use((req, res) => {
    res.status(404).json({ error: "Route Not Found" });
});

app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

process.on("SIGINT", () => {
    console.log("Server shutting down...");
    process.exit();
});

export default app;