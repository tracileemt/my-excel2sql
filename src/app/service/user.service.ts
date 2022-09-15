import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  fileName=''
  url = 'http://localhost:63376/Api/Excel';

  UploadExcel(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post(this.url + '/UploadExcel', formData, httpOptions)
  }
  UploadExcelUsers(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post<any>(this.url + '/UploadExcelUsers', formData, httpOptions)
  }
  GetTables(): Observable<any> {
    var tlist = this.http.get<string[]>(this.url + '/GetTables');
    return tlist;
  }

  GetColumns(table:string): Observable<any> {
    var tlist = this.http.get<string[]>(this.url + '/GetColumns/' + table);
    return tlist;
  }
  BindUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/UserDetails');
  }

}
