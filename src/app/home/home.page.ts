import { Component,OnInit,ViewChild } from '@angular/core';
import { ShareService } from './services/http.service';
import { HttpClient } from '@angular/common/http';
import { IonAccordionGroup } from '@ionic/angular';
import {ActionSheetController } from '@ionic/angular';  
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { employees } from './services/employee';
import { Injectable } from '@angular/core';


@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;

  
  constructor(private store:ShareService,
              private http:HttpClient,
              public actionsheetCtrl: ActionSheetController,
              private toastController: ToastController
    ) {}
  ngOnInit(): void {
    this.Fetchdata()
  }
    
  ProductData: employees[] = [];
  selectedProduct: employees[] = [];
  hel:any="hello"
  data:employees[]=[];;
  // Employedata:employee[]=[];
  employee!: employees;
  ShowForm:boolean=false
  homeScreen:boolean=true
  saveForm:boolean=false
  hideForm:boolean=true
  Actionmenu:boolean=false


  page: number = 2;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [1, 3, 5, 7];

  async presentActionSheet(product:employees) {
    const actionSheet = await this.actionsheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.Fetchdata()
            this.homeScreen=true
            this.saveForm=false
            this.Actionmenu=false
            this.http
            .delete(' http://localhost:3000/posts/' + product.id)
            .subscribe({
              next: (Response) => {
                this.toastController.create({
                  header: 'Welcome!',
                  message: 'Deleted Successfull',
                  position: 'top',
                  cssClass: 'toast-custom-class',
                  buttons: [
                    {
                      side: 'end',
                      icon: 'person',
                      handler: () => {
                        console.log('');
                      }
                    }, {
                      side: 'end',
                      text: 'Close',
                      role: 'cancel',
                      handler: () => {
                        console.log('');
                      }
                    }
                  ]
                }).then((toast) => {
                  toast.present();
                });

              },
              error: (Response) => {
                // alert('not deled');
              },
            });
            this.Actionmenu=false
        }
       
  
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    actionSheet.present();
  }



  Fetchdata() {
    this.store.getproduct().subscribe({
      next: (response) => {
        this.data = response;
        console.log(this.data);
  
        // alert("fetched")
      },
      error: (res) => {
        // alert("err")
      },
    });
  
  }
  // For Add Data
  Add() {
    this.employee = {};
    this.ShowForm=true
    this.homeScreen=false

  }
  
  
  
  // HideDailog() {
  //   this.DailogMenu = false;
  //   this.Submit = false;
  // }


  
  editmenu(product: employees) {
    this.employee = { ...product };
    this.Actionmenu=true
    this.homeScreen=false
  }
  
  editProduct(product: employees) {
    this.store.updateproduct(product.id, product).subscribe({
      next: (Response) => {
        // alert('up');
        this.Fetchdata();
        this.toastController.create({
          header: 'Welcome!',
          message: 'Updated Successfull',
          position: 'top',
          cssClass: 'toast-custom-class',
          buttons: [
            {
              side: 'end',
              icon: 'person',
              handler: () => {
                console.log('');
              }
            }, {
              side: 'end',
              text: 'Close',
              role: 'cancel',
              handler: () => {
                console.log('');
              }
            }
          ]
        }).then((toast) => {
          toast.present();
        });
        this.Fetchdata();
      },
      error: (Response) => {
        // alert('not up');
      },
    });
    this.Actionmenu=false
    this.ShowForm=false
    this.homeScreen=true
   
  }
  
  save() {

  
    this.store.postproduct(this.employee).subscribe({
      next: (Response) => {
        // alert('saved');
        this.Fetchdata();
        this.toastController.create({
          header: 'Welcome!',
          message: 'Registration Successfull',
          position: 'top',
          cssClass: 'toast-custom-class',
          buttons: [
            {
              side: 'end',
              icon: 'person',
              handler: () => {
                console.log('');
              }
            }, {
              side: 'end',
              text: 'Close',
              role: 'cancel',
              handler: () => {
                console.log('');
              }
            }
          ]
        }).then((toast) => {
          toast.present();
        });
        
      },
      error: (Response) => {
        // alert('not saved');
      },
    });
    this.homeScreen=true
    this.ShowForm=false
    this.Actionmenu=false
    this.ProductData = [...this.ProductData];
    this.employee = {};
  }
  delete(product: employees) {
    this.Actionmenu=false
    this.ShowForm=false
    this.homeScreen
  
        this.http
          .delete(' http://localhost:3000/posts/' + product.id)
          .subscribe({
            next: (Response) => {
              // alert('deled');
              this.Fetchdata();

            },
            error: (Response) => {
              // alert('not deled');
            },
          });
      }
    }

  
  
  
  

