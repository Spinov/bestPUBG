import { Component, OnInit } from '@angular/core';
import {Match, PlatformRegion, Player, PlayerSeason, PubgAPI, Season} from 'pubg-typescript-api';

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZmIxNmYyMC0yMTU1LTAxMzctNWUwNi00OTE2ZGJjNGIyNjgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTUxNzc3NDU0LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InBsYXllcnMtdW5rbm93In0.M7vnebptnsioCCzUEoxF7kOsDR1KMBPLigCFnKsRxes';
const api = new PubgAPI(API_KEY, PlatformRegion.PC_EU);

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {

  private player;
  private lastMatch;
  private match;
  private telemetry;
  private playerPositions;

  constructor() { }

  ngOnInit() {
    this.getPlayer('Spinov');
  }

  async getPlayer(name) {
    const players = await Player.filterByName(api, [name]);
    this.player = players[0];
    console.warn(`Found player "${this.player.name}" with ID: ${this.player.id}`);
    this.getLastMatces();
    // this.getSeasonStats('division.bro.official.pc-2018-02');

  }

  async getLastMatces() {
    const lastMatchId = this.player.matchIds[0];
    /*for ( let i = 0; i <= this.player.matchIds.length; i++) {
      const matchesId = this.player.matchIds[i];
      const matches  = await Match.get(api, matchesId);
      console.log(`Match ${matchesId} played on ${matches.dateCreated} and lasted ${Math.round(matches.duration / 60)}
       minutes, with ID: ${matches.id}`);
    }*/
    this.match = await Match.get(api, lastMatchId); // TODO убрать присоение информации последнего матча ко всем матчам
    this.lastMatch = await Match.get(api, lastMatchId);
    console.log(`Last played match on ${this.lastMatch.dateCreated} and lasted
     ${Math.round(this.lastMatch.duration / 60)} minutes, with ID: ${this.lastMatch.id}`);
    // this.getMatchInfo('Spinov');
    this.getTelemetry();
  }

  async getMatchInfo(name) {
    const participant = this.match.getParticipantByName(name);
    if (!participant) {
      console.error('Player not found in participants');
      return;
    }
    console.warn(`${participant.name} placed #${participant.winPlace} out of ${this.match.participants.length} on ${this.match.map}`);
    console.log('his stats: ');
    console.log(`kills ${participant.kills}`);
    console.log(`damage ${participant.damageDealt}`);
    console.log(`assists ${participant.assists}`);
    console.log(`headshot kills ${participant.headshotKills}`);
    console.log(`total distance ${participant.totalDistance}m`);
  }

  async getSeasonList() {
    const seasonsList = await Season.list(api);
    seasonsList.forEach(s =>
      console.log(s.id));
  }

  async getSeasonStats(season) {
    const seasonData = await PlayerSeason.get(api, this.player.id, season);
    const soloStats = seasonData.squadFPPStats;
    console.warn(`Player [${this.player.name}] stats for season [${seasonData.seasonId}]:`);
    console.log(`Kills ${soloStats.kills} / Assists ${soloStats.assists} / Knock-outs ${soloStats.dBNOs}`);
    console.log(`Played ${soloStats.roundsPlayed} matches`);
    console.log(`Won ${soloStats.wins} (${(100 * soloStats.wins / soloStats.roundsPlayed).toFixed(2)}%)`);
    console.log(`top10s ${soloStats.top10s} (${(100 * soloStats.top10s / soloStats.roundsPlayed).toFixed(2)}%)`);
  }

  async getTelemetry() {
    this.telemetry = await this.match.getTelemetry(api);
  }

  getListOfKillsInMatch() {
    this.telemetry.playerKillEvents.forEach(e => {
      console.log(`[${e.dateTime.toLocaleDateString()} ${e.dateTime.toLocaleTimeString()} kill] ${e.killer.name} ->
       ${e.victim.name} | ${e.damageCauserName} ${e.damageTypeCategory} @ ${e.distance / 100}m`);
    });
  }

  getCarePackageLandings() { // лист аирдропов
    this.telemetry.carePackageLandEvents.forEach(e => {
      const itemsString = e.itemPackage.items.map(item => item.itemId).join(', ');
      console.log(`[${e.dateTime.toLocaleDateString()} ${e.dateTime.toLocaleTimeString()} carePackage land] with ${itemsString}`);
    });
  }

  getPlayerPosition(name) {
    this.playerPositions = this.telemetry.playerPositionEvents.filter(e => e.character.name === name);
    this.playerPositions.forEach(e => {
      const loc = e.character.location;
      console.log(`[${e.dateTime.toLocaleDateString()} ${e.dateTime.toLocaleTimeString()} position] (${loc.x}, ${loc.y}, ${loc.z})`);
    });
  }

}
