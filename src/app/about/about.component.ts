import { Component, OnInit } from '@angular/core';

import { LeaderService } from '../shared/services/leader.service';

import { Leader } from '../shared/leader.model';

import { flyInOut, expand } from '../shared/animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [flyInOut(), expand()]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {
    this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
