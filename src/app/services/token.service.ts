import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  setToken()
  {
    localStorage.setItem('token','sample');
  }
  removeToken()
  {
    localStorage.removeItem('token');
  }
  getToken()
  {
    return localStorage.getItem('token');
  }
  isLoggedIn()
  {
    var token = this.getToken();
    if(token == 'sample')
    {
      return true;
    }else
    {
      return false;
    }
  }
}
