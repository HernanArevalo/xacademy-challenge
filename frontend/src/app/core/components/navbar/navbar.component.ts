import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  malePlayerId: number | null = null;
  femalePlayerId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(user => {
      if (user) {
        this.malePlayerId = user.male_player_id;
        this.femalePlayerId = user.female_player_id;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
