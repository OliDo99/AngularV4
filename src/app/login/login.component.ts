import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: 
  [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  constructor(private http: HttpClient,private router :Router) {}

  mfaToken="sGbITsYbZASmuJ1Ixlj71JrhgNhCWQQYrht08Fij/7VZFYB7ssxfaGzSidLcMvML2pDvjUvVziiSzNH+bhbpXLQt1c8C7qUnjKK51qzXIsV4fXIkmOLY5UhTA/Lc2Hv25J/soqZg1v6UTgzySMzshg==";
  hide = true;
  InputUsername = new FormControl('');
  InputPassword = new FormControl('');
  response= true; 

  AuthenticateExt(){

    this.http.post("https://api.omni-a.cz/Apps/AuthenticateExt",{
      DoMFA: false,
      ProviderType: "Native",
      UniqueID: this.InputUsername.value,
      Password: this.InputPassword.value
    })
    .subscribe((data:any) => {
      this.response = data["Result"].success
      if(this.response){
        this.ValidateMFA(data["Result"].user_list[0].userid,data["Result"].access_token);
      }
    });
  }
  ValidateMFA(userID:string,accessToken:string){
    this.http.get("https://api.omni-a.cz/Apps/ValidateMFA",{
      params: { userID: userID, mfaToken: this.mfaToken },
      headers: { access_token: accessToken }
    }).subscribe((data:any) => {
      this.router.navigate(['/routing', {access_token: data["Result"].access_token}]);
    });
  }
}
