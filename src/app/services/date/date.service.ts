import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class DateService {
  constructor() {}

  /**
   * *** devuelve la fecha actual ***
   * *** formato 2020-10-05 ***
   */
  getDateCurrent() {
    let date: Date = new Date();
    return (
      date.getFullYear() +
      "-" +
      this.addZero(date.getMonth() + 1) +
      "-" +
      this.addZero(date.getDate())
    );
  }

  /**
   * *** devuelve la hora actual ***
   */
  getTimeCurrent() {
    let date: Date = new Date();
    return (
      this.addZero(date.getHours()) +
      ":" +
      this.addZero(date.getMinutes()) +
      ":" +
      this.addZero(date.getSeconds())
    );
  }

  /**
   * *** devuelve el primer dia del mes ***
   */
  getFirstDayMonth() {
    let date: Date = new Date();
    var firstDay: Date = new Date(
      date.getFullYear(),
      this.addZero(date.getMonth()),
      this.addZero(1)
    );
    console.log(firstDay);
    return (
      firstDay.getFullYear() +
      "-" +
      this.addZero(firstDay.getMonth() + 1) +
      "-" +
      this.addZero(firstDay.getDate())
    );
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
}
