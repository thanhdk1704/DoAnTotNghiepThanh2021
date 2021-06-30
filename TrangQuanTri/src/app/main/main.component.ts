import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../services/base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(injector:Injector) 
  {
    super(injector)
   }

  ngOnInit(): void {
setTimeout(() => {
  this.loadScripts();
});
  }

}
