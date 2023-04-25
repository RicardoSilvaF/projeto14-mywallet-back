import { Router } from "express";
import { register, login } from "../controllers/controller";

const router = Router();

router.post("/cadastro", register)
router.post("/", login)

export default router;