import { Component, OnInit } from '@angular/core';
import {StatService} from './stat.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})


// TODO getSeasonStat возвращает много данных. Вывести в таблицу
// TODO дизайн
// TODO steam API
// TODO Overwolf  API
// TODO посмотреть CDK https://github.com/martinsileno/pubg-typescript-api / https://www.npmjs.com/package/pubg-typescript-api


     ///////////////////////////////////////////////
    ///                                         ///
   ///              Ники для теста:            ///
  ///              shroud, Spinov             ///
 ///                                         ///
///////////////////////////////////////////////


export class StatComponent implements OnInit {
  public player: '';
  public playerId = localStorage.getItem('player_id');
  public seasons = [];

  constructor(
    private statService: StatService
  ) { }

  ngOnInit() {
  // test getSeasonStat
    // this.getSeasonStat('account.9dcf0e42b3dd4f1e89a0735750b04083', 'division.bro.official.pc-2018-02');
  }

  getPlayerByName(name) {
      this.statService.getPlayerByName(name).subscribe(
        (requestData: any) => {
          console.log('getPlayerByName', requestData);
          localStorage.setItem('player_id', requestData.data[0].id);
          localStorage.setItem('player_name', requestData.data[0].attributes.name);
        },
        error => console.log(error)
      );
      this.getSeasons();
    }

  getSeasons() {
      this.statService.getSeasons().subscribe(
        (requestData: any) => {
          this.seasons = requestData.data;
          console.log('getSeasons', requestData);
        },
        error => console.log(error)
      );
    }

  getSeasonStat(account, season) {
      this.statService.getSeasonStat(account, season).subscribe(
        requestData => {
          console.log('getSeasonStat', requestData);
        },
        error => {
          if (error.status === '404') {
            alert('You don\'t play in this season');
          }
        }
      );
    }
}
