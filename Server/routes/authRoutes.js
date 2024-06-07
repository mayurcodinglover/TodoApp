import express from 'express'
const route=express.Router();
import { registeruser,loginuser,validatetoken, verifyToken} from '../Controller/authcontroller.js';
import { addtodo ,gettodo,deletetodo,updatecheck,updatetodo} from '../Controller/Todocontroller.js';
import protect from '../middleware/authmiddleware.js';

route.post("/register",registeruser);
route.post("/login",loginuser);
route.post("/validatetoken",verifyToken,validatetoken);
route.post("/addtodo",protect,addtodo)
route.get("/gettodo",protect,gettodo)
route.post("/deletetodo",protect,deletetodo)
route.post("/updatecheck",protect,updatecheck)
route.put("/updatetodo",protect,updatetodo)

export default route;