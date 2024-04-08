import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  userName: any;
  getreportapi(res: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient ) {}

  getBalance(username:any){
    return this.http.get('http://api.sms123.in/api/Credit/Credit?username='+username)
  }
  
  smsapi(data:any){
    debugger
    return this.http.get("http://api.sms123.in/api/QuickSend/QuickSend?username="+data.username+"&password="+
    data.password+"&mob="+data.mob+"&msg="+data.msg+"&sender="+data.sender+"&templateid="+data.templateid+
    "&coding="+data.coding,data);
    }

  
postdata(data:any){
      return this.http.post("http://localhost:3000/report",data)
    }
    
}
