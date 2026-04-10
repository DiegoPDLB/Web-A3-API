import { Router } from "express";
import { getUsers, getUser, postUser, putUser, delUser } from "../controllers/users.controllers.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', delUser);

export default router;