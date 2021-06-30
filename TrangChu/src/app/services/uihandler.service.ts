import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UIHandlerService {

  constructor() {

   }
   changeClassNameForElement(elementStart:string,elementIDs:any[],className){
     elementIDs.forEach(element => {
       let temp=document.getElementById(elementStart+element);
       if(temp){
         temp.className=className;
       }
     });
   }

   
}
