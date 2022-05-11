import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { AuthDto } from './dto';
  import * as argon from 'argon2';
  import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
  import { JwtService } from '@nestjs/jwt';
@Injectable({})
export class AuthService {
    constructor(private prismaService: PrismaService){}

    async signup(dto: AuthDto) {
        // hash password
        const hashPassword = await argon.hash(dto.password)

        // save new user
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hashPassword,
            }
        })
        
        delete user.hashPassword;
        return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
    }

    async signin() {
    // find the user by email
    const user =
    await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
            'Credentials incorrect',
            );

        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        // if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException(
            'Credentials incorrect',
            );
        return this.signToken(user.id, user.email);
    }
}
