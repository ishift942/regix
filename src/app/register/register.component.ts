import { Component, OnInit,  TemplateRef } from '@angular/core';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { Country } from './country';
import { State } from './state';
import { DataServiceService } from './data-service.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/user.service';
import { User } from '../../shared/user';
import {AbstractControl} from '@angular/forms';
import { CreditCardValidator } from 'ngx-credit-cards';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as Payment from 'payment';
Payment.fns.restrictNumeric = Payment.restrictNumeric;
Payment.fns.formatCardExpiry = Payment.formatCardExpiry;
Payment.fns.formatCardCVC = Payment.formatCardCVC;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [DataServiceService]

})
export class RegisterComponent implements OnInit {
  creditCard = true;
  selectedCountry:Country = new Country(0, 'Egy');
  countries: Country[];
  states: State[];
  private btnDisable: boolean = true;
  modalRef: BsModalRef;
  whithoutSpace: number;
  constructor(private _dataService: DataServiceService,
              private formBuilder: FormBuilder,
              private userService: UserService,
            private modalService: BsModalService) {
              this.countries = this._dataService.getCountries();
  }
  onSelect(countryid) {
    this.states = this._dataService.getStates()
      .filter((item)=> item.countryid == countryid);
    this.btnDisable = false;
    if (countryid == 0){
      this.btnDisable = true;
    }
    else {
      this.btnDisable = false;
    }
    console.log(countryid);
  };
  notSpecified($event)
  {let target = $event.target;
    if(target.checked){
      this.creditCard = false;
      this.addForm.value.creditCardExp = 0;
      this.addForm.value.creditCard ="0" ;
      this.addForm.value.creditCardTimeExp = 0 ;
      console.log(this.creditCard);
    } else if(target.unchecked){
      this.creditCard = true;
      console.log(this.creditCard);
    }
};
specified($event){let target = $event.target;
  if(target.checked){
    this.creditCard = true;
    console.log(this.creditCard);
  } else if(target.unchecked){
    this.creditCard = false;
    this.addForm.value.creditCardExp = 0;
    this.addForm.value.creditCard ="0" ;
    this.addForm.value.creditCardTimeExp = 0 ;


  }
};
addForm: FormGroup;
 user  = {
  "requestType": "ADD",
  "userId": -1,
  "loginToken": "",
  "internalUser": false,
  "services": [
    {
      "userCNEnumId": 2,
      "pwd": "123",
      "fName": "Ahmed",
      "lName": "Rashwan",
      "city": "",
      "zipCode": 0,
      "leadRefRepName": "",
      "usersCNLeadSourceEnumId": 26000,
      "leadSourceDesc": "",
      "userCNAdresses": [
        {
          "usersCNAdressesEnumId": 1,
          "addressLine1": "",
          "addressLine2": ""
        }
      ],
      "userCNCreditCards": [
        {
          "creditCardEnumId": 1000,
          "creditCard": "",
          "creditCardTimeExp": 0
        }
      ],
      "userCNEmails": [
        {
          "emailEnumId": 10001,
          "email": "a.rashwanT3@3ddx.com"
        }
      ],
      "userCNTelecoms": [
        {
          "telecomEnumId": 11000,
          "telecom": ""
        }
      ],
      "isPortableVersion": false,
      "countryEnumId": 0,
      "serviceName": "VUsersCN",
      "columns": [],
      "ConditionsAnded": false
    }
  ]
};
  onSubmit() {
    // let expirationDate = this.addForm.value.creditCardExpMonth +  this.addForm.value.creditCardExpYear;
    this.user.requestType = "ADD";
    this.user.userId= -1;
    this.user.loginToken= "";
    this.user.internalUser = false;
    this.user.services[0].userCNEnumId = 2;
    this.user.services[0].pwd = this.addForm.value.password;
    this.user.services[0].fName = this.addForm.value.fName;
    this.user.services[0].lName = this.addForm.value.lName;
    this.user.services[0].city = this.addForm.value.city;
    this.user.services[0].zipCode = this.addForm.value.zipCode;
    this.user.services[0].leadRefRepName = this.addForm.value.clientFrom;
    this.user.services[0].usersCNLeadSourceEnumId = 26000;
    this.user.services[0].leadSourceDesc = this.addForm.value.clientFromDetails;
    this.user.services[0].userCNAdresses[0].addressLine1 = this.addForm.value.mainAddress;
    this.user.services[0].userCNAdresses[0].addressLine2 = this.addForm.value.altAddress;
    this.user.services[0].userCNEmails[0].emailEnumId = 10001 ;
    this.user.services[0].userCNEmails[0].email = this.addForm.value.email ;
    this.user.services[0].userCNTelecoms[0].telecomEnumId = 11000;
    this.user.services[0].userCNTelecoms[0].telecom = this.addForm.value.primaryTelephone;
    this.user.services[0].countryEnumId = this.addForm.value.country;
    this.user.services[0].userCNAdresses[0].usersCNAdressesEnumId = this.addForm.value.mainAddressType;
    console.log("Create User ::",this.user);
     if(this.creditCard = false){
      this.user.services[0].userCNCreditCards[0].creditCard = "1000";
      this.user.services[0].userCNCreditCards[0].creditCardTimeExp = 0 ;
      this.user.services[0].userCNCreditCards[0].creditCardEnumId = 0;
      this.addForm.value.creditCardExp = 0;
      this.addForm.value.creditCard = null ;
      this.addForm.value.creditCardTimeExp = 0 ;}
    this.addForm.value.creditCardExp = this.addForm.value.creditCardExp;
    this.whithoutSpace = this.addForm.value.creditCardExp.replace(/[&\/\\#,+()$~%.'":*?<>{}]+[ \t]+[ /t]+|[ /t]/g,'');
    // this.whithoutSpace = this.addForm.value.creditCardExp.replace(/[&\/\\#,+()$~%.'":*?<>{}]+[ \t]+[ \t]+|[ \t]/g,'');

     else  if(this.creditCard = true){
        this.user.services[0].userCNCreditCards[0].creditCard = this.addForm.value.cardNumber;
        this.user.services[0].userCNCreditCards[0].creditCardTimeExp = this.whithoutSpace;
      }
console.log("whithout slash",this.whithoutSpace);
      console.log(this.creditCard);
      this.userService.createUser(this.user) => {
        this.addForm.reset();
        setTimeout(function(){ window.open("https://3ddiagnostix.com/newconnect-ui/","_self"); }, 3000);
      };
    }

  account_validation_message = {
    'email': [
      {type: 'required', message:'Email is required'},
      {type:'pattern',message:'Enter a valid Email'}
    ],
    'fName': [
      {type: 'required', message:'First Name is required'},
      {type:'maxlength', message:'Maximum of 25 characters'},
      {type:'minlength', message:'Minimum of 2 characters'}
    ],
    'password': [
      {type: 'required', message:'password is required'},
      {type:'minlength', message:'Minimum of 8 characters'}
    ],
    'accountType': [
      {type: 'required', message:'Account Type is required'},
    ],
    'ConfirmPassword': [
      {type: 'notEquivalent', message:'password Not Match'},
      {type: 'required', message:'confirm your password'}
    ]
  };
  private checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        const passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({notEquivalent: true});
        } else {
          return passwordConfirmationInput.setErrors(null);
        }
      };
    };
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      email: ['',  Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_\\-\\.]+@{1}[a-zA-Z0-9\\-]+\\.{1}[a-zA-Z]{2,4}$')])],
      fName: ['',  Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(2)])],
      lName: ['', Validators],
      password: ['',  Validators.compose([Validators.required, Validators.minLength(8)])],
      ConfirmPassword: ['' , Validators.compose([Validators.required])] ,
      accountType: ['',  Validators.compose([Validators.required])],
      mainAddress: ['', Validators],
      mainAddressType: [ 0 , Validators],
      altAddress: ['', Validators],
      primaryTelephone: ['', Validators],
      primaryTelephoneType: ['', Validators],
      altTelephone: ['', Validators],
      altTelephoneType: ['', Validators],
      country: ['', Validators],
      state: ['', Validators],
      city: ['', Validators],
      zipCode: ['', Validators],
      clientFrom: ['', Validators],
      repName: ['', Validators],
      clientFromDetails: ['', Validators],
      creditCardType: ['', Validators],
      cardNumber: ['' , CreditCardValidator.validateCardNumber],
      creditCardExp: ['', CreditCardValidator.validateCardExpiry],
      cardCvv: ['', [CreditCardValidator.validateCardCvc],
    }, {validator: this.checkIfMatchingPasswords('password', 'ConfirmPassword')})
  }
   ValidateCreditCardNumber() {
     if(this.creditCard = true){
    let ccNum = document.getElementById("cardNum").value;
    let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    let amexpRegEx = /^(?:3[47][0-9]{13})$/;
    let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    let isValid = false;
    if (visaRegEx.test(ccNum)) {
      isValid = true;
      console.log("visaRegEx");
      this.user.services[0].userCNCreditCards[0].creditCardEnumId = 1100;
    } else if(mastercardRegEx.test(ccNum)) {
      isValid = true;
      console.log("mastercardRegEx")
      this.user.services[0].userCNCreditCards[0].creditCardEnumId = 1200;
    } else if(amexpRegEx.test(ccNum)) {
      isValid = true;
      console.log("amexpRegEx");
      this.user.services[0].userCNCreditCards[0].creditCardEnumId = 1300;
    }
  }
  };

}
