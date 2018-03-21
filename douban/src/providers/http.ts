import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { LoadingController, AlertController, ToastController } from "ionic-angular";

@Injectable()
export class AppGloal {

    //參考鏈接https://github.com/jokermonn/-Api/blob/master/DoubanMovie.md

    static cache: any = {

    }

    static domain = "https://api.douban.com";
    
    static API = {
            //正在上映的電影列表
            getTheaters: '/v2/movie/in_theaters'
    }
};

@Injectable()
export class HttpService {
    constructor(
        public http: Http,
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController){}

    //对参数解碼
    encode(params) {
        let str = '';
        if(params) {
            for(let key in params) {
                let value = params[key];
                str += encodeURIComponent(key) + '=' +encodeURIComponent(value) + '&';
            }
            str = '?' + str.substring(0,str.length - 1);
        }
        return str;
    }


    httpGet(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create({});
        if(loader) {
            loading.present();
        }
        this.http.get(AppGloal.domain + url + this.encode(params))
            .toPromise()
            .then(res => {
                let d = res.json();
                if(loader){
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if(loader){
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    httpPost(url, params, callback, loader: boolean = false) {
        let loading = this.loadingCtrl.create({});
        if(loader) {
            loading.present();
        }
        this.http.post(AppGloal.domain + url , params)
            .toPromise()
            .then(res => {
                let d = res.json();
                if(loader){
                    loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            })
            .catch(error => {
                if(loader){
                    loading.dismiss();
                }
                this.handleError(error);
            });
    }

    private handleError(error: Response | any) {
        let msg = '';
        if(error.status == 400) {
            msg = '请求无效( code : 400)';
            console.log('请检查参数类型是否匹配');
        }
        if(error.status == 404) {
            msg = '请求资源不存在( code : 404)';
            console.log(msg + '请检查路径是否正确');
        }
        if(error.status == 500) {
            msg = '服务器发生错误( code : 500)';
            console.log(msg + '请检查路径是否正确');
        }
        console.error(msg);
        if(msg != ''){
            this.toast(msg);
        }
    }

    toast(message, callback?) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    }
}