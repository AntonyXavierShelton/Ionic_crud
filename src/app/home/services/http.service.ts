import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  constructor(private http:HttpClient) { }
  
  
    getproduct(){
      return this.http.get<any>(" http://localhost:3000/posts")
    }
    postproduct(data:any){
      return this.http.post<any>(" http://localhost:3000/posts",data).pipe(map((Response :any)=>{
        return Response
      }))
    }
    updateproduct(id:any,data:any){
      return this.http.put<any>(" http://localhost:3000/posts/"+id,data).pipe(map((Response :any)=>{
          return  Response
      }))
    }
   
    
  
  }


