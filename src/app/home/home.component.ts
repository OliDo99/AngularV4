import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';

interface PhoneCalls {
  name: string;
  phoneCalls: CallArray[];
}
interface CallArray {
  number: number;
  phone: string;
  time: string;
  date: string;
  done: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatRippleModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit{
  constructor( private http: HttpClient,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.http.post(this.url +"/getData",{"securityContexts": params['ID']})
    .subscribe(( data: any ) => {
        this.callInterface = data;
    })})
  }
  callInterface!: PhoneCalls[];
  displayedColumns = [ 'name', '#'];
  secondTable = [ '#', 'phone', 'time', 'date', 'call', 'done'];
  url = "http://127.0.0.1:5000";
  dataCalls: any;
  dataName!: string;

  onRowClick(row: any) {
    this.dataName = row.name;
    this.dataCalls = row.phoneCalls;
  }

  markDone(id: number){
    this.route.params.subscribe(params=>{
      this.http.post( this.url +"/markDone",{"ID":id,"securityContexts": params['ID']}).subscribe((data: any) => {
        this.callInterface = data;
        this.dataCalls = this.callInterface.find(person => person.name === this.dataName)?.phoneCalls;
      })});
  }
  resetData(){
    this.route.params.subscribe(params=>{
      this.http.post(this.url + "/reset",{"securityContexts": params['ID']}).subscribe((data:any) =>{
        this.callInterface = data;
        this.dataCalls = this.callInterface.find(person => person.name === this.dataName)?.phoneCalls;
      })});
  }
}
