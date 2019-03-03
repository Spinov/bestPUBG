import { Component, OnInit } from '@angular/core';
import {StatService} from './stat.service';

export interface StatInterface {
  assists: number;
  bestRankPoint: number;
  boosts: number;
  dBNOs: number;
  dailyKills: number;
  dailyWins: number;
  damageDealt: number;
  days: number;
  headshotKills: number;
  heals: number;
  killPoints: number;
  kills: number;
  longestKill: number;
  longestTimeSurvived: number;
  losses: number;
  maxKillStreaks: number;
  mostSurvivalTime: number;
  rankPoints: number;
  rankPointsTitle: string;
  revives: number;
  rideDistance: number;
  roadKills: number;
  roundMostKills: number;
  roundsPlayed: number;
  suicides: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  top10s: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  weeklyKills: number;
  weeklyWins: number;
  winPoints: number;
  wins: number;
}

const ELEMENT_DATA: StatInterface[] = [
  {
    assists: 0,
    bestRankPoint: 0.0,
    boosts: 0,
    dBNOs: 0,
    dailyKills: 0,
    dailyWins: 0,
    damageDealt: 0.0,
    days: 0,
    headshotKills: 0,
    heals: 0,
    killPoints: 0,
    kills: 0,
    longestKill: 0.0,
    longestTimeSurvived: 0.0,
    losses: 0,
    maxKillStreaks: 0,
    mostSurvivalTime: 0.0,
    rankPoints: 0.0,
    rankPointsTitle: '0-0',
    revives: 0,
    rideDistance: 0.0,
    roadKills: 0,
    roundMostKills: 0,
    roundsPlayed: 0,
    suicides: 0,
    swimDistance: 0.0,
    teamKills: 0,
    timeSurvived: 0.0,
    top10s: 0,
    vehicleDestroys: 0,
    walkDistance: 0.0,
    weaponsAcquired: 0,
    weeklyKills: 0,
    weeklyWins: 0,
    winPoints: 0,
    wins: 0
  },

];

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
// TODO .data.attributes.gameModeStats.solo
// TODO .data.attributes.gameModeStats.duo
// TODO .data.attributes.gameModeStats.squad
// TODO .data.attributes.gameModeStats.solo-fpp
// TODO .data.attributes.gameModeStats.duo-fpp
// TODO .data.attributes.gameModeStats.squad-fpp


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
  public display = false;

  displayedColumns: string[] = ['solo', 'duo', 'squad', 'solo-fpp', 'duo-fpp', 'squad-fpp'];
  dataSource = ELEMENT_DATA;

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
        (requestData: any) => {
          console.log('getSeasonStat', requestData);
        },
        error => {
          if (error.status === '404') {
            alert('You don\'t play in this season');
          }
        }
      );
    }

    showData() {
    this.display = true;
    }
}
