import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { Leader } from '../leader.model';
import { LEADERS } from '../leaders.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {
    return of(LEADERS);
  }

  getLeader(id: string): Observable<Leader> {
    return from(LEADERS)
      .pipe(
        filter(leader => leader.id === id),
        first()
      );
  }

  getFeaturedLeader(): Observable<Leader> {
    return from(LEADERS)
      .pipe(
        filter(leader => leader.featured),
        first()
      );
  }
}
