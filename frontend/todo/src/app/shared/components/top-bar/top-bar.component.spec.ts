import { Router } from '@angular/router';
import { fireEvent, render, screen } from '@testing-library/angular';

import { AuthService } from '../../../core/services/auth.service';
import { MockAuthService } from '../../../core/services/mocks/auth.service.mock';
import {
  mockUser,
  MockUserService,
} from '../../../core/services/mocks/user.service.mock';
import { UserService } from '../../../core/services/user.service';
import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let mockRouter: Partial<Router>;
  const mockAuthService = new MockAuthService();
  const mockUserService = new MockUserService();

  beforeEach(() => {
    mockRouter = {
      navigate: jest.fn(),
    };
  });

  it('should render username when logged in', async () => {
    mockAuthService.isLoggedIn = true;
    await render(TopBarComponent, {
      componentProviders: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    expect(await screen.findByText(mockUser.username)).toBeInTheDocument();
  });

  it('should call logout and navigate when clicking logout button', async () => {
    mockAuthService.isLoggedIn = true;
    await render(TopBarComponent, {
      componentProviders: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    const button = await screen.findByText('Logout');
    fireEvent.click(button);

    expect(mockAuthService.isLoggedIn).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
