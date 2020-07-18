import { Component, OnInit } from '@angular/core';
import { ComponentesForestService } from '../../servicio/componentes-forest.service';
import { ComponenteForest } from 'src/app/shared/modelo/ComponenteForest';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
  componentes: ComponenteForest[];
  items: MenuItem[];
  
  constructor(private componentesForestService: ComponentesForestService) { }


  ngOnInit() {
    //this.componentes = this.componentesForestService.onCargarDummy();
  }

}
