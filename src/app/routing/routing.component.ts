import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute,Router} from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-routing',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './routing.component.html',
  styleUrl: './routing.component.scss'
})
export class RoutingComponent {
 
  arrData: Array<{ID: string,Name:string,SecurityContextTypeID:string,UserSecurityContextID:string}> = []

  constructor(private route: ActivatedRoute,private http:HttpClient,private router:Router) {
    var placeholder;
    this.route.params.subscribe(params => {
        this.http.get("https://api-bnd1.omni-a.cz/Apps/SecurityContexts/Available",{
          headers: { access_token: params['access_token'] }
        })
        .subscribe((data:any)=>{
          placeholder = data["Result"][0]["SecurityContexts"];
          placeholder.forEach((element: any) => {              
              this.arrData.push(element)
              console.log(element);
          });
         
        })
      }
    );
  }
  Presed(ID:string){
    this.router.navigate(['/home', {ID: ID}]);
  }
  
}
