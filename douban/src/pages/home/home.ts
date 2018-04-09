import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { HttpService, AppGloal } from '../../providers/http/http';
import { Events } from 'ionic-angular';

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

  city: string;

  loadMore: boolean = true;

  constructor(public navCtrl: NavController, public httpService: HttpService, public events: Events) {
    this.getCity(httpService);
    this.getInTheaters();
    this.initEvent(events);
  }

  initEvent(events) {
    events.subscribe('city:selected', cityObj => {
      this.city = cityObj.name;
      this.start = 1;
      this.getInTheaters();
    });
  }

  getCity(httpService){
    if('undefined' != typeof baidumap_location) {
      baidumap_location.getCurrentPosition(result=>{
        this.city = result.city;
      },error=>{
        this.city = '大连';
        httpService.toast(error,null);
      });
    } else {
      this.city = '大连';
    }
  }

  getInTheaters() {
    var params = {
      //固定值0b2bdeda43b5688921839c8ecb20399b
      apikey: '0b2bdeda43b5688921839c8ecb20399b',
      //所在城市，例如北京、上海等
      city: this.city,
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
      if(res.subjects.length < this.count) {
        this.loadMore = false;
      }
      if(this.start == 1) {
        this.inTheaters = res.subjects;
        this.loadMore = true;
      }else{
        this.inTheaters = this.inTheaters.concat(res.subjects);
      }
    });
  }

  doRefresh(refresher){
    setTimeout(() => {
      this.start = 1;
      this.getInTheaters();
      refresher.complete();
    }, 1000);
  }

  doInfinite(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if(this.loadMore){
          this.start = this.count + this.start;
          this.getInTheaters();
          resolve();
        } else {
          resolve();
        }
      }, 1000);
    });
  }
  goCityPage(){
    this.navCtrl.push('CitySelectPage');
  }

}
