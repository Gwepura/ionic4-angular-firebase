import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreDbService } from '../providers/firestore-db.service';
import { WidgetUtilService } from '../providers/widget-util.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  productId: string = '';
  productDetailAvailable: boolean = false;
  productDetail: any = {};
  productDetailList: Array<any> = [];

  constructor(private activatedRoute: ActivatedRoute, private firestoreDbService: FirestoreDbService, private widgetUtilService: WidgetUtilService) {
    this.activatedRoute.params.subscribe(result => {
      console.log('result==', result);
      this.productId = result.id;
      this.getProductDetail();
    });
   }

  ngOnInit() {
  }

  async getProductDetail() {
    try {
      this.productDetailAvailable = false;
      const result = await this.firestoreDbService.getDataById('product', this.productId);
      console.log('product detail', result);
      this.productDetail = result;
      this.productDetailList = [];
      for (const key in this.productDetail) {
        this.productDetailList.push({
          name: key,
          value: this.productDetail[key]
        });
      }
      this.productDetailAvailable = true;
    } catch (error) {
      console.log(error);
      this.widgetUtilService.presentToast(error.message);
      this.productDetailAvailable = true;
    }
  }

}
