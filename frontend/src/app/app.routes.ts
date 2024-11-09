import { Routes } from '@angular/router';
import { PlayersComponent, PlayerComponent, EditPlayerComponent } from './views';

export const routes: Routes = [
  { 
    path: 'players/:genre', 
    component: PlayersComponent,
  },
  { 
    path: 'players/:genre/:player_id', 
    component: PlayerComponent
  },
  { 
    path: 'players/:genre/:player_id/edit', 
    component: EditPlayerComponent
  },
  { 
    path: '', 
    redirectTo: 'players/male',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: 'players/male', 
    pathMatch: 'full' 
  }
];
