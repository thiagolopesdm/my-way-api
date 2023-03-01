import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async listAll() {
    return await this.userService.findAll();
  }

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return await this.userService.create(user);
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.findOneOrFail({ where: { id } });
  }

  @Put(':id')
  async uptade(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: UpdateUserDTO,
  ) {
    return await this.userService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.delete(id);
  }
}
