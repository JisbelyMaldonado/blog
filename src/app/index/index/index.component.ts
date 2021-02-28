import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DateService } from 'app/services/date/date.service';
import { MessagesService } from 'app/services/messages/messages.service';
import { Messages } from '../../interfaces/messages';

declare var $: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public textVisible: boolean = false;
  public textVisible1: boolean = false;
  public textVisibleSer1: boolean = false;
  public textVisibleSer2: boolean = false;

  public istoggle: boolean = false;
  private toggleButton;
  public sidebarVisible: boolean;
  public message : Messages;

  constructor(public dateService: DateService, 
    public messageService: MessagesService,
    ) { }


  ngOnInit(): void {
    window.scrollTo(0,0)
    this.message = {}
  }


  public toggleContent() {
    this.istoggle= !this.istoggle;
  }

  public scroll(option: string) {
      let idSection = '#'+option;
      if(idSection) {
        console.log('SE EJECUTO EL SCROLL');
        $("html, body").animate(
          {
            scrollTop: $(idSection).position().top,
          },
          2000,
          function () { }
        );
      }

  }

 public viewContact() {
  $("html, body").animate(
    {
      scrollTop: $('#contact').position().top,
    },
    800,
    function () { }
  );
 } 

  public onSaveMessage(message: Messages, valid: boolean, messageForm: NgForm) {
    message.message_date = this.dateService.getDateCurrent();
     message.message_name = message.message_name;
     message.message_id = new Date().getTime().toString();
     message.message_time = this.dateService.getTimeCurrent();
     if (valid) {
       this.messageService.saveMessage(message).then(() => {
        this.showNotification('top', 'right', 'Ok! Tu mensaje fue enviado con exito.', 'success')
         messageForm.resetForm();
         this.message = {};
       });
     }
  }

  public cancel(message: Messages, valid: boolean, messageForm: NgForm) {
    messageForm.resetForm();
  }
  public showNotification(from, align, msg , type) {
    $.notify({
      message: "<b>" + msg + "</b> "
    }, {
      type: type,
      color: 'rgb(204, 51, 51)',
      class: 'notify',
      timer: 6000,
      placement: {
        from: from,
        align: align
      }
    });
  }


  viewMore(){
    this.textVisible = true;
  }

  viewLess(){
    this.textVisible = false;
  }
  
  viewMoreSer2(){
    this.textVisibleSer2 = true;
  }

  viewMoreSer1(){
    this.textVisibleSer1 = true;
  }

  viewLessSer1(){
    this.textVisibleSer1 = false;
  }
  
  viewMore1(){
    this.textVisible1 = true;
  }

  viewLess1(){
    this.textVisible1 = false;
  }
  viewLessSer2(){
    this.textVisibleSer2 = false;
  }
}
