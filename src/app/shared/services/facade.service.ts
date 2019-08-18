import { Injectable, Injector } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private injector: Injector) { }

  private _accountService: AccountService;
  public get accountService(): AccountService {
    if (!this._accountService) {
      this._accountService = this.injector.get(AccountService);
    }
    return this._accountService;
  }
}
