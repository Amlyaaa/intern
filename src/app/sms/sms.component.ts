import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
  smsform!: FormGroup;
  //clear textbox
  textInput: string = '';
  letterCount: number = 0;
  creditcount: number = 0;
  textBoxValue: string = '';
 
  submitted:any;
  msglength: any;
  textlength: any;
  limit: any=0;
  
  inputText: string = '';
  characterCount: number=0;
  validMobCount = 0;
  invalidMobCount = 0;
 //import contacts
 importedPhoneNumbers: string = '';


  // <!--checkbox-->
  // selectAllCheckbox = false;
  // checkbox1 = false;
  // checkbox2 = false;

  constructor(private Service: ServiceService, private form: FormBuilder,private http: HttpClient) { }

  
  // checkbox
  // selectAllChanged() {
  //   this.checkbox1 = this.selectAllCheckbox;
  //   this.checkbox2 = this.selectAllCheckbox;
  // }

  // checkboxChanged() {
  //   if (!this.checkbox1 || !this.checkbox2) {
  //     this.selectAllCheckbox = false;
  //   } else {
  //     this.selectAllCheckbox = true;
  //   }
  // }
 
  // end checkbox
  //for updating numbwe

  //schedule
   showSchedule: boolean = false;
selectedDate!: string; // Mark as possibly undefined or null
selectedTime!: string; 

openDatePicker() {
  // Implement logic to open date picker
}

openTimePicker() {
  // Implement logic to open time picker
}
toggleSchedule() {
  this.showSchedule = !this.showSchedule;
}

  ngOnInit() {
    this.smsform = this.form.group({
      username: ["demotr"],
      password: ["tr@1234"],
      sender: [""],
      templateid: [""],
      mob: [""],
      msg: [""],
      coding: ["1"]
    });
  }



  // submit() {
  //   debugger;
  //     this.submitted=true;
  // if(this.smsform.invalid){
  //   alert('Please check all fileds')
  //   return;
  // }
  //    return this.Service.smsapi(this.smsform.value).subscribe((res: any) => {
  //     console.log(res);
  //     alert("SMS Sent Successfully!");
  //     console.log(this.smsform.value);
      
      
  //   });
  // }

  
  submit() {
    debugger;
      this.submitted=true;
  if(this.smsform.invalid){
    alert('Please check all fileds')
    return;
  }
     return this.Service.smsapi(this.smsform.value).subscribe((res: any) => {
      console.log(res);
      alert("SMS Sent Successfully!");
      console.log(this.smsform.value);
      res.datetime = new Date; 
        res.Message = this.smsform.value.msg;
        res.Credit = this.creditcount;
        res.Valid = this.mobileNoCount;
        res.Sender=this.smsform.controls['sender'].value;
      this.Service.postdata(res).subscribe(res=>{
      })
     this.Service.userName=this.smsform.value.username;
     localStorage.setItem('count',(this.Service.userName));
     
   }) 
}

onchange(event: Event): void {
    const templateId = (event.target as HTMLSelectElement).value;
    let message = '';
    switch (templateId) {
      case '1707161891201501738':
        message = 'Your My SMS verification Code id . Do not share this code with others Team Nuevas';
        break;
      case '1707161855199873979':
        message = 'Dear User your OTP is  Kindly use OTP to validate your Registration. Team Trackzia';//match this with value in dropdown
        break;
      case '1707161899992775140':
        message = 'Dear  , Your Complaint with Complaint Id:  has Been Resolve Kindly Share OTP, The OTP is  \n From Nuevas';
        break;
      default:
        message = 'Hey Lets Work Togather!';
        break;
    }
    this.smsform.patchValue({
      msg: message
    });
  }

//clear textbox
  // clearTextBox() {
  //   this.textInput = '';
  //   this.letterCount = 0;
  // }
clearTextBox(): void {
    this.smsform.get('mob')?.setValue(''); // Clear the value of the 'mob' form control
    this.validMobCount = 0; // Reset the valid number count
    this.invalidMobCount = 0; // Reset the invalid number count
}
  

  // getInvalidNumbersCount(): number {
  //   const textValue = this.smsform.get('mob')?.value;
  
  //   // Count total numbers of digits
  //   const totalDigitsCount = textValue.replace(/\D/g, '').length;
  
  //   // Calculate the count of incomplete 10-digit numbers
  //   let incompleteNumbersCount = Math.floor(totalDigitsCount / 10);
  
  //   // If the text ends with a digit and it's not a complete 10-digit number, count it as incomplete
  //   if (textValue.trim().length > 0 && !/\b\d{10}\b/.test(textValue.trim())) {
  //     incompleteNumbersCount++;
  //   }
  
  //   // If the last character entered is an Enter and it's preceded by a complete 10-digit number, subtract from incomplete count
  //   if (/\b\d{10}\b\s*$/.test(textValue)) {
  //     incompleteNumbersCount--;
  //   }
  
  //   // Ensure the count is non-negative
  //   incompleteNumbersCount = Math.max(0, incompleteNumbersCount);
  
  //   return incompleteNumbersCount;
  // }
getInvalidNumbersCount(): number {
    const textValue = this.smsform.get('mob')?.value;
    const numbers: string[] = textValue.split(',');
 
    let validNumbersCount = 0;
    let invalidNumbersCount = 0;
  
    numbers.forEach((number: string) => {
      const trimmedNumber = number.trim();
      if (trimmedNumber.length === 10 && /^\d+$/.test(trimmedNumber)) {
        validNumbersCount++;
      } else if (trimmedNumber.length > 0) {
        invalidNumbersCount++;
      }
    });
  
      return invalidNumbersCount;
}
  // count() {
     
  //   const textValue = this.smsform.get('mob')?.value;

    
  //   const mobileNumberRegex = /\b\d{10}\b/g;
  
  
  //   const matches = textValue.match(mobileNumberRegex);
  
  
  //   this.letterCount = matches ? matches.length : 0;
  // }

onMouseOver(){
    this.msglength=this.smsform.controls['msg']
    console.log(this.msglength.value.length);
    this.textlength=this.msglength.value.length
  
    if(this.textlength<160)
    {
      this.limit=1;
    }
    else if(this.textlength %160==0){
      let temp=this.textlength/160;
      this.limit=Math.floor(temp);
    }
    else{
      let temp=this.textlength/160
      this.limit=Math.floor(temp)+1;
    }
  
    this.creditcount=this.validMobCount*this.limit;
  }
  
  calculateCharacterCount(): void {
    this.characterCount = this.inputText.length;
}
//count of phine numbers 
mobileNoCount(){
    const mobileNumbers = this.smsform.controls['mob'].value.split(',').map((number:any)=>number.trim());
  
    this.validMobCount = 0;
    this.invalidMobCount = 0;
  
    mobileNumbers.forEach((number:any)=>{
      if(number.length==10 && /^\d+$/.test(number)){
        this.validMobCount++;
      }else{
        this.invalidMobCount++;
      }
    });
}

  // uplofile and downlad
//   downloadUrl: string = '';
//   selectedFile: File | null = null;

//   onFileSelected(event: any) {
//     this.selectedFile = event.target.files[0];
// }

// uploadFile() {
//     if (this.selectedFile) {
//       const formData: FormData = new FormData();
//       formData.append('file', this.selectedFile, this.selectedFile.name);

//       this.http.post('http://your-upload-endpoint', formData).subscribe((response: any) => {
//         // Assuming server responds with the URL of the uploaded file
//         this.downloadUrl = response.downloadUrl; // Adjust the property name based on your server response
//       });
//     }
//   }

  //getnew update
  selectAllCheckbox: boolean = false;
checkbox1: boolean = false;
checkbox2: boolean = false;
poolPhoneNumbers: string[] = ['9309580344', '8412819113'];  
testPhoneNumbers: string[] = ['7038550566', '9960576419,9420930016'];  
selectedPhoneNumbers: string[] = []; // Numbers to display based on selection

selectAllChanged() {
  if (this.selectAllCheckbox) {
    this.checkbox1 = true;
    this.checkbox2 = true;
  } else {
    this.checkbox1 = false;
    this.checkbox2 = false;
  }
  this.updateSelectedPhoneNumbers();
}

checkboxChanged() {
  if (this.checkbox1 && this.checkbox2) {
      this.selectAllCheckbox = true;
  } else {
      this.selectAllCheckbox = false;
  }
  this.updateSelectedPhoneNumbers();
}

private updateSelectedPhoneNumbers() {
    if (this.checkbox1 && this.checkbox2) {
        this.selectedPhoneNumbers = [...this.poolPhoneNumbers, ...this.testPhoneNumbers];
    } else if (this.checkbox1) {
        this.selectedPhoneNumbers = [...this.poolPhoneNumbers];
    } else if (this.checkbox2) {
        this.selectedPhoneNumbers = [...this.testPhoneNumbers];
    } else {
        this.selectedPhoneNumbers = [];
    }
}

//display the same element within same component
  imageSrc: string | ArrayBuffer | null = null;
  videoSrc: string | ArrayBuffer | null = null;

  onFileUploaded(event: any, fileType: string): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (fileType === 'image') {
        this.imageSrc = reader.result;
      } else if (fileType === 'video') {
        this.videoSrc = reader.result;
      }
    };
    reader.readAsDataURL(file);
  }
//count credits
 

// countCredits(): void {
//   const mobileNumbers = this.smsform.get('mob')?.value.split(',').map((number: any) => number.trim());
//   const messageLength = this.smsform.controls['msg'].value.length;

//   let creditCount = mobileNumbers.length; // Each number counts as one credit by default

//   if (messageLength > 160) {
//     // If message length is greater than 160, each number counts as two credits
//     creditCount *= 2;
//   }

//   this.creditcount = creditCount; // Update credit count property
// }




//**import contacts button**//
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const binaryString: string = e.target.result;
    const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
    const contacts: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const mobileNumbers: string[] = contacts.map(row => row[0]);

    this.importedPhoneNumbers = mobileNumbers.join('\n');
  };
  reader.readAsBinaryString(file);
}

importContacts(): void {
  const textareaElement: HTMLTextAreaElement | null = document.getElementById('number') as HTMLTextAreaElement;
  if (textareaElement) {
    textareaElement.value = this.importedPhoneNumbers;
  }
}


// allExcelNumbers: any;

//   importcontacts(event:any):void{
//     const file: File = event.target.files[0];
//     const reader: FileReader = new FileReader();

//     reader.onload = (e:any)=>{
//       const binaryString: string=e.target.result;
//       const workbook: XLSX.WorkBook = XLSX.read(binaryString,{type: 'binary'});
//       const sheetName: string = workbook.SheetNames[0];
//       const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
//       const contacts: any[]=XLSX.utils.sheet_to_json(worksheet, {header: 1});
//       const  mobileNumbers: string[] =contacts.map(row => row[0]);

//       const mobileNumbersString: string=mobileNumbers.join('\n');



//       this.allExcelNumbers=mobileNumbersString
//     };
//     reader.readAsBinaryString(file);
//   }
//   importContacts():void{
//     this.smsform.patchValue({mob:this.allExcelNumbers});
//   }


//credits counts
mobileNumbersInput: string = ''; // Variable to store the textarea input
creditsCount: number = 0;

updateCredits(): void {
  // Split the input by newline characters
  const lines = this.mobileNumbersInput.split('\n');

  // Count the number of lines that are not empty
  this.creditsCount = lines.filter(line => line.trim() !== '').length;
}





  
}
