import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {blub} from '../animations/template.animations'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations:[blub]
})

export class HomeComponent implements OnInit{
  constructor(private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getData();
  }

  displayedColumns: string[] = [ 'name', '#'];
  secondTable: string[] = ['#', 'phone', 'time','date','call','done'];
  title = 'AngularV3';
  phones:any;  
  url = "http://127.0.0.1:5000";
  Data:any;
  lastData:string = ""

  onRowClick(row: any) {
    this.Data = row.phoneCalls;
    this.lastData = row.name
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
      this.http.post(this.url +"/markDone",{"ID":id,"securityContexts": params['ID']}).subscribe((data: any) => {
        this.phones = data.data;
        this.phones.forEach( (value: any) => { if(value.name == this.lastData){ this.Data = value.phoneCalls } }); 
    })
    })
  }
 
  resetData(){
    this.route.params.subscribe(params=>{
      this.http.post(this.url + "/reset",{"securityContexts": params['ID']}).subscribe((data:any) =>{
        this.phones= data.data;
        this.phones.forEach( (value: any) => { if(value.name == this.lastData){ this.Data = value.phoneCalls } }); 
      })
    })
  }
}
