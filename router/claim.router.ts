import { Router } from "express";
import { ClaimController } from "../controller/claim.controller";
import { tokenVerify } from "../middleware/auth.middleware";

const routerClaim = Router();
const claimController = new ClaimController();

routerClaim.post('/getAll', tokenVerify, claimController.getAll);
routerClaim.post('/create', claimController.create);
routerClaim.post('/findByCodeReservation', tokenVerify, claimController.findByCodeReservation);
routerClaim.post('/findByValue', tokenVerify, claimController.findByValue);

export default routerClaim;
