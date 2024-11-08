import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RadarChartComponent } from '@/core/components';
import { Player, RadarStats } from '../../core/models';
import { PlayerService } from '@/core/services';
import { CommonModule } from '@angular/common';
import { getOverallGradientColor } from '@/core/utils';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [ RadarChartComponent, CommonModule ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  player = {} as Player;
  generalStats!: RadarStats;
  attackStats!: RadarStats;
  defenseStats!: RadarStats;
  overallColor: string|null = null;

  genre: string | null = '';
  player_id: string | null = '';
  fifa_version: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.genre = params.get('genre');
      this.player_id = params.get('player_id');


      if (
        (this.genre !== 'male' && this.genre !== 'female') 
        || this.player_id == null 
        || this.genre == null
        || isNaN(Number(this.player_id))
      ) {
        this.router.navigate(['/players/male']);
      } else {
        this.loadPlayer(this.genre,Number(this.player_id));
      }

    });
  }

    loadPlayer(genre: string,player_id:number) {
      this.playerService.getPlayer(genre,player_id).subscribe({
        next: res => {
          this.player = res.player
          this.overallColor = getOverallGradientColor(res.player.overall)

        },
        error: err => {
          console.warn('Something went wrong', err);
        },
        complete: () => {
        }
      });

    this.generalStats = {
      name: 'GENERAL',
      color: 'rgba(0, 255, 0, 1)',
      stats: {
        PACE: this.player.pace || 0,
        SHOOTING: this.player.shooting || 0,
        PASSING: this.player.passing || 0,
        DRIBBLING: this.player.dribbling || 0,
        DEFENDING: this.player.defending || 0,
        PHYSICAL: this.player.physic || 0,
      },
    };
    this.attackStats = {
      name: 'GENERAL',
      color: 'rgba(255, 0, 0, 1)',
      stats: {}
    }
    this.defenseStats = {
      name: 'GENERAL',
      color: 'rgba(255, 0, 0, 1)',
      stats: {
      DEFENDING: this.player.defending || 0,
      DEFENDING_STANDING_TACKLE: this.player.defending_standing_tackle || 0,
      DEFENDING_SLIDING_TACKLE: this.player.defending_sliding_tackle || 0,
      DEFENDING_MARKING: this.player.defending_marking || 0,
      INTERCEPTIONS: this.player.mentality_interceptions || 0}
    }
  }
}
