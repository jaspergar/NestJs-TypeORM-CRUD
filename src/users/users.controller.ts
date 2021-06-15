import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
    constructor(private readonly usersService : UsersService){}

    @Get()
    async getUsers(@Query('name') name : string) : Promise<User[]>{
        return this.usersService.getAll(name);
    }
    
    @Get(':id')
    async getUserById(@Param('id',ParseIntPipe) id : number) : Promise<User>{
       return this.usersService.getOneById(id);
    }

    @Post()
    async create(@Body() body:  CreateUserDto) : Promise<User> {
        return this.usersService.createUser(body);
    }

    @Put()
    async update(@Body() body: UpdateUserDto , @Query('id',ParseIntPipe) id :number) : Promise<User> {
        return this.usersService.updateUser(id,body);
    }

    @Delete(':id')
    async delete(@Param('id' , ParseIntPipe) id : number) : Promise<User>{
        return this.usersService.deleteUser(id);
    }

}
