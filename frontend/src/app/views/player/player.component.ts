import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RadarChartComponent } from '@/core/components';
import { Player, RadarStats } from '@/core/models';
import { PlayerService } from '@/core/services';
import { getOverallGradientColor } from '@/core/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [ RadarChartComponent, CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit {
  title = 'das';

  player = {} as Player;
  stats = {} as RadarStats;
  overallColor: string|null = null;

  genre: string | null = '';
  player_id: string | null = '';
  fifa_version: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.genre = params.get('genre');
      this.player_id = params.get('player_id');


      if (
        (!['male','female'].includes(this.genre!)) 
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
  
  loadPlayer(genre: string, player_id: number) {
    this.playerService.getPlayer(genre, player_id).subscribe({
      next: res => {
        this.player = res.player;
        this.player.player_positions = res.player.player_positions.split(',')[0]
        this.overallColor = getOverallGradientColor(res.player.overall);
  
        const newStats = {
        generalStats: {
          name: 'GENERAL',
          color: 'rgba(0, 255, 0, 0.5)',
          labels: [
            "PACE",
            "SHOOTING",
            "PASSING",
            "DRIBBLING",
            "PHYSICAL",
          ],
          stats: [
            this.player.pace,
            this.player.shooting,
            this.player.passing,
            this.player.dribbling,
            this.player.physic
          ],
        },
        attackStats: {
          name: 'ATTACK',
          color: 'rgba(255, 0, 0, 0.5)',
          labels: [
            "CROSSING",
            "FINISHING",
            "VOLLEYS",
            "DRIBBLING",
            "AGILITY"
          ],
          stats: [
            this.player.attacking_crossing,
            this.player.attacking_finishing,
            this.player.attacking_volleys,
            this.player.skill_dribbling,
            this.player.movement_agility
          ]
        },
        defenseStats: {
          name: 'DEFENSE',
          color: 'rgba(0, 0, 255, 0.5)',
          labels: [
            "DEFENDING",
            "STANDING TACKLE",
            "SLIDING TACKLE",
            "POSITIONING",
            "INTERCEPTIONS"
          ],
          stats: [
            this.player.defending,
            this.player.defending_standing_tackle,
            this.player.defending_sliding_tackle,
            this.player.mentality_positioning,
            this.player.mentality_interceptions
          ]
        }}
  
        this.stats = newStats;
        this.titleService.setTitle(`${this.player.long_name} | PlayME`);
      },
      error: err => {
        if (this.player_id == '0') {
          this.router.navigate(['/players', this.genre, '0', 'edit' ]);
        }else{
          console.warn('Something went wrong', err);
          this.router.navigate(['/players', this.genre]);
        }
      },
      complete: () => {}
    });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  }
}
