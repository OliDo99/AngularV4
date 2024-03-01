import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';


interface CallArray {
  ID: string;
  Name: string;
  SecurityContextTypeID:string
  UserSecurityContextID:string;
}
@Component({
  selector: 'app-routing',
  standalone: true,
  imports: 
  [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.scss'
})
export class RoutingComponent implements OnInit{
  constructor(private route: ActivatedRoute,private http:HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.get("https://api-bnd1.omni-a.cz/Apps/SecurityContexts/Available",{
        headers: { access_token: params['access_token'] }
      }).subscribe(( data : any )=>{
        this.arrData = data["Result"][0]["SecurityContexts"];
      })
    });
  }
  arrData!: CallArray[]

  presed( ID: string,Name: string ){
    this.router.navigate(['/home', { ID: ID, Name: Name }]);
  }
}
