import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Player } from '@/core/models';
import { PlayerService } from '@/core/services';
import { PlayerListItemComponent, PlayersFilterComponent } from '@/core/components';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      club_name: [''],
      nationality_name: [''],
      fifa_version: [''],
      player_positions: ['']
    });
  }

  ngOnInit() {
    // Suscripción a los parámetros de la ruta
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        this.genre = params.get('genre') || '';
        if (!['male', 'female'].includes(this.genre)) {
          this.router.navigate(['/players/male']);
        } else {
          // Suscripción a los parámetros de la consulta
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

    // Escuchar los cambios del formulario y ejecutar la búsqueda
    this.filterForm.valueChanges.subscribe(() => {
      console.log('form');
      this.onSearch();
    });
  }


  // Método para realizar la búsqueda
  onSearch() {
    const queryParams = Object.entries(this.filterForm.value)
      .reduce((params, [key, value]) => {
        if (value !== '') {
          params[key] = value;
        }
        return params;
      }, {} as { [key: string]: any });

    // Navegar con los nuevos parámetros de consulta
    this.router.navigate(['/players', this.genre], { queryParams });
  }

  // Método para cargar los jugadores
  loadPlayers() {
    this.isLoading = true;
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

  // Método para cargar más jugadores
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

  // Método para verificar si los parámetros adicionales están vacíos
  isOtherParamsEmpty(): boolean {
    return Object.keys(this.otherParams).length === 0;
  }

  // Liberar las suscripciones al destruir el componente
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
