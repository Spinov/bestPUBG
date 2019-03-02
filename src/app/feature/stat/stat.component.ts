import { Component, OnInit } from '@angular/core';
import {StatService} from './stat.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})


// TODO вместо записи в localStorage кешировать (добавил для избежание блокировки на 1 мин после 10 запросов)
// TODO getSeasonStat возвращает много данных. Вывести в таблицу
// TODO дизайн
// TODO steam API
// TODO Overwolf  API
// TODO посмотреть CDK https://github.com/martinsileno/pubg-typescript-api / https://www.npmjs.com/package/pubg-typescript-api
// TODO material || bootstrap || another one


     ///////////////////////////////////////////////
    ///                                         ///
   ///              Ники для теста:            ///
  ///              shroud, Spinov             ///
 ///                                         ///
///////////////////////////////////////////////


export class StatComponent implements OnInit {
  public player: '';
  public playerInfo;
  public seasons;
  public statPerSeason;

  constructor(
    private statService: StatService
  ) { }

  ngOnInit() {
    if (localStorage.getItem(name) && localStorage.getItem('seasons')) {
      this.getSeasonStat('account.9dcf0e42b3dd4f1e89a0735750b04083', 'division.bro.official.pc-2018-02');
    }
  }
    getPlayer(name) {
      if (!localStorage.getItem(name)) {
        this.statService.getPlayerByName(name).subscribe(player => {
          this.playerInfo = player;
          localStorage.setItem(name, JSON.stringify(player));
          console.log('player info', player);
          this.getSeasons();
        });
      } else {
        console.log('local_seasons', JSON.parse(localStorage.getItem(name)));
      }
    }

    getSeasons() {
      if (!localStorage.getItem('seasons')) {
        this.statService.getSeasons().subscribe(seasonsData => {
          this.seasons = seasonsData;
          localStorage.setItem('seasons', JSON.stringify(seasonsData));
          console.log('seasons', seasonsData);
        });
      } else {
        console.log('local_seasons', JSON.parse(localStorage.getItem('seasons')));
      }
    }

    getSeasonStat(account, season) {
      if (!localStorage.getItem('seasonStat')) {
        this.statService.getSeasonStat(account, season).subscribe(seasonStat => {
          this.statPerSeason = seasonStat;
          localStorage.setItem('seasonStat', JSON.stringify(seasonStat));
          console.log('seasonStat', seasonStat);
        });
      } else {
        console.log('local_seasonStat', JSON.parse(localStorage.getItem('seasonStat')));
      }
    }
}
