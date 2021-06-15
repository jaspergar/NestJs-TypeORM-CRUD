import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    async getAll(name?: string) : Promise<User[]>{
        try{
            const users = await this.userRepository.find();
            if(name){
                return users.filter(user => user.name === name)
            }
            return users;
        }
        catch(err){
          throw err
        }
    }

    async getOneById(id : number): Promise<User>{
        try{
           const user = await  this.userRepository.findOneOrFail(id);
     
           return user;
        }
        catch(err){ 
           throw err;
        }
    }

    createUser(createUserDto : CreateUserDto) : Promise<User> {
        const newUser = this.userRepository.create({...createUserDto}); // const newUser = new User(); newUser.name = name , newUser.bio = bio
        
        return this.userRepository.save(newUser); // INSERT 
    }

    async updateUser (id : number , updateUserDto : UpdateUserDto) : Promise<User> {
        const user = await this.getOneById(id);

        user.name = updateUserDto.name;
        user.bio = updateUserDto.bio;

        return this.userRepository.save(user); // UPDATE
    }

    async deleteUser(id:number) : Promise<User> {
       const user = await this.getOneById(id);

       return this.userRepository.remove(user);
    }


}
