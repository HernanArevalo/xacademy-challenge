import { Routes } from '@angular/router';
import { PlayersComponent, PlayerComponent, EditPlayerComponent, LoginComponent, RegisterComponent } from './views';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
  },
  { 
    path: 'register', 
    component: RegisterComponent,
  },
  { 
    path: 'players/:genre', 
    component: PlayersComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'players/:genre/:player_id', 
    component: PlayerComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'players/:genre/:player_id/edit', 
    component: EditPlayerComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    redirectTo: 'players/male',
    pathMatch: 'full',
  },
  { 
    path: '**', 
    redirectTo: 'players/male', 
    pathMatch: 'full',
  }
];
