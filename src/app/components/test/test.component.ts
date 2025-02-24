import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient  } from '@angular/common/http';
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
import { DataService } from '../test_01/data.service';

import * as wjcCore from '@mescius/wijmo';
import * as wjcGrid from '@mescius/wijmo.grid';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent  {
  title = 'angular7-reactive-postMethod';
  myform: FormGroup;	  
  data: any[] = [];

    constructor(private http: HttpClient, private fb: FormBuilder) {
      this.myform = this.fb.group({
        datacode: ['', [Validators.required]],
        group: ['', [Validators.required]],
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
        optionChecked: [false, Validators.requiredTrue],
        password: ['', [Validators.required]],
        dIssue: ['', [Validators.required, this.dateNotInFuture()]],
        pIssue: ['', [Validators.required]],
        checkbox: [false, Validators.requiredTrue],
        checkbox2: [false, Validators.requiredTrue],
        Theoky: ['', [Validators.required]],
        ngay: ['', [Validators.required]],
      });
    }



     get formData() { return this.myform.controls; };

    get datacode() {
      return this.myform.get('datacode')!;
    }
    get group() {
      return this.myform.get('group')!;
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
    
    errorMessages = {
      datacode: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      group: [
        {type: 'required', message: 'Không được bỏ trống.'}
      ],
      uName: [
        { type: 'required', message: 'Tên không được bỏ trống.' },
        { type: 'minlength', message: 'Tên không được ít hơn 3 kí tự.' },
        { type: 'maxlength', message: 'Tên không được nhiều hơn 15 kí tự.' },
        { type: 'pattern', message: 'Tên không được sử dụng số hoặc kí tự đặc biệt.' },
      ],
      lastName: [
        { type: 'required', message: 'Tên không được bỏ trống.' },
        { type: 'minlength', message: 'Tên không được ít hơn 3 kí tự.' },
        { type: 'maxlength', message: 'Tên không được nhiều hơn 15 kí tự.' },
        { type: 'pattern', message: 'Tên không được sử dụng số hoặc kí tự đặc biệt.' },
      ],
      object: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      datacode2: [
        { type: 'required', message: 'Mã số thuế không được bỏ trống.' },
        { type: 'pattern', message: 'Mã số thuế phải được nhập số.' }
      ],
      middlename: [
        { type: 'required', message: 'Tên viết tắt không được bỏ trống.' }
      ],
      uphonenumber: [
        { type: 'required', message: 'Địa chỉ liên hệ không được bỏ trống.' },
        { type: 'pattern', message: 'Địa chỉ liên hệ phải được nhập số.' },
        { type: 'maxlength', message: 'Địa chỉ liên hệ không được nhiều hơn 10 số.' }
      ],
      address: [
        { type: 'required', message: 'Địa chỉ trên hóa đơn không được bỏ trống.' }
      ],
      legal: [
        { type: 'required', message: 'Đại diện pháp luật không được bỏ trống.' }
      ],
      position: [
        { type: 'required', message: 'Chức vụ đại diện không được bỏ trống.' }
      ],
      guest: [
        { type: 'required', message: 'Đối tác liên hệ không được bỏ trống.' }
      ],
      gphonenumber: [
        { type: 'required', message: 'Số điện thoại đối tác không được bỏ trống.' },
        { type: 'pattern', message: 'Số điện thoại đối tác phải được nhập số.' },
        { type: 'maxlength', message: 'Số điện thoại đối tác không được nhiều hơn 10 số.' }
      ],
      country: [
        { type: 'required', message: 'Quốc gia không được bỏ trống.' }
      ],
      optionsRadios: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      fax: [
        { type: 'required', message: 'fax không được bỏ trống.' }
      ],
      unit: [
        { type: 'required', message: 'Đơn vị cơ sở không được bỏ trống.' }
      ],
      objective: [
        { type: 'required', message: 'Ngành hàng không được bỏ trống.' }
      ],
      stream: [
        { type: 'required', message: 'Kênh bán hàng không được bỏ trống.' }
      ],
      region: [
        { type: 'required', message: 'Vùng không được bỏ trống.' }
      ],
      money: [
        { type: 'required', message: 'Tiền tệ phí BL không được bỏ trống.' }
      ],
      yourphonenumber: [
        { type: 'required', message: 'Số điện thoại không được bỏ trống.' },
        { type: 'pattern', message: 'Số điện thoại phải được nhập số.' },
        { type: 'maxlength', message: 'Số điện thoại không được nhiều hơn 10 số.' }
      ],
      eMail: [
        { type: 'required', message: 'Email không được bỏ trống.' },
        { type: 'pattern', message: 'Email không đúng định dạng.' }
      ],
      soCMT: [
        { type: 'required', message: 'Số CMT không được bỏ trống.' },
        { type: 'pattern', message: 'Số CMT phải được nhập số.' }
      ],
      optionChecked: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      password: [
        { type: 'required', message: 'không được bỏ trống.' }
      ],
      dIssue: [
        { type: 'required', message: 'Ngày cấp không được bỏ trống.' },
        { type: 'futureDate', message: 'Ngày cấp không được lớn hơn ngày hiện tại.' }
      ],
      pIssue: [
        { type: 'required', message: 'Nơi cấp không được bỏ trống.' }
      ],
      checkbox: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      checkbox2: [
        { type: 'required', message: 'Không được bỏ trống.' }
      ],
      Theoky: [
        { type: 'required', message: 'Theo kỳ không được bỏ trống.' }
      ],
      ngay: [
        { type: 'required', message: 'Ngày Không được bỏ trống.' }
      ],
    };
  

 validateForm() { 

  for(let i in this.myform.controls)
      this.myform.controls[i].markAsTouched();

  }

  onSubmit(user: any): void {
    console.log("Form value:", this.myform.value); 
    console.log(user);    
    this.validateForm(); 



      this.data = [
        {
          datacode: this.myform.value.datacode,
          group: this.myform.value.group,
          uName: this.myform.value.uName,
          lastName: this.myform.value.lastName,
          object: this.myform.value.object,
          optionChecked: this.myform.value.optionChecked,
          datacode2: this.myform.value.datacode2,
          middlename: this.myform.value.middlename,
          uphonenumber: this.myform.value.uphonenumber,
          address: this.myform.value.address,
          legal: this.myform.value.legal,
          position: this.myform.value.position,
          guest: this.myform.value.guest,
          gphonenumber: this.myform.value.gphonenumber,
          country: this.myform.value.country,
          optionsRadios: this.myform.value.optionsRadios,
          fax: this.myform.value.fax,
          unit: this.myform.value.unit,
          objective: this.myform.value.objective,
          stream: this.myform.value.stream,
          region: this.myform.value.region,
          money: this.myform.value.money,
          yourphonenumber: this.myform.value.yourphonenumber,
          eMail: this.myform.value.eMail,
          soCMT: this.myform.value.soCMT,
          dIssue: this.myform.value.dIssue,
          pIssue: this.myform.value.pIssue,
          checkbox: this.myform.value.checkbox,
          checkbox2: this.myform.value.datacode,
          Theoky: this.myform.value.Theoky,
          ngay: this.myform.value.ngay,
        }
      ]
      console.log(this.myform)
      console.log("Form is invalid");
    }

    
  }

    

