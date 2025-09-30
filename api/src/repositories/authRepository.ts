import { PrismaClient, User } from "../generated/prisma";
import RegisterUserDTO from "../dto/registerUser.dto";

export class AuthRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
          where: { email },
        });
    }

    async create(user: RegisterUserDTO): Promise<User> {
        return this.prisma.user.create({
            data: {...user},
        });
    }
}