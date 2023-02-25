import { Router } from "express";
// import postController from "./postController.js";
import authController from "./authController.js";
import { check } from "express-validator";
import authMiddleware from "./middleware/authMiddleware.js";

const router = new Router();

router.post('/registration', [
    check('userName', 'username cannot be shorter than 3 characters and longer than 10').isLength({min: 3, max: 10}),
    check('password', 'password cannot be shorter than 6 characters and longer than 10').isLength({min: 6, max: 10})
], authController.registration);
router.post('/login', authController.logIn);
router.post('/logout', authController.logOut)
router.get('/users', authMiddleware, authController.getUsers);
router.get('/roles', authMiddleware, authController.getRoles)

export default router
