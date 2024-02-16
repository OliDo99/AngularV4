import { Component,OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';

export interface CALLS {
  number: number;
  phone: string;
  time: string;
  date: string;
  done: boolean;
}
export interface TYPE {
  name:string,
  phoneCalls: CALLS[]
}

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
})

export class HomeComponent implements OnInit{
  constructor(private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.http.post(this.url +"/getData",{"securityContexts": params['ID']})
    .subscribe((data:any) => {
      this.toArray(data);
      })})
  }
  callsArray: TYPE[] = [];
  displayedColumns: string[] = [ 'name', '#'];
  secondTable: string[] = ['#', 'phone', 'time','date','call','done'];
  title = 'AngularV3';
  url = "http://127.0.0.1:5000";
  dataCalls:any;
  dataName:string | undefined;

  onRowClick(row: any) {
    this.dataName = row.name;
    this.dataCalls = row.phoneCalls
  }

  toArray(data:any){
    this.callsArray = data.map((item: any) => ({
      name: item.name,
      phoneCalls: item.phoneCalls
    }));
  }

  markDone(id: number){
    this.route.params.subscribe(params=>{
      this.http.post(this.url +"/markDone",{"ID":id,"securityContexts": params['ID']}).subscribe((data: any) => {
        this.toArray(data);
        this.callsArray.forEach(value=>{if (value.name == this.dataName){ this.dataCalls = value.phoneCalls }})
      })})
  }

  resetData(){
    this.route.params.subscribe(params=>{
      this.http.post(this.url + "/reset",{"securityContexts": params['ID']}).subscribe((data:any) =>{
        this.toArray(data);
        this.callsArray.forEach(value=>{if(value.name == this.dataName){ this.dataCalls = value.phoneCalls }})
      })})
  }
}
