import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RadarChartComponent } from '../../core';
import { Player, RadarStats } from '../../models';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [RadarChartComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  player: Player = {
    player_id: 158023,
    player_url: '/player/158023/lionel-messi/150002',
    fifa_version: 15,
    fifa_update: 2,
    fifa_update_date: '18/9/2014',
    short_name: 'L. Messi',
    long_name: 'Lionel Andrés Messi Cuccittini',
    player_positions: 'CF',
    overall: 93,
    potential: 95,
    value_eur: 100500000,
    wage_eur: 550000,
    age: 27,
    dob: '24/6/1987',
    height_cm: 169,
    weight_kg: 67,
    league_id: 53,
    league_name: 'La Liga',
    league_level: 1,
    club_team_id: 241,
    club_name: 'FC Barcelona',
    club_position: 'CF',
    club_jersey_number: 10,
    club_loaned_from: '',
    club_joined_date: '1/7/2004',
    club_contract_valid_until_year: 2018,
    nationality_id: 52,
    nationality_name: 'Argentina',
    nation_team_id: 1369,
    nation_position: 'CF',
    nation_jersey_number: 10,
    preferred_foot: 'Left',
    weak_foot: 3,
    skill_moves: 4,
    international_reputation: 5,
    work_rate: 'Medium/Low',
    body_type: 'Normal (170-)',
    real_face: 'Yes',
    release_clause_eur: null,
    player_tags:
      '#Speedster, #Dribbler, #FK Specialist, #Acrobat, #Clinical Finisher, #Complete Forward',
    player_traits:
      'Finesse Shot, Speed Dribbler (AI), One Club Player, Team Player',
    pace: 93,
    shooting: 89,
    passing: 86,
    dribbling: 96,
    defending: 27,
    physic: 63,
    attacking_crossing: 84,
    attacking_finishing: 94,
    attacking_heading_accuracy: 71,
    attacking_short_passing: 89,
    attacking_volleys: 85,
    skill_dribbling: 96,
    skill_curve: 89,
    skill_fk_accuracy: 90,
    skill_long_passing: 76,
    skill_ball_control: 96,
    movement_acceleration: 96,
    movement_sprint_speed: 90,
    movement_agility: 94,
    movement_reactions: 94,
    movement_balance: 95,
    power_shot_power: 80,
    power_jumping: 73,
    power_stamina: 77,
    power_strength: 60,
    power_long_shots: 88,
    mentality_aggression: 48,
    mentality_interceptions: 22,
    mentality_positioning: 92,
    mentality_vision: 90,
    mentality_penalties: 76,
    mentality_composure: 96,
    defending_marking_awareness: 30,
    defending_standing_tackle: 27,
    defending_sliding_tackle: 26,
    goalkeeping_diving: 6,
    goalkeeping_handling: 11,
    goalkeeping_kicking: 15,
    goalkeeping_positioning: 14,
    goalkeeping_reflexes: 8,
    goalkeeping_speed: null,
    ls: '89+3',
    st: '89+3',
    rs: '89+3',
    lw: '92+3',
    lf: '90+3',
    cf: '90+3',
    rf: '90+3',
    rw: '92+3',
    lam: '92+3',
    cam: '92+3',
    ram: '92+3',
    lm: '90+3',
    lcm: '79+3',
    cm: '79+3',
    rcm: '79+3',
    rm: '90+3',
    lwb: '62+3',
    ldm: '62+3',
    cdm: '62+3',
    rdm: '62+3',
    rwb: '62+3',
    lb: '54+3',
    lcb: '45+3',
    cb: '45+3',
    rcb: '45+3',
    rb: '54+3',
    gk: '15+3',
    player_face_url: 'https://cdn.sofifa.net/players/158/023/15_120.png',
  };
  generalStats!: RadarStats;
  attackStats!: RadarStats;
  defenseStats!: RadarStats;

  player_id: string | null = '';
  fifa_version: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.player_id = params.get('id');
    });

    this.generalStats = {
      name: 'GENERAL',
      color: 'rgba(0, 255, 0, 1)',
      stats: {
        PACE: this.player.pace,
        SHOOTING: this.player.shooting,
        PASSING: this.player.passing,
        DRIBBLING: this.player.dribbling,
        DEFENDING: this.player.defending,
        PHYSICAL: this.player.physic,
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
      DEFENDING: this.player.defending,
      DEFENDING_STANDING_TACKLE: this.player.defending_standing_tackle,
      DEFENDING_SLIDING_TACKLE: this.player.defending_sliding_tackle,
      DEFENDING_MARKING_AWARENESS: this.player.defending_marking_awareness,
      INTERCEPTIONS: this.player.mentality_interceptions}
    }
  }
}
