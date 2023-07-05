export type staffModel = {
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
  kids: kidModel[];
};

export type kidModel = {
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
    id: planModel;
    paymentid:string
  };
  image: string;
  staff: staffModel;
};

export type planModel = {
  name: string;
  description: string;
  athome: string;
  ageGroup: string;
  price: number;
  users: string[];
  _id: string;
};

export type userModel = {
  _id: string;
  name: string;
  email: string;
  dob: string;
  contact: string;
  adhar: string;
  mykids: kidModel[];
  password: string;
  verified: string;
  address: string;
  token: string;
};
export type PayloadType = {
  name: string;
  staffid: string;
  iat: number;
  exp: number;
};
export type UserPayload = {
  name: string;
  userid: string;
  iat: number;
  exp: number;
};