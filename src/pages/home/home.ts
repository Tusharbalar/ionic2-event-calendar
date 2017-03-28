import { NavController } from 'ionic-angular/index';
import { Component } from "@angular/core";
import { SurveyService } from '../../service/survey.service';

@Component({
  templateUrl: "home.html"
})

export class HomePage {

  public eventSource = [];
  public viewTitle;
  public sel_date;
  public currentDate;
  public canCreateNewEvent;
  public isToday: boolean;
  public hasEvents;
  public calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(private navController: NavController,
    private eventService: SurveyService) {
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.hasEvents = ev.events !== undefined && ev.events.length !== 0;
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
    this.sel_date = event;
    this.currentDate = event.getFullYear() + "-" + (event.getMonth() + 1);
    var current = new Date();
    current.setHours(0, 0, 0);
    this.canCreateNewEvent = event < today;
  }

  onRangeChanged(ev: { startTime: Date, endTime: Date }) {
    var eventMonth = this.currentDate;
    this.eventSource = [];
    this.getAllEvents(eventMonth);
  }

  getAllEvents(eventMonth) {
    this.eventService.GetEvents(eventMonth).subscribe((res) => {
      this.buildArray(res);
    }, (err) => {
    });
  }

  buildArray(data) {
    let tmp = [];
    data.forEach((val, index) => {
      tmp.push({
        id: val.id,
        startTime: new Date(val.start),
        endTime: new Date(val.end),
        title: val.title,
        allDay: false,
        location: val.location,
        time1: val.startTime,
        time2: val.endTime,
        color: val.color,
        durationDays: val.durationDays
      });
    });
    console.log("SDSD", tmp)
    this.eventSource = tmp;
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}