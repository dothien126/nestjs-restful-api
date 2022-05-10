import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    // Post /auth/singup
    @Post('singup')
    signup() {
        return this.authService.signup()
    }

    // Post /auth/signin
    @Post('signin')
    singin() {
        return this.authService.signin()
    }
}
