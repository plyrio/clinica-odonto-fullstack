import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, CreateUserZodDto, UpdateUserZodDto } from '@odonto/core';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';


@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiBody({
    type: CreateUserZodDto,
    examples: {
      exemploCriacao: {
        summary: 'Exemplo de criação de usuário',
        description: 'Um exemplo válido de criação de usuário',
        value: {
          email: 'usuario@exemplo.com',
          password: 'senhaSegura123',
          name: 'João Silva',
          bio: 'uma bio qualquer',
          birthday: '1990-05-21',
          imgUrl: 'https://example.com/img.jpg',
          phone: '+5511999999999',
          role: 'USER'
        },
    }
  }
  })
create(@Body() createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}

@Get()
@ApiOperation({ summary: 'Lista todos os usuários' })
@ApiResponse({ status: 200, description: 'Usuários listados com sucesso.' })
findAll() {
  return this.userService.findAll();
}

@Get(':id')
@ApiOperation({ summary: 'Obtém um usuário por ID' })
@ApiResponse({ status: 200, description: 'Usuário encontrado.' })
@ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
findOne(@Param('id') id: string) {
  return this.userService.findOne(+id);
}

@Patch(':id')
@ApiOperation({ summary: 'Atualiza dados de um usuário pelo ID.' })
@ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
@ApiResponse({ status: 404, description: 'Falha ap atualizar usuário.' })
@ApiBody({ type: UpdateUserZodDto })
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.userService.update(+id, updateUserDto);
}

@Delete(':id')
remove(@Param('id') id: string) {
  return this.userService.remove(+id);
}
}
