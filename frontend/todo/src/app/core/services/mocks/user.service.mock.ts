import { of } from 'rxjs';

import { User } from '../../../shared/models/user.model';

export const mockUser: User = {
  _id: '1',
  username: 'John Doe',
  email: 'john.doe@example.com',
};

export class MockUserService {
  getCurrentUser() {
    return of(mockUser);
  }
}
