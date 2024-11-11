import { Injectable } from '@angular/core';
import { Player, PlayerForm } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  apiUrl = 'http://localhost:8080'

  constructor( private httpClient: HttpClient ) { }

  getPlayers (genre: string, limit: number, page: number, otherParams: Record<string, any>): Observable<{ ok: boolean; players: Player[], totalCount: number }> {
    const acceptedKeys = ["club_name", "nationality_name", "fifa_version", "player_positions", "long_name", "overall"];
  
    const paramsFiltered = Object.keys(otherParams)
      .filter(key => acceptedKeys.includes(key))
      .reduce((acc: Record<string, any>, key) => {
        acc[key] = otherParams[key];
        return acc;
      }, {} as Record<string, any>);
  
    const queryParams = new URLSearchParams({ limit: limit.toString(), page: page.toString(), ...paramsFiltered }).toString();

    return this.httpClient.get<{ ok: boolean; players: Player[], totalCount: number }>(`${this.apiUrl}/players/${genre}?${queryParams}`);
  }
  
  getPlayer (genre: string,player_id:number): Observable<{ok:boolean, player:Player}> {
    return this.httpClient.get<{ok:boolean, player:Player}>(`${this.apiUrl}/players/${genre}/${player_id}`)
  }
  putPlayer (genre: string,player_id:number, playerOptions: PlayerForm): Observable<{ok:boolean, player:Player}> {
    return this.httpClient.put<{ok:boolean, player:Player}>(`${this.apiUrl}/players/${genre}/${player_id}`, playerOptions)
  }
  postPlayer (genre:string, playerOptions: PlayerForm): Observable<{ok:boolean, player:Player}> {
    return this.httpClient.put<{ok:boolean, player:Player}>(`${this.apiUrl}/players/${genre}/0`, playerOptions)
  }
  getClubsList (genre:string): Observable<{ok:boolean, clubs:string[]}> {
    return this.httpClient.get<{ok:boolean, clubs:string[]}>(`${this.apiUrl}/clubs/${genre}`)
  }
  getNationsList (genre:string): Observable<{ok:boolean, nations:string[]}> {
    return this.httpClient.get<{ok:boolean, nations:string[]}>(`${this.apiUrl}/nations/${genre}`)
  }
  postFeatures (player:Player): Observable<{message:string}> {
    return this.httpClient.post<{message:string}>(this.apiUrl, player)
  }

}
