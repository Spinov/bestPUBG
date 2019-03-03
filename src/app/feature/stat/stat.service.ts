import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  // Кэшированные данные
  private playerObs$ = new ReplaySubject(1);
  private seasonObs$ = new ReplaySubject(1);
  private seasonDataObs$ = new ReplaySubject(1);

  private bcUrl = 'https://api.pubg.com';

  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/vnd.api+json',
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZWIzZTVhMC0xYzhjLTAxMzctNzNmYy0wZTM1MzFmZGJkNWEiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTUxMjUxNDI3LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImJlc3RwdWJnIn0.ZEYufZqoF5Hd1pjzriVc5DsHlza0p6_KG4pcLoMWuoU'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

// Получение всех сезонов
  getSeasons(forceRefresh?: boolean) {
    if (!this.seasonObs$.observers.length || forceRefresh) {
      this.http.get(`${this.bcUrl}/shards/steam/seasons`, this.httpOptions).subscribe(
        data => this.seasonObs$.next(data),
        error => {
          this.seasonObs$.error(error);
          this.seasonObs$ = new ReplaySubject(1);
        }
      );
    }
    return this.seasonObs$;
  }

// Получение информации игрога. Его id, матчи
  getPlayerByName(name, forceRefresh?: boolean) {
    if (!this.playerObs$.observers.length || forceRefresh) {
      this.http.get(`${this.bcUrl}/shards/steam/players?filter[playerNames]=${name}`, this.httpOptions).subscribe(
        data => this.playerObs$.next(data),
        error => {
          this.playerObs$.error(error);
          this.playerObs$ = new ReplaySubject(1);
        }
      );
    }
    return this.playerObs$;
  }

  // Получение полной статистики по сезону
  getSeasonStat(account, season): any {
     return this.http.get(`${this.bcUrl}/shards/steam/players/${account}/seasons/${season}`, this.httpOptions);
    }
}
