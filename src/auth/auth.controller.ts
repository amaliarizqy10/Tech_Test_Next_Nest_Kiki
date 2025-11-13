import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RegisterAuthDto } from './dto/login-auth.dto';
import { JoiPipe } from 'nestjs-joi';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(
        @Body(JoiPipe) body: RegisterAuthDto
    ) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(
        @Body(JoiPipe) body: LoginAuthDto) {
        return this.authService.login(body);
    }
}