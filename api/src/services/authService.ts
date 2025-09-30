import RegisterUserDTO from "../dto/registerUser.dto";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/authRepository";
import LoginUserDTO from "../dto/loginUser.dto";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    public async register(data: RegisterUserDTO){
        const { name, email } = data;
        const existingUser = await this.authRepository.findByEmail(email);

        if (existingUser) {
            throw new Error("E-mail já está em uso");
        }
        const password = await bcrypt.hash(data.password, SALT_ROUNDS);

        return this.authRepository.create({name, email, password});
    }

    public async login(data: LoginUserDTO){
        const { email, password } = data;
        const user = await this.authRepository.findByEmail(email);
        if(!user){
            throw new Error("Email ou senha incorretos!")
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            throw new Error("Email ou senha incorretos!")
        }

        //jwt
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

        if (!jwtSecret) {
            throw new Error("JWT_SECRET não está definido.");
        }

        if (!jwtExpiresIn) {
            throw new Error("JWT_EXPIRES_IN não está definido.");
        }

        const expiresIn: number = parseInt(jwtExpiresIn, 10);  
    
        const token = jwt.sign(
            { userId: user.id }, //payload
            jwtSecret, //secret key
            { expiresIn }
        )

        return {userId: user.id, token};
    }
}