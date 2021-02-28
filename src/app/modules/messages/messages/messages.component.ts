import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Messages } from 'app/interfaces/messages';
import { MessagesService } from 'app/services/messages/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  public arrayMessages : Array<Messages>
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("tablePost") paginator: MatPaginator;
  public categories: Array<string> = ['Niños y adolescentes', 'Familia','Reflexiones']
  public dataSource: MatTableDataSource<Messages>;
  public displayedColumns: string[] = [
    "Nº",
    "Fecha",
    "Hora",
    "Email",
    "Nombre",
    "Teléfono",
    "Ver",
  ];

  public message : Messages;
  constructor(private messagesService: MessagesService) { }

  ngOnInit(): void {
    this.getMessages();
    this.message = {}
  }

  public getMessages() {
    this.messagesService.getMessages().subscribe(messages => {
      this.arrayMessages = messages;
      this.dataSource = new MatTableDataSource<Messages>(messages);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

      /**
   * *** Function para filtar en data table ***
   * @param event
   */
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public viewMessage(message: Messages) {
    this.message = message;
  }
}
