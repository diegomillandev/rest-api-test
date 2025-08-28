import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import User from "../models/User";
import { comparePassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = catchErrors(async (req: Request, res: Response) => {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use",
                data: null,
                error: "Email is already in use"
            });
        }

        const passwordHash = await hashPassword(password);
        const user = new User({ name, email, password: passwordHash, role });

        await user.save();

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: null,
            error: null
        });
    });

    static login = catchErrors(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
                data: null,
                error: "Invalid email or password"
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
                data: null,
                error: "Invalid email or password"
            });
        }

        const token = generateJWT(user.id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: token,
            error: null
        });
    });
}