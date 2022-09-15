import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'esql-excelexport',
  templateUrl: './excelexport.component.html',
  styleUrls: ['./excelexport.component.css']
})
export class ExcelexportComponent implements OnInit {
  pageTitle: string = 'Excel Export';
  dbTables: String[] = [];
  dbColumns: String[] = [];
  selectedSortOrder: string = "Sort by...";
  table: string="";
  column: string="";
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    var tableslst = this.userService.GetTables().subscribe(
      result =>
       {
      // next: users => {
         this.dbTables = result;

      // },
      // error: err => {
      //   this.usererrors = err
      // }
      });
  }

  ChangeSortOrder(newSortOrder: string) {
    this.selectedSortOrder = newSortOrder;
  }

  GetColumns(table: string) {
    var tlist = this.userService.GetColumns(table).subscribe(
      result =>
      {
        this.dbColumns = result;
    });
  }
}

