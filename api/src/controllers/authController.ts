import RegisterUserDTO from "../dto/registerUser.dto";
import LoginUserDTO from "../dto/loginUser.dto";
import { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
    private authService: AuthService;

    constructor() {
      this.authService = new AuthService();
    }

    public async register(req: Request, res: Response){
        try{
            const registerData = req.body as RegisterUserDTO;
            const response = await this.authService.register(registerData);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(409).json({error: error.message})
        }
    }

    public async login(req: Request, res: Response){
        try{
            const loginData = req.body as LoginUserDTO;
            const response = await this.authService.login(loginData);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(401).json({error: error.message})
        }
    }
}