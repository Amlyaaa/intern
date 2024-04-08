import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  date!:Date
constructor(private service:ServiceService){
//   setInterval(()=>{
//     this.date= new Date()
//   },1000)
// }

}
ngOnInit(): void {
  this.loadcount();
}
UserName = ['demotr'];
count=0;
loadcount(){
 
  this.service.getBalance(this.UserName).subscribe({
    next:((res:any)=>{
      this.count =res.SMSBalance 
    })
  })
}

}
