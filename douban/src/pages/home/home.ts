import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpService, AppGloal } from '../../providers/http/http';

declare let baidumap_location;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  inTheaters: Array<any> = [];

  start = 1;

  count = 10;

  constructor(public navCtrl: NavController,public httpService: HttpService) {
    this.getInTheaters();

    baidumap_location.getCurrentPosition(result=>{
      alert(JSON.stringify(result, null, 4));
    },error=>{

    });
  }

  getInTheaters() {
    var params = {
      //固定值0b2bdeda43b5688921839c8ecb20399b
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      //所在城市，例如北京、上海等
      city: '上海',
      //分页使用，表示第几页
      start: this.start,
      //分页使用，表示数量
      count: this.count,
      //客户端信息。可为空
      client: '',
      //用户 id。可为空
      udid: ''
    }
    this.httpService.httpGet(AppGloal.API.getTheaters,params,res =>{
      debugger;
     
      if(this.start == 1) {
        this.inTheaters = res.subjects;
      }else{
        this.inTheaters.push(res.subjects);
      }
    });
  }

  doInfinite(): Promise<any> {
    console.log('Begin async operation');
    this.start++;
    return new Promise((resolve) => {
      setTimeout(() => {
        this.getInTheaters();
        resolve();
      }, 500);
    })
  }

}
