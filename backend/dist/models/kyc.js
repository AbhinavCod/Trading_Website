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
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Schema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    aadhar: { type: String, required: true, unique: true, length: 12 },
    phone: { type: Number, required: true, unique: true, length: 10 },
    pan: { type: String, required: true, unique: true, length: 10 },
    amount: { type: Number }
});
Schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("aadhar") && this.isModified("pan")) {
            this.aadhar = yield bcryptjs_1.default.hash(this.aadhar.toString(), 8);
            this.pan = yield bcryptjs_1.default.hash(this.pan.toString(), 8);
        }
        ;
        next();
    });
});
const KycModel = mongoose_1.default.model("kycModel", Schema);
exports.default = KycModel;
