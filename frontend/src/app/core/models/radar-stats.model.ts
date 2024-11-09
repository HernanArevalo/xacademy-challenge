export interface RadarStats {
  generalStats: {
    name: string;
    color: string;
    labels: string[];
    stats: number[];

  };
  attackStats: {
    name: string;
    color: string;
    labels: string[];
    stats: number[];
  };
  defenseStats: {
    name: string;
    color: string;
    labels: string[];
    stats: number[];
  };
}
export interface RadarStat {
  name: string;
  color: string;
  labels: string[];
  stats: number[];

}
