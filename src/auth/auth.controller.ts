import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    // Post /auth/singup
    @Post('singup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup()
    }

    // Post /auth/signin
    @Post('signin')
    singin() {
        return this.authService.signin()
    }
}
