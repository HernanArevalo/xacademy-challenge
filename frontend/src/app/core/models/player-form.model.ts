export interface PlayerForm {
  long_name: string,
  player_positions: string,
  nationality_name: string,
  height_cm: number,
  weight_kg: number,
  overall: number,
  fifa_version: number,
  age: number,

  pace: number,
  shooting: number,
  passing: number,
  dribbling: number,
  physic: number,
  
  attacking_crossing: number,
  attacking_finishing: number,
  attacking_volleys: number,
  skill_dribbling: number,
  movement_agility: number,
  
  defending: number,
  defending_standing_tackle: number,
  defending_sliding_tackle: number,
  mentality_positioning: number,
  mentality_interceptions: number,
}