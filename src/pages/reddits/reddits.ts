import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RedditService} from '../../app/services/reddit.service';
import {DetailsPage} from '../details/details';


@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html',
  providers: [RedditService],
})
export class RedditsPage {
  items: any;
  category: any;
  limit: any;


  constructor(public navCtrl: NavController, private redditService: RedditService) {
    this.getDefault();

  }
  getDefault(){
    this.category = 'sports';
    this.limit = 10;
  }

  ngOnInit(){
    console.log('onInit ran');
    this.getPosts(this.category, this.limit);
  }
  getPosts(category, limit){
    this.redditService.getPosts(category, limit).subscribe(response=>{
      console.log(response);
      this.items=response.data.children;

    });

  }
  viewItem(item){
    this.navCtrl.push(DetailsPage, {
      'item': item,
    })
  }
  changeCategory(){
    this.getPosts(this.category, this.limit);

  }

}
