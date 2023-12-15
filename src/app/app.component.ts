import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  next:any
  title = 'AngularV3';
  public usernameInput:any;
  public passwordInput:any; 
  ChangeTopBar(){
    this.usernameInput = (document.getElementById('username') as HTMLInputElement).value
    this.passwordInput = (document.getElementById('password') as HTMLInputElement).value
    console.log(this.usernameInput)
    console.log(this.passwordInput)
  }
}
