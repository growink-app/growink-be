import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findAll(query: string) {
    if (query) {
      const users = await this.prismaService.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
      });
      return users;
    } else {
      const users = await this.prismaService.user.findMany({});
      return users;
    }
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id: '${id}' does not exist`);
    }

    return user;
  }

  async update(id: string, data) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id: "${id}" does not exist`);
    }

    try {
      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          email: data.email,
          name: data.name,
          imageUrl: data.imageUrl,
          phoneNumber: data.phoneNumber,
        },
      });
      return updatedUser;
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
}
