import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { Observable } from "rxjs/Observable";
import { HttpService, AppGloal } from '../../providers/http/http';

export class ChatMessage {
  messageId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  toUserId: string;
  code: string;
  time: number | string;
  message: string;
  status: string;
}

export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
}

@Injectable()
export class ChatService {

  constructor(public events: Events, public httpService: HttpService) {
  }

  mockNewMsg(code, msg) {
    const mockMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: '210000198410281948',
      userName: '小灵',
      userAvatar: './assets/imgs/to-user.jpg',
      toUserId: '140000198202211138',
      time: Date.now(),
      code: code,
      message: msg,
      status: 'success'
    };
    this.events.publish('chat:received', mockMsg, Date.now())
  }

  sendMsg(msg: ChatMessage) {
    return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    .then(() => this.getTuLingInfo(msg));
  }

  getUserInfo(): Promise<UserInfo> {
    const userInfo: UserInfo = {
      id: '140000198202211138',
      name: '路飞',
      avatar: './assets/imgs/user.jpg'
    };
    return new Promise(resolve => resolve(userInfo));
  }

  getTuLingInfo(msg) {
    var params = {
      key: '1dab66be476347f29a70767dbfff22bc',
      info: msg.message,
    }
    this.httpService.httpPost(AppGloal.API.getTuLingInfo,params,res =>{
        this.mockNewMsg(res.code, res.text);
    });
  }

}
