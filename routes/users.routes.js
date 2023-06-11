import express from 'express';

import { getUsers, createUser, updateUser, deleteUser, registerUser, loginUser} from "../controllers/users.controller.js";
const router = express.Router();

router.get("/", getUsers);

router.post("/", createUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;