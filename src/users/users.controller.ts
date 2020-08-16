import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  @Post()
  @ApiCreatedResponse({
    type: User
  })
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.save(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({
    type: [User] 
  })
  getUsers(@Query() filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(filterDto);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.update(id, createUserDto);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: [User]
  })
  public findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  public delete(@Param('id') id: number): Promise<User> {
    return this.usersService.delete(id);
  }
}
