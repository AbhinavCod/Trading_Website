"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_ID;
const client = require("twilio")(accountSid, authToken);
const user_1 = __importDefault(require("../models/user"));
const kyc_1 = __importDefault(require("../models/kyc"));
const router = express_1.default.Router();
router.post("/send-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { phone } = req.body;
    phone = `+91${phone}`;
    let user = user_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: "User not found, please enter correct name" });
    }
    let newUser = new kyc_1.default(req.body);
    yield newUser.save();
    try {
        const response = yield client.verify.v2.services(verifySid)
            .verifications.create({ to: phone, channel: "sms" });
        return res.status(200).json({ message: "Otp send successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error sending otp" });
    }
}));
router.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { phone, otp } = req.body;
    phone = `+91${phone}`;
    try {
        const response = yield client.verify.v2.services(verifySid)
            .verificationChecks.create({ to: phone, code: otp });
        return res.status(200).json({ message: "OTP verified successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Error verifying otp!!!" });
    }
}));
exports.default = router;
