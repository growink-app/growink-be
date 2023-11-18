import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(user) {
    // hash password
    const hashedPassword: string = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUND),
    );

    // create user in database
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          name: user.name,
          phoneNumber: user.phoneNumber,
        },
      });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `The "${error.meta.target}" is invalid or already taken`,
          );
        }
      }
      throw error;
    }
  }

  async login(email: string, password: string) {
    // check if user exists in database
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    // password validation
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
