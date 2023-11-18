import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Request,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserMeController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Request() req) {
    const userId = req.user.id;
    return new UserEntity(await this.usersService.findOne(userId));
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return new UserEntity(
      await this.usersService.update(userId, updateUserDto),
    );
  }
}
