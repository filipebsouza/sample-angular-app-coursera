import { Component, OnInit } from '@angular/core';
import { FacadeService } from '../shared/services/facade.service';
import { Leader } from '../shared/leader.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  
  leaders: Leader[];

  constructor(private facadeService: FacadeService) { }

  ngOnInit() {
    this.facadeService.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }

}
