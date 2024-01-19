import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usernameInput = "oliver.dohnal1@gmail.com";
  passwordInput = "Heslo007Heslo";
  mfaToken="sGbITsYbZASmuJ1Ixlj71JrhgNhCWQQYrht08Fij/7VZFYB7ssxfaGzSidLcMvML2pDvjUvVziiSzNH+bhbpXLQt1c8C7qUnjKK51qzXIsV4fXIkmOLY5UhTA/Lc2Hv25J/soqZg1v6UTgzySMzshg==";
  datas:any;
  constructor(private http: HttpClient,private router :Router) {}  
  

  AuthenticateExt(){
    this.http.post("https://api.omni-a.cz/Apps/AuthenticateExt",{
      DoMFA: false,
      ProviderType: "Native",
      UniqueID: (document.getElementById('username') as HTMLInputElement).value,
      Password: (document.getElementById('password') as HTMLInputElement).value
    })
    .subscribe((data:any) => {
      this.ValidateMFA(data["Result"].user_list[0].userid,data["Result"].access_token);
    })
  }
  ValidateMFA(userID:string,accessToken:string){
    this.http.get("https://api.omni-a.cz/Apps/ValidateMFA",{
      params: { userID: userID, mfaToken: this.mfaToken },
      headers: { access_token: accessToken }
    })
    .subscribe((data:any) => {
      //this.Available(data["Result"].access_token);
      this.router.navigate(['/routing', {access_token: data["Result"].access_token}]);
    })
  }
}