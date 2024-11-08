import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Player } from '@/core/models';
import { PlayerService } from '@/core/services';
import { PlayerListItemComponent, PlayersFilterComponent } from '@/core/components';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [CommonModule, PlayersFilterComponent, PlayerListItemComponent],
  templateUrl: './players.component.html',
  styleUrl: './players.component.scss'
})
export class PlayersComponent implements OnInit, OnDestroy {
  players: Player[] = [];
  genre: string = "male";
  page: number = 1;
  limit: number = 20;
  otherParams = {};

  subscription = new Subscription();

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        this.genre = params.get('genre') || '';
        if (this.genre !== 'male' && this.genre !== 'female') {
          this.router.navigate(['/players/male']);
        } else {
          this.route.queryParamMap.subscribe(queryParams => {
            const queryParamsObject: { [key: string]: any } = {};
            queryParams.keys.forEach(key => {
              queryParamsObject[key] = queryParams.get(key);
            });

            const { limit = this.limit, page = this.page, ...rest } = queryParamsObject;
            this.otherParams = rest;

            this.limit = +limit;
            this.page = +page;

            this.loadPlayers();
          });
        }
      })
    );
  }

  loadPlayers() {
    this.playerService.getPlayers(this.genre, this.limit, this.page, this.otherParams).subscribe({
      next: res => {
        this.players = res.players;
      },
      error: err => {
        console.warn('Something went wrong', err);
      }
    });
  }

  loadMorePlayers(){
    this.playerService.getPlayers(this.genre, this.limit+20, this.page, this.otherParams).subscribe({
      next: res => {
        this.players.push(...res.players)
        this.page += 1
      },
      error: err => {
        console.warn('Something went wrong', err);
      }
    });
  }

  getOverallGradientColor(overall: number): string {
    const hue = Math.min(120, Math.max(0, (overall - 60) * (120 / 40)));
    return `hsl(${hue}, 80%, 50%)`;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
