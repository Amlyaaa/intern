// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent {
//   report: any[] = [];

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.http.get<any[]>("http://localhost:3000/report").subscribe(data => {
//       this.report = data;
//     });
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-report',
//   templateUrl: './report.component.html',
//   styleUrls: ['./report.component.css']
// })
// export class ReportComponent {
//   report: any[] = [];

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     this.loadReportData();
//   }

//   loadReportData() {
//     this.http.get<any[]>("http://localhost:3000/report").subscribe(data => {
//       this.report = data;
//     });
//   }

//   downloadExcel() {
//     const fileName = 'report.xlsx'; // Set desired file name

//     // Create a Blob containing the report data
//     const blob = new Blob([JSON.stringify(this.report)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//     // Create a temporary link element
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);
//     link.download = fileName;

//     // Trigger the download
//     link.click();

//     // Clean up
//     window.URL.revokeObjectURL(link.href);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  report: any[] = [];
  processedReport: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>("http://localhost:3000/report").subscribe(data => {
      this.report = data;
    });
  }

  // downloadExcel(): void {
  //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.report);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* generate XLSX file and trigger download */
  //   XLSX.writeFile(wb, 'report.xlsx');
  // }
  processReportData(data: any[]): any[] {
    const processedData: any[] = [];
    const processedMessages: Set<string> = new Set();

    data.forEach(item => {
      const message = item.Message;
      if (!processedMessages.has(message)) {
        processedMessages.add(message);
        processedData.push(item);
      }
    });

    return processedData;
  }

  isContainer2Visible:boolean=false;
  selectedItemIndex: number | null = null; // declare the property
  
  toggleVisibility(index: number | null) {
    this.selectedItemIndex = index;
    this.isContainer2Visible = !this.isContainer2Visible; // update the method to accept and use the index
  }



//downld report
downloadExcelReport(): void {
   
  const reportData = this.generateReportData();
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(reportData);
  XLSX.utils.book_append_sheet(wb, ws, 'Report Details');
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'report-details.xlsx');
}

generateReportData(): any[][] {
  const data: any[][] = [
    ['DateTime', 'MobileNo', 'SenderID', 'Status']
  ];

  if (this.report && this.selectedItemIndex !== null) {
    const reportItem = this.report[this.selectedItemIndex];
    data.push([reportItem.datetime, reportItem.MobileNo, reportItem.ErrorCode, reportItem.Status]);
  }
  return data;
}




  
}
