"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// require("./models/conn");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const twilio_1 = __importDefault(require("./routes/twilio"));
const stripe_1 = __importDefault(require("./routes/stripe"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect("mongodb+srv://dewalabhinav855:zaXbuM7fRDrNAD2T@cluster0.fcau0c2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connection build successfully");
}).catch(() => {
    console.log("No connection build");
});
const port = 2000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
app.use("/api/twilio", twilio_1.default);
app.use("/api/stripe", stripe_1.default);
app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
