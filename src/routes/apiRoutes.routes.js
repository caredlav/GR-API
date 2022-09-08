const express=require('express');
const router=express.Router();
const apiController=require('../controllers/apiController');

router.post('/register',apiController.registerUser);

router.post('/login',apiController.access);

router.get("/events",apiController.getEvents);

router.post("/user/:id/event/:idevent",apiController.makeBet);

router.put("/user-update/:id",apiController.updateUserInfo);

router.get("/user-balance/:id",apiController.getBalance);

router.put("/user-deposit/:id",apiController.deposit);

router.put("/user-withdraw/:id",apiController.withdraw);

router.get("/user-transactions/:id",apiController.getTransactions);

module.exports=router;