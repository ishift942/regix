export class User {
  requestType?: string;
  userId?: number;
  loginToken?: string;
  internalUser: boolean;
  services: service;

}



interface service {
  userCNEnumId?:number,
  pwd?:string,
  fName?:string,
  lName?:string,
  city?:string,
  zipCode?:number,
  leadRefRepName?:string,
  usersCNLeadSourceEnumId?:number,
  leadSourceDesc?:string,
  userCNAdresses?: userCNAdress[];
}


interface userCNAdress {
  usersCNAdressesEnumId?:number,
  addressLine1?:string,
  addressLine2?:string

}
