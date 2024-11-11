import { LoginForm } from '@/core/models';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService, AuthService } from '@/core/services';
import { Toast } from '@/core/utils';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formModel = {
    email: '',
    password: '',
  } as LoginForm;
  errorMessage: string|null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  login() {
    this.userService.loginUser(this.formModel).subscribe({
      next: res => {
        if (res.ok) {
          const {token} = res.user
          Toast({title:'Welcome!', background:'rgb(0,122,0)', icon:'success'})
          this.authService.login(token, res.user)  
          this.router.navigate(['/players/male'])
        }
      },
      error: err => {
        console.warn('Something went wrong', err);
        this.errorMessage = err.error.message

      }
    });
  }
}
