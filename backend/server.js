require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createLimiter = require("./utils/rateLimiter");
const aiRouter = require("./routes/ai");

const app = express();
app.use(cors());
app.use(express.json());

const limiter = createLimiter(1, parseInt(process.env.MAX_REQUESTS_PER_MIN || "30"));
app.use("/api/", limiter);

app.use("/api/ai", aiRouter);

app.get("/health", (req,res)=> res.json({status:"ok"}));

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Backend listening on ${PORT}`));
