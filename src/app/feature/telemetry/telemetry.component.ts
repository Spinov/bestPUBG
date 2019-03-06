import { Component, OnInit } from '@angular/core';
import { Match, PlatformRegion, Player, PubgAPI } from 'pubg-typescript-api';

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZmIxNmYyMC0yMTU1LTAxMzctNWUwNi00OTE2ZGJjNGIyNjgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTUxNzc3NDU0LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InBsYXllcnMtdW5rbm93In0.M7vnebptnsioCCzUEoxF7kOsDR1KMBPLigCFnKsRxes';
const api = new PubgAPI(API_KEY, PlatformRegion.PC_EU);

@Component({
  selector: 'app-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.scss']
})
export class TelemetryComponent implements OnInit {

  private player;
  private match;
  private lastMatch;

  constructor() { }

  ngOnInit() {
    this.getPlayer('Spinov');
  }

  async getPlayer(name) {
    const players = await Player.filterByName(api, [name]);
    this.player = players[0];
    console.log(`Found player "${this.player.name}" with ID: ${this.player.id}`);
    this.getLastMatces();

  }

  async getLastMatces() {
    const lastMatchId = this.player.matchIds[0];
    /*for ( let i = 0; i <= this.player.matchIds.length; i++) {
      const matchesId = this.player.matchIds[i];
      const matches  = await Match.get(api, matchesId);
      console.log(`Match ${matchesId} played on ${matches.dateCreated} and lasted ${Math.round(matches.duration / 60)}
       minutes, with ID: ${matches.id}`);
    }*/
    this.match = await Match.get(api, lastMatchId);
    console.log(`Last played match on ${this.match.dateCreated} and lasted
     ${Math.round(this.match.duration / 60)} minutes, with ID: ${this.match.id}`);
    this.getMatchInfo('Spinov');
  }

  async getMatchInfo(name) {
    const participant = this.match.getParticipantByName(name);
    if (!participant) {
      console.error('Player not found in participants');
      return;
    }
    console.log(`${participant.name} placed #${participant.winPlace} out of ${this.match.participants.length} on ${this.match.map}`);
    console.log('his stats: ');
    console.log(`kills ${participant.kills}`);
    console.log(`damage ${participant.damageDealt}`);
    console.log(`assists ${participant.assists}`);
    console.log(`headshot kills ${participant.headshotKills}`);
    console.log(`total distance ${participant.totalDistance}m`);
  }

}
