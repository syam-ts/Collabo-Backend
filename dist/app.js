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
const db_1 = require("./config/db");
const userMdl_1 = require("./model/userMdl");
const app = (0, express_1.default)();
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new userMdl_1.User({
        firstName: 'Syam',
        lastName: 'nandhu',
        email: 'Syamnan@gami.com',
        password: 'syam@123'
    });
    yield user.save();
    res.send('User Added successfully!');
}));
(0, db_1.connectDB)()
    .then(() => {
    console.log("Database connection established!");
    app.listen(3000, () => {
        console.log('Server successfully running on port 3000!');
    });
})
    .catch((err) => {
    console.log('Database cannot be connected!');
});
