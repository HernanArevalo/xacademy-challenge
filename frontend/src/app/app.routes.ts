import { Routes } from '@angular/router';
import { PlayersComponent, PlayerComponent } from './views';

export const routes: Routes = [
  { 
    path: 'players/:genre', 
    component: PlayersComponent,
    title: `Players | PlayME`
  },
  { 
    path: 'players/:genre/:player_id/:fifa_version', 
    component: PlayerComponent
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
