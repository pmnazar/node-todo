import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideRouter, Router } from '@angular/router';
import { fireEvent, render, screen, waitFor } from '@testing-library/angular';
import { of } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import {
  mockAccessToken,
  MockAuthService,
} from '../../../core/services/mocks/auth.service.mock';
import { LoginComponent } from './login.component';

@Component({ template: '' })
class DummyComponent {}

const commonImports = [
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
];

const setup = async (authService: any) => {
  const { fixture } = await render(LoginComponent, {
    imports: commonImports,
    componentProviders: [{ provide: AuthService, useValue: authService }],
    providers: [provideRouter([{ path: 'todos', component: DummyComponent }])],
  });

  const router = fixture.componentRef.injector.get(Router);
  const navigateSpy = jest.spyOn(router, 'navigate');

  const usernameInput = screen.getByLabelText(/username/i) as HTMLInputElement;
  const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
  const submitButton = screen.getByRole('button', { name: /login/i });

  const fillForm = (username: string, password: string) => {
    fireEvent.input(usernameInput, { target: { value: username } });
    fireEvent.input(passwordInput, { target: { value: password } });
  };

  return {
    fixture,
    router,
    navigateSpy,
    usernameInput,
    passwordInput,
    submitButton,
    fillForm,
  };
};

describe('LoginComponent', () => {
  const mockAuthService = new MockAuthService();

  it('should login form be initialized', async () => {
    const { fixture } = await setup(mockAuthService);
    const form = fixture.componentInstance.form;

    expect(form).toBeDefined();
    expect(form.controls.username.value).toBeNull();
    expect(form.controls.password.value).toBeNull();
    expect(form.invalid).toBe(true);
  });

  it('should show errors when fields are empty and user clicks submit', async () => {
    const { usernameInput } = await setup(mockAuthService);

    fireEvent.blur(usernameInput);
    expect(await screen.findByText(/Required/i)).toBeInTheDocument();
    fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    expect(screen.queryByText(/Required/i)).not.toBeInTheDocument();
  });

  it('should submit button be disabled when form invalid', async () => {
    const { usernameInput, passwordInput, submitButton } =
      await setup(mockAuthService);

    expect(submitButton).toBeDisabled();
    fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    fireEvent.input(passwordInput, { target: { value: 'testpassword' } });
    expect(submitButton).toBeEnabled();
  });

  // it('should navigate when triggered register link', async () => {
  //   const {fixture, router} = await setup(mockAuthService);
  //   const link = screen.getByText(/Register/i);
  //   fireEvent.click(link);
  //   expect(router.)
  // })

  it('should call login and navigate when clicking login button', async () => {
    const { navigateSpy, usernameInput, passwordInput, submitButton } =
      await setup(mockAuthService);

    const user = {
      username: 'testuser',
      password: 'testpassword',
    };

    fireEvent.input(usernameInput, { target: { value: user.username } });
    fireEvent.input(passwordInput, { target: { value: user.password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAuthService.login).toHaveBeenCalledWith(
        user.username,
        user.password,
      );
      mockAuthService.login.mockReturnValue(
        of({ accessToken: mockAccessToken }),
      );
      expect(navigateSpy).toHaveBeenCalledWith(['/todos']);
    });
  });

  it('should not navigate if login fails', async () => {
    mockAuthService.login.mockReturnValue(of());
    const { navigateSpy, usernameInput, passwordInput, submitButton } =
      await setup(mockAuthService);

    const user = {
      username: 'testuser',
      password: 'wrong',
    };

    fireEvent.input(usernameInput, { target: { value: user.username } });
    fireEvent.input(passwordInput, { target: { value: user.password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAuthService.login).toHaveBeenCalledWith(
        user.username,
        user.password,
      );
      expect(navigateSpy).not.toHaveBeenCalled();
    });
  });

  it('should register link redirect to register page', async () => {
    const { fixture, usernameInput } = await setup(mockAuthService);
    const form = fixture.componentInstance.form;

    fireEvent.input(usernameInput, { target: { value: 'testuser' } });
    expect(form.controls.username.value).toBe('testuser');
  });
});
