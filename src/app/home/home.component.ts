import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

  displayedColumns: string[] = [ 'name', '#'];
  secondTable: string[] = ['#', 'phone', 'time','date','call','done'];

    ngOnInit(): void {
      this.getData();
    }
    title = 'AngularV3';
    constructor(private http: HttpClient,private route: ActivatedRoute) {}
    isCollapsed = [false,false,false];
    phones!:any;  
    url = "http://127.0.0.1:5000";
  
    toggleCollapse(i:number): void {
      this.isCollapsed = [false,false,false];
      this.isCollapsed[i] = true;
    }
  
    getData(){
      this.route.params.subscribe(params=>{
        this.http.post(this.url +"/getData",{"securityContexts": params['ID']})
      .subscribe((data:any) => {
        this.phones= data.data;
        
      })
      })
    }
  
    markDone(id: number){
      this.route.params.subscribe(params=>{
        this.http.post(this.url +"/markDone",{"ID":id,"securityContexts": params['ID']})
      .subscribe(() => {
        this.getData();
      })
      })
    }
  
    resetData(){
      this.http.get(this.url+'/reset')
      .subscribe(() => {
        this.getData();
      })
    }
  }
