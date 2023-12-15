import { Component } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usernameInput = "oliver.dohnal1@gmail.com"
  passwordInput = "Heslo007Heslo"
  userID:any;
  mfaToken = "sGbITsYbZASmuJ1Ixlj71JrhgNhCWQQYrht08Fij/7VZFYB7ssxfaGzSidLcMvML2pDvjUvVziiSzNH+bhbpXLQt1c8C7qUnjKK51qzXIsV4fXIkmOLY5UhTA/Lc2Hv25J/soqZg1v6UTgzySMzshg=="
  mdaTocken2="sGbITsYbZASmuJ1Ixlj71JrhgNhCWQQYrht08Fij%2F7VZFYB7ssxfaGzSidLcMvML2pDvjUvVziiSzNH%2BbhbpXLQt1c8C7qUnjKK51qzXIsV4fXIkmOLY5UhTA%2FLc2Hv25J%2FsoqZg1v6UTgzySMzshg%3D%3D"
  
constructor(private http: HttpClient) {}
  Post(){
      this.http.post("https://api.omni-a.cz/Apps/AuthenticateExt",{"DoMFA": false,"ProviderType": "Native","UniqueID": this.usernameInput,"Password": this.passwordInput})
      .subscribe((data:any) => {
        this.userID = data["Result"].user_list[0].userid
      })
  }
  SecondPost(){
    this.http.get("https://api.omni-a.cz/Apps/ValidateMFA?userID="+this.userID+"mfaToken="+this.mfaToken)
      .subscribe((data:any) => {
        this.userID = data["Result"].user_list[0].userid
      })

  }
}

