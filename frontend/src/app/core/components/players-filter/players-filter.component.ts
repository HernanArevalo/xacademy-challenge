import { Component, Input } from '@angular/core';
import { PlayerService } from '@/core/services/';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { fifaVersions, playerPositions } from '@/core/utils';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-filter',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './players-filter.component.html',
  styleUrls: ['./players-filter.component.scss']
})
export class PlayersFilterComponent {
  @Input() genre!: string;
  club_name: { [key: string]: string[] } = {};
  nationality_name: { [key: string]: string[] } = {};
  fifa_versions = fifaVersions;
  player_positions = playerPositions;
  filterForm: FormGroup;

  subscription = new Subscription();

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {

    this.filterForm = new FormGroup({
      player_positions: new FormControl(''),
      club_name: new FormControl(''),
      nationality_name: new FormControl(''),
      fifa_version: new FormControl('')
    });
  }

  ngOnInit() {
    this.subscription.add(this.loadClubsAndNations());
  }

  loadClubsAndNations() {
    this.playerService.getClubsList(this.genre).subscribe({
      next: res => {
        this.club_name = this.groupByAlphabet(res.clubs);
      },
      error: err => console.warn('Something went wrong', err)
    });

    this.playerService.getNationsList(this.genre).subscribe({
      next: res => {
        this.nationality_name = this.groupByAlphabet(res.nations);
      },
      error: err => console.warn('Something went wrong', err)
    });
  }

  groupByAlphabet(items: string[]): { [key: string]: string[] } {
    return items.reduce((groups, item) => {
      let letter = item[0] ? item[0].toUpperCase() : "";

      if (letter === "") {
        letter = "Empty";
      } else if (/^[0-9]/.test(letter)) {
        letter = "123";
      } else if (!/^[A-Z]/.test(letter)) {
        letter = "Others";
      }

      groups[letter] = groups[letter] || [];
      groups[letter].push(item);
      return groups;
    }, {} as { [key: string]: string[] });
  }

  getPlayerPositionEntries() {
    return Object.entries(this.player_positions);
  }

  keyComparator = (a: any, b: any): number => a.key.localeCompare(b.key);

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
  
}
