import { IS_FQDN, IsDefined, IsFQDN, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  @ApiProperty({ example: 'Winter night' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'I always preferred winter to summer...' })
  content: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1' })
  authorId: number;

  @IsFQDN()
  @ApiProperty({
    example:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ZcEZQvwDdG17F_Fh5R61VlxG6GPm6ksZ8w&usqp=CAU',
    required: false,
  })
  imgPath: string;
}
