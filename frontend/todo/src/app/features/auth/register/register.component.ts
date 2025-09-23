import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { passwordMatchValidator } from '../../../shared/validators';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form = new FormGroup<{
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    passwordGroup: FormGroup<{
      password: FormControl<string | null>;
      confirmPassword: FormControl<string | null>;
    }>;
  }>({
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    passwordGroup: new FormGroup<{
      password: FormControl<string | null>;
      confirmPassword: FormControl<string | null>;
    }>(
      {
        password: new FormControl<string | null>(null),
        confirmPassword: new FormControl<string | null>(null),
      },
      { validators: passwordMatchValidator() },
    ),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.value.username!;
      const email = this.form.value.email!;
      const password = this.form.value.passwordGroup?.password!;

      this.authService.register(username, email, password).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/login']);
          }
        },
      });
    }
  }
}
