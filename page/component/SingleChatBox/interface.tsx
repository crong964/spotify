export interface BoxInfor {
  idbox: string;
}
export interface boxChat {
  pathImage: string;
  Name: string;
  idBox: string;
  id: string; // id người gửi cuối
  type: string;
  permission: number;
  idUser: string; //id bạn của bạn
}
export interface SendMessData {
  idbox: string;
}
