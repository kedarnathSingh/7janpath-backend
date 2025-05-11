import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export type Credentials = {
  email: string;
  otp: string;
};

export class UserService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }
  async verifyCredentials(credentials: Credentials): Promise<User> {
    // implement this method
    const foundUser = await this.userRepository.findOne({
      where: {
        email: credentials.email,
      },
    });
    if (!foundUser) {
      throw new HttpErrors.NotFound('user not found.');
    }

    if (foundUser.password != credentials.otp)
      throw new HttpErrors.Unauthorized('otp is not valid.');

    if (foundUser.status === false) {
      throw new HttpErrors.Unauthorized('Your account is deactivated. Please contact to customer support.');
    }
    return foundUser;
  }

}
