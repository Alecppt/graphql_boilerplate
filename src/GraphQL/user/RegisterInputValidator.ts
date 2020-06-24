import { MaxLength, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
  @Field()
  @MaxLength(255)
  @IsEmail()
  email: string;

  @Field()
  password: string;
}
