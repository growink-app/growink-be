import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { YieldsService } from './yield.service';
import { CreateYieldDTO } from './dto/create-yield.dto';
import { UpdateYieldDto } from './dto/update-yield.dto';

@Controller('yields')
export class YieldsController {
  constructor(private readonly yieldsService: YieldsService) {}

  @Post()
  async createYield(@Body() createYieldDTO: CreateYieldDTO) {
    return this.yieldsService.createYield(createYieldDTO);
  }

  @Get()
  async getAllYields() {
    return this.yieldsService.getAllYields();
  }

  @Get(':id')
  async getYieldById(@Param('id') id: string) {
    return this.yieldsService.getYieldById(id);
  }

  @Patch(':id')
  async updateYield(
    @Param('id') id: string,
    @Body() updateYieldDTO: UpdateYieldDto,
  ) {
    return this.yieldsService.updateYield(id, updateYieldDTO);
  }

  @Delete(':id')
  async deleteYield(@Param('id') id: string) {
    return this.yieldsService.deleteYield(id);
  }
}
