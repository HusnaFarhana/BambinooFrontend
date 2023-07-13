export interface iStaffModel  {
  _id: string;
  name: string;
  email: string;
  dob: string;
  password: string;
  address: string;
  adharNo: string;
  contact: string;
  image: string;
  token: string;
  kids: iKidModel[];
};

export interface iKidModel  {
  _id: string;
  name: string;
  dob: string;
  gender: string;
  medications: string;
  relation: string;
  parent: {
    address: [];
    contact: string;
    dob: string;
    email: string;
    adharNo: string;
    name: string;
    password: string;
    token: string;
    verified: boolean;
    _id: string;
    mykids: string[];
  };
  active: string;
  subscription: {
    date: Date;
    expDate: Date;
    id: iPlanModel;
    paymentid:string
  };
  image: string;
  staff: iStaffModel;
};

export interface iPlanModel  {
  name: string;
  description: string;
  athome: string;
  ageGroup: string;
  price: number;
  users: string[];
  active:Boolean,
  _id: string;
};

export interface iUserModel  {
  _id: string;
  name: string;
  email: string;
  dob: string;
  contact: string;
  adhar: string;
  mykids: iKidModel[];
  password: string;
  verified: string;
  address: string;
  token: string;
};
export interface iPayloadType  {
  name: string;
  staffid: string;
  iat: number;
  exp: number;
};
export interface iUserPayload  {
  name: string;
  userid: string;
  iat: number;
  exp: number;
};