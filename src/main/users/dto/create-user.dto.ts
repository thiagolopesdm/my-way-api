import { IsNotEmpty } from 'class-validator';
import { IsEmail, Matches } from 'class-validator';
import { RegExHelper } from '@utils/shared/helpers/regex.helper';
import { MessagesHelper } from '@utils/shared/helpers/messages.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.VALID_PASSWORD,
  })
  password: string;
}
