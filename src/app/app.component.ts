import { Component } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { 
	ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'angular7-reactive-postMethod';
  myform: FormGroup;	  
    constructor(private http: HttpClient, private fb: FormBuilder) {
      this.myform = this.fb.group({
        datacode: ['', [Validators.required]],
        select: ['', [Validators.required]],
        uName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]+$')]],
        lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(5), Validators.pattern('^[a-zA-Z]+$')]],
        object: ['', [Validators.required]],
        datacode2: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        middlename: ['', [Validators.required]],
        uphonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
        address: ['', [Validators.required]],
        legal: ['', [Validators.required]],
        position: ['', [Validators.required]],
        guest: ['', [Validators.required]],
        gphonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
        country: ['', [Validators.required]],
        file: ['', [Validators.required]],
        fax: ['', [Validators.required]],
        unit: ['', [Validators.required]],
        objective: ['', [Validators.required]],
        stream: ['', [Validators.required]],
        region: ['', [Validators.required]],
        yourphonenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
        money: ['', [Validators.required]],
        eMail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
        soCMT: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        optionsRadios: ['', [Validators.required]],
        optionChecked: ['', [Validators.required]],
        password: ['', [Validators.required]],
        dIssue: ['', [Validators.required, this.dateNotInFuture()]],
        pIssue: ['', [Validators.required]],
        checkbox: ['', [Validators.required]],
        checkbox2: ['', [Validators.required]],
        Theoky: ['', [Validators.required]],
        ngay: ['', [Validators.required]],
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

    dateNotInFuture(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;
    
        const selectedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);
    
        console.log("Selected Date:", selectedDate);
        console.log("Today's Date:", today);
        console.log("Validation Result:", selectedDate > today ? { 'futureDate': true } : null);
    
        return selectedDate > today ? { 'futureDate': true } : null;
      };
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
