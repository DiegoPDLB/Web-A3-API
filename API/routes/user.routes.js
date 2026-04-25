import { Router } from "express";
import { getUsers, getUser, postUser, putUser, delUser } from "../controllers/users.controllers.js";
import authenticate from "../middlewares/auth.middleware.js";
import { validateUserCreate, validateUserUpdate } from "../middlewares/validators.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', authenticate, getUser);
router.post('/', authenticate, validateUserCreate, postUser);
router.put('/:id', authenticate, validateUserUpdate, putUser);
router.delete('/:id', authenticate, delUser);

export default router;