import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  constructor() { }

  setToken(token)
  {
    localStorage.setItem('token',token);
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
    if(token)
    {
       var decodedPayload = this.getPayLoad(token);
      if(decodedPayload)
      {
        return (decodedPayload.iss == 'http://127.0.0.1:8000/api/register'||'http://127.0.0.1:8000/api/login' ? true : false);
      }
    }else
    {
      return false;
    }
  }
  getPayLoad(token)
  {
    var undecoded = token.split('.')[1];
    return this.decodePayload(undecoded);
  }
  decodePayload(undecoded)
  {
    var decoded = JSON.parse(atob(undecoded));
    return decoded;
  }
  getUserId()
  {
    var token = this.getToken();
    if(token)
    {
      var decoded = this.getPayLoad(token);
      return decoded.userid;
    }
  }
  getUserFName()
  {
    var token = this.getToken();
    if(token)
    {
      var decoded = this.getPayLoad(token);
      return decoded.userfname;
    }
  }
  getUserLName()
  {
    var token = this.getToken();
    if(token)
    {
      var decoded = this.getPayLoad(token);
      return decoded.userlname;
    }
  }
  checkIfVerified()
  {
    var token = this.getToken();
    if(token)
    {
      var decoded = this.getPayLoad(token);
      if(decoded.isverified == '0')
      {
        return true;
      }else
      {
        return false;
      }
    }else
    {
      return false;
    }
  }
  getEmail()
  {
    var token = this.getToken();
    if(token)
    {
      var decoded = this.getPayLoad(token);
      return decoded.useremail;
    }
  }
}
