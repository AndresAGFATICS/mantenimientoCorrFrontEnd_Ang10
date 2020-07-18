import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/AppSettings';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
  timestamp:string = AppSettings.TIME_STAMP;
  imagen: string = AppSettings.LOGO_FOREST;
  year : number = new Date().getFullYear();
  appName : string = AppSettings._APP_NAME;
  constructor() { }

  ngOnInit() {
  }



}
