export interface Button {
  onClick(): void;
  text: string;
  children: React.JSX.Element;
}
export interface BoxButton {
  show: boolean;
  idBox: string;
  SetShow(d: boolean): void;
}
export interface lastmess {
  type: string;
  idMess: string;
  content: string;
  idBox: string;
  idUser: string;
}
export interface boxdata {
  idBox: string;
  idUser: string; //id của bạn bè
  Name: string;
  pathImage: string;
  imagebox: string;
  boxtype: number;
  id: string; // id của người gửi tin nhắn cuối cuối
  content: string;
  messType: string;
  status: number;
}
