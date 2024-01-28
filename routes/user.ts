import { Router } from "express";
// import JWTAuth from "../Auth";

import GetAllUsers from "../useCases/User/GetAllUsers";

const router = Router();

router.get("/", GetAllUsers);

export default router;
