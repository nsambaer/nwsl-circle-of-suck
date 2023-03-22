import { Component } from '@angular/core';
import { CircleOfSuckResult } from 'src/app/model/circle-suck-result';
import * as _ from 'lodash';
import { DataService } from '../services/data.service';
import { NgxEchartsModule } from 'ngx-echarts';


@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.css']
})
export class CircleComponent {

  constructor(private dataService: DataService) {}

  circleOfSuckFile = "fileName";
  loading = false;
  data: CircleOfSuckResult;
  isComplete = false;

  ngOnInit() {
    // this.data = dataService.getData(year);
    this.data = this.dataService.getStaticData();
    this.isComplete = _.every(this.data, 'isPlayed')
    
  }




}