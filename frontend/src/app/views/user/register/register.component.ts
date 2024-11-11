import { RegisterForm } from '@/core/models';
import { UserService } from '@/core/services';
import { Toast } from '@/core/utils';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterLink, RouterLinkActive ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formModel = {
    name: '',
    email: '',
    password: '',
  } as RegisterForm;
  errorMessage: string|null = null;

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService

  ) {
  }
  
  ngOnInit() {
    this.titleService.setTitle('Register')
    
  }

  register() {
    this.userService.registerUser(this.formModel).subscribe({
      next: res => {
        Toast({title:'User registered!', background:'rgb(0,122,0)', icon:'success'})
        this.router.navigate(['/login'])
      },
      error: err => {
        console.warn('Something went wrong', {err});
        // this.errorMessage = err.error.message
        this.errorMessage = 'Email already in use'
      }
    });


  }
}
