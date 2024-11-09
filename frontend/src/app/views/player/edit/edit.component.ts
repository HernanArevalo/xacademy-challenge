import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Player } from '@/core/models';
import { PlayerService } from '@/core/services';
import { getOverallGradientColor, allPlayerPositions, playerPositions } from '@/core/utils';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditPlayerComponent implements OnInit {
  player = {} as Player;
  clubs:string[] = [];
  nations:string[] = [];

  showSelect = false;
  playerPositions = playerPositions
  overallColor: string | null = null;
  genre: string | null = '';
  player_id: string | null = '';
  editPlayerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private titleService: Title
  ) {
    this.editPlayerForm = this.fb.group({
      player_positions: [[]],
    });
  }

  toggleSelect() {
    this.showSelect = !this.showSelect;
  }
  getPlayerPositionEntries() {
    return Object.entries(this.playerPositions);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.genre = params.get('genre');
      this.player_id = params.get('player_id');

      this.loadNationsAndClubs();
      if (
        (this.genre !== 'male' && this.genre !== 'female') ||
        this.player_id == null ||
        this.genre == null ||
        isNaN(Number(this.player_id))
      ) {
        this.router.navigate(['/players/male']);
      } else {
        this.loadPlayer(this.genre, Number(this.player_id));
      }
    });

    this.editPlayerForm = this.fb.group({
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      nationality_name: ['', Validators.required],
      club_name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      fifa_version: [null, [Validators.required, Validators.min(15), Validators.max(23)]],
      height_cm: [null, [Validators.required, Validators.min(1), Validators.max(220)]],
      weight_kg: [null, [Validators.required, Validators.min(1), Validators.max(220)]],
      overall: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      pace: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      shooting: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      passing: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      dribbling: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      physic: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      attacking_crossing: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      attacking_finishing: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      attacking_volleys: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      skill_dribbling: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      movement_agility: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      defending: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      defending_standing_tackle: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      defending_sliding_tackle: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      mentality_positioning: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      mentality_interceptions: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
    });

    this.editPlayerForm.get('overall')?.valueChanges.subscribe((newOverallValue: number) => {
      this.overallColor = getOverallGradientColor(newOverallValue);
    });

    console.log(this.editPlayerForm.get('player_positions')?.value);
  }

  

  loadPlayer(genre: string, player_id: number) {
    this.playerService.getPlayer(genre, player_id).subscribe({
      next: (res) => {
        this.player = res.player;
        this.player.player_positions = res.player.player_positions.split(',')[0]
        this.overallColor = getOverallGradientColor(res.player.overall);
        this.titleService.setTitle(`EDIT ${this.player.long_name} | PlayME`);

        this.editPlayerForm.patchValue(res.player);
      },
      error: (err) => {
        console.warn('Something went wrong', err);
      },
    });
  }
  
  loadNationsAndClubs() {
    this.playerService.getClubsList(this.genre!).subscribe({
      next: (res) => {
        this.clubs = res.clubs;
      },
      error: (err) => {
        console.warn('Something went wrong', err);
      },
    });
    this.playerService.getNationsList(this.genre!).subscribe({
      next: (res) => {
        this.nations = res.nations;
      },
      error: (err) => {
        console.warn('Something went wrong', err);
      },
    });
  }

  savePlayer() {
    if (this.editPlayerForm.valid) {
      const updatedPlayer = this.editPlayerForm.value;
      console.log('Player data to save:', updatedPlayer);
    } else {
      // Mostrar errores específicos de cada campo
      Object.keys(this.editPlayerForm.controls).forEach((controlName) => {
        const control = this.editPlayerForm.get(controlName);
        if (control && control.invalid) {
          console.log(`Errors for ${controlName}:`, control.errors);
        }
      });
  
      console.log('Form is invalid');
    }
  }
  
}
