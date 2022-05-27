import { IsNotEmpty, IsString, IsEmail, IsFQDN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'test@yandex.ru' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Alexandra' })
  name: string;

  @IsFQDN()
  @ApiProperty({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZcEZQvwDdG17F_Fh5R61VlxG6GPm6ksZ8w&usqp=CAU',
    required: false,
  })
  avatar: string;
}
