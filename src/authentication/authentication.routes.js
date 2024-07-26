import { Router } from "express";
import catchError from "../middleware/catchError.js";
import { logIn, register, verifyAccount } from "./authentication.controller.js";

const authenticationRouter = Router()

/* Register */

authenticationRouter.post('/register', catchError(register))


/* Verify Account */

authenticationRouter.get('/verify/:token', verifyAccount)

/* LOg IN */

authenticationRouter.post('/log-in', catchError(logIn))


export default authenticationRouter