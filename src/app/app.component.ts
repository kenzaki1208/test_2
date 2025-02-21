import { Component } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { 
	ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'angular7-reactive-postMethod';
  myform: FormGroup;	  
    constructor( private http: HttpClient) {
    	this.myform = new FormGroup({
        datacode: new FormControl('', [Validators.required]),
        select: new FormControl('',   [Validators.required]),
        uName: new FormControl(	'',	[Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]+$')]),
        lastName: new FormControl(	'',	[Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern('^[a-zA-Z]+$')]),
        object: new FormControl('',   [Validators.required]),
        datacode2: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        middlename: new FormControl('',   [Validators.required]),
        uphonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]),
        address: new FormControl('', 	[Validators.required]),
        legal: new FormControl('', 	[Validators.required]),
        position: new FormControl('', 	[Validators.required]),
        guest: new FormControl('', 	[Validators.required]),
        gphonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]),
        country: new FormControl('', 	[Validators.required]),
        file: new FormControl('', 	[Validators.required]),
        fax: new FormControl('', 	[Validators.required]),
        unit: new FormControl('', 	[Validators.required]),
        objective: new FormControl('',   [Validators.required]),
        stream: new FormControl(  '',  [Validators.required]),
        region: new FormControl(  '',  [Validators.required]),
        yourphonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]), 
        money: new FormControl(  '',  [Validators.required]), 
        eMail: new FormControl(  '',  [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
        soCMT: new FormControl(  '',  [Validators.required, Validators.pattern('^[0-9]+$')]),
        optionsRadios : new FormControl('',   [Validators.required]),
        optionChecked : new FormControl('',   [Validators.required]),
        password: new FormControl(  '',  [Validators.required]),
        dIssue : new FormControl('',   [Validators.required]),
        pIssue : new FormControl('',   [Validators.required]),
        checkbox: new FormControl('',   [Validators.required]),
        checkbox2: new FormControl('',   [Validators.required]),
        Theoky: new FormControl('',   [Validators.required]),
        ngay: new FormControl('',   [Validators.required]),
      });  
  	}

  	 get formData() { return this.myform.controls; };

    get datacode() {
      return this.myform.get('datacode')!;
    }
    get select() {
      return this.myform.get('select')!;
    }
    get uName() {
      return this.myform.get('uName')!;
    }
    get lastName() {
      return this.myform.get('lastName')!;
    }
    get object() {
      return this.myform.get('object')!;
    }
    get datacode2() {
      return this.myform.get('datacode2')!;
    }
    get middlename() {
      return this.myform.get('middlename')!;
    }
    get uphonenumber() {
      return this.myform.get('uphonenumber')!;
    }
    get address() {
      return this.myform.get('address')!;
    }
    get legal() {
      return this.myform.get('legal')!;
    }
    get position() {
      return this.myform.get('position')!;
    }
    get guest() {
      return this.myform.get('guest')!;
    }
    get gphonenumber() {
      return this.myform.get('gphonenumber')!;
    }
    get country() {
      return this.myform.get('country')!;
    }
    get file() {
      return this.myform.get('file')!;
    }
    get fax() {
      return this.myform.get('fax')!;
    }
    get unit() {
      return this.myform.get('unit')!;
    }
    get objective() {
      return this.myform.get('objective')!;
    }
    get stream() {
      return this.myform.get('stream')!;
    }
    get region() {
      return this.myform.get('region')!;
    }
    get yourphonenumber() {
      return this.myform.get('yourphonenumber')!;
    }
    get money() {
      return this.myform.get('money')!;
    }
    get eMail() {
      return this.myform.get('eMail')!;
    }
    get soCMT() {
      return this.myform.get('soCMT')!;
    }
    get optionsRadios() {
      return this.myform.get('optionsRadios')!;
    }
    get optionChecked() {
      return this.myform.get('optionChecked')!;
    }
    get password() {
      return this.myform.get('password')!;
    }
    get dIssue() {
      return this.myform.get('dIssue')!;
    }
    get pIssue() {
      return this.myform.get('pIssue')!;
    }
    get Theoky() {
      return this.myform.get('Theoky')!;
    }
    get checkbox() {
      return this.myform.get('checkbox')!;
    }
    get checkbox2() {
      return this.myform.get('checkbox2')!;
    }
    get ngay() {
      return this.myform.get('ngay')!;
    }

    dateNotInFuture(control: FormControl) {
      const selectedDate = new Date(control.value);
      const today = new Date();
  
      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);
  
      return selectedDate > today ? { futureDate: true } : null;
    }
  

 validateForm() { 

for(let i in this.myform.controls)
    this.myform.controls[i].markAsTouched();

}

onSubmit (user: any): void  {
	console.log(user);    
    if (this.myform.valid) {
    let url = "https://reqres.in/api/users";     
        const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');
      this.http.post(url, user).subscribe(res => console.log("Data Post Done"));
    
	}
}
}
