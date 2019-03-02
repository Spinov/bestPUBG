import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatService {

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
  getSeasons(): any {
    return this.http.get(`${this.bcUrl}/shards/steam/seasons`, this.httpOptions);
  }
// Получение информации игрога. Его id, матчи
   getPlayerByName(name): any {
    return this.http.get(`${this.bcUrl}/shards/steam/players?filter[playerNames]=${name}`, this.httpOptions);
  }
// Получение полной статистики по сезону
  getSeasonStat(account, season): any {
    return this.http.get(`${this.bcUrl}/shards/steam/players/${account}/seasons/${season}`, this.httpOptions);

  }

}
