import Router from "express";
 import { applyUserDetails } from "../controllers/apply.controllers";

 const router = Router();

 router.route("/apply").post(applyUserDetails);


 export default router;