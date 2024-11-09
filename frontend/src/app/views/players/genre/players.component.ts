import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '@/core/models';
import { PlayerService } from '@/core/services';
import { PlayerListItemComponent, PlayersFilterComponent } from '@/core/components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

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
  hasMore: boolean = false;
  totalCount: number = 0;
  otherParams = {};
  isLoading: boolean = false;

  filterForm: FormGroup;

  subscription = new Subscription();

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private titleService: Title
  ) {
    this.filterForm = this.fb.group({
      club_name: [''],
      nationality_name: [''],
      fifa_version: [''],
      player_positions: ['']
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        this.genre = params.get('genre') || '';
        if (!['male', 'female'].includes(this.genre)) {
          this.router.navigate(['/players/male']);
        } else {
          this.subscription.add(
            this.route.queryParamMap.subscribe(queryParams => {
              this.limit = +queryParams.get('limit')! || this.limit;
              this.page = +queryParams.get('page')! || this.page;

              const otherParams = Object.fromEntries(
                Array.from(queryParams.keys).map(key => [key, queryParams.get(key)]).filter(([_, value]) => value !== null)
              );
              this.otherParams = otherParams;

              this.loadPlayers();
            })
          );
        }
      })
    );

    this.filterForm.valueChanges.subscribe(() => {
      console.log('form');
      this.onSearch();
    });
  }

  onSearch() {
    const queryParams = Object.entries(this.filterForm.value)
      .reduce((params, [key, value]) => {
        if (value !== '') {
          params[key] = value;
        }
        return params;
      }, {} as { [key: string]: any });

    this.router.navigate(['/players', this.genre], { queryParams });
  }

  loadPlayers() {
    this.isLoading = true;
    this.titleService.setTitle(`${this.genre.charAt(0).toUpperCase()+this.genre.slice(1).toLowerCase()} Players | PlayME`);
    this.playerService.getPlayers(this.genre, this.limit, this.page, this.otherParams).subscribe({
      next: res => {
        this.players = res.players;
        this.totalCount = res.totalCount;
        this.hasMore = this.players.length < this.totalCount;
        this.isLoading = false;
      },
      error: err => {
        console.warn('Something went wrong', err);
        this.isLoading = false;
      }
    });
  }

  loadMorePlayers() {
    if (this.isLoading) return;
    this.isLoading = true;
    this.page += 1;
    this.playerService.getPlayers(this.genre, this.limit, this.page, this.otherParams).subscribe({
      next: res => {
        this.players.push(...res.players);
        this.hasMore = this.players.length < this.totalCount;
        this.isLoading = false;
      },
      error: err => {
        console.warn('Something went wrong', err);
        this.isLoading = false;
      }
    });
  }

  isOtherParamsEmpty(): boolean {
    return Object.keys(this.otherParams).length === 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
