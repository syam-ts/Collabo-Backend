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
const userMdl_1 = require("../model/userMdl");
const Router = express_1.default.Router();
Router.get('/feed', (req, res) => {
    res.send('Router defined');
});
Router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('The req : ', req.body);
    const user = new userMdl_1.User(req.body);
    yield user.save();
    res.send('User Added successfully!');
}));
exports.default = Router;
