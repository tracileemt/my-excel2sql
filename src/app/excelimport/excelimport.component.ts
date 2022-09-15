import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { UserService } from '../service/user.service';

@Component({
  selector: 'esql-excelimport',
  templateUrl: './excelimport.component.html',
  styleUrls: ['./excelimport.component.css']
})
export class ExcelimportComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput:any;
  excelFileName=  'ExcelSheet2.xlsx';
  allUsers: any;
  users: any;
  allUsers2:any;
  allUsersImported:any;
  usererrors:any;
  sub!:Subscription;
  message:string="";
  showButton: boolean = false;
  showTable:boolean = false;
  fileLoaded:boolean= false;
  pageTitle: string = 'Excel Import';
  fileName: string='';
  constructor(private http: HttpClient, private service: UserService) { }

  ngOnInit() {
    this.showButton=false;

   }
   loadAllUser() {
     this.allUsers = this.service.BindUser();
   }

   uploadFile() {

     let formData = new FormData();
     this.showButton=false;
     this.showTable=false;
     this.fileName =   this.fileInput.nativeElement.files[0];
     if (this.fileName!=undefined)
     {
       formData.append('upload', this.fileInput.nativeElement.files[0])
       this.fileLoaded=true;
       this.sub = this.service.UploadExcelUsers(formData).subscribe(
         result =>
          {
         // next: users => {
            this.allUsers2 = result;
            if (this.allUsers2==undefined || this.allUsers2.length==0)
            {
                this.message = "Error import failed";

            }  else
            {
              this.allUsersImported = this.getImported();
              this.message =  this.allUsersImported.length + " record(s) imported ";
            }
            this.usererrors = this.getErrors();
            if (this.allUsers2!=undefined || this.usererrors!=undefined)
            {
              this.showButton=true;
              this.showTable=true;
            }
            if (this.allUsers2!=undefined || this.usererrors!=undefined)
            {
             this.showButton=true;
             this.showTable=true;
            }
         // },
         // error: err => {
         //   this.usererrors = err
         // }
         });

         if (this.allUsers2!=undefined || this.usererrors!=undefined)  {
           this.showButton=true;
           this.showTable=true;
       } else {
         this.showButton=false;
         this.showTable=false;
       }
        //this.loadAllUser(result);

       //});
     }  else {
       this.message = "please choose a file."
     }

   }
   exportexcel(): void
   {
     /* pass here the table id */
     let element = document.getElementById('errors-table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.excelFileName);

   }
   clear() {
     this.showButton = false;
     this.showTable=false;
     this.usererrors=null;
     this.allUsersImported=null;
     this.message="";
   }
   getErrors() {
     return this.allUsers2.filter((item: { Error: null; }) => item.Error!=null );

   }
   getImported() {
     return this.allUsers2.filter((item: { Error: null; }) => item.Error==null);

   }
}
