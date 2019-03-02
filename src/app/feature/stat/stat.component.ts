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
// TODO material || bootstrap || another one


     ///////////////////////////////////////////////
    ///                                         ///
   ///              Ники для теста:            ///
  ///              shroud, Spinov             ///
 ///                                         ///
///////////////////////////////////////////////


export class StatComponent implements OnInit {
  public player: '';

  constructor(
    private statService: StatService
  ) { }

  ngOnInit() {
  // test getSeasonStat
    // this.getSeasonStat('account.9dcf0e42b3dd4f1e89a0735750b04083', 'division.bro.official.pc-2018-02');
  }

  getPlayerByName(name) {
      this.statService.getPlayerByName(name).subscribe(
        requestData => {
          console.log('getPlayerByName', requestData);
        },
        // handle the error, otherwise will break the Observable
        error => console.log(error)
      );
      this.getSeasons();
    }

  getSeasons() {
      this.statService.getSeasons().subscribe(
        requestData => {
          console.log('getSeasons', requestData);
        },
        // handle the error, otherwise will break the Observable
        error => console.log(error)
      );
    }

  getSeasonStat(account, season) {
      this.statService.getSeasonStat(account, season).subscribe(
        requestData => {
          console.log('getSeasonStat', requestData);
        },
        // handle the error, otherwise will break the Observable
        error => console.log(error)
      );
    }
}
