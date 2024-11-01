const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const FemalePlayer = sequelize.define('FemalePlayer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fifa_version: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fifa_update: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player_face_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  long_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player_positions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nationality_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  overall: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  potential: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  value_eur: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  wage_eur: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  height_cm: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight_kg: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  preferred_foot: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weak_foot: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_moves: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  international_reputation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  work_rate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  body_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pace: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  shooting: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  passing: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dribbling: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  defending: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  physic: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attacking_crossing: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attacking_finishing: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attacking_heading_accuracy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attacking_short_passing: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  attacking_volleys: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_dribbling: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_curve: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_fk_accuracy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_long_passing: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_ball_control: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  movement_acceleration: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  movement_sprint_speed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  movement_agility: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  movement_reactions: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  movement_balance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  power_shot_power: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  power_jumping: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  power_stamina: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  power_strength: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  power_long_shots: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_aggression: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_interceptions: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_positioning: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_vision: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_penalties: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mentality_composure: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  defending_marking: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  defending_standing_tackle: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  defending_sliding_tackle: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_diving: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_handling: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_kicking: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_positioning: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_reflexes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  goalkeeping_speed: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  player_traits: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'female_players',
  timestamps: false,
});

module.exports = FemalePlayer;
