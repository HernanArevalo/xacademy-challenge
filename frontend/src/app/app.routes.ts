import { Routes } from '@angular/router';
import { FemalePlayersComponent, MalePLayersComponent, PlayerComponent } from './views';

export const routes: Routes = [
  { path: 'landing', 
    component: MalePLayersComponent
  },
  { path: 'players/male', 
    component: MalePLayersComponent
  },
  { path: 'players/female', 
    component: FemalePlayersComponent
  },
  { path: 'player/:player_id/:fifa_version', 
    component: PlayerComponent
  },
  { path: '', 
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  { path: '**', 
    redirectTo: '/landing',
    pathMatch: 'full'
        
  },

];
