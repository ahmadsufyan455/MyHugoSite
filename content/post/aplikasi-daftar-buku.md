---
title: "Membuat Aplikasi Daftar Buku Menggunakan Angular & Firebase"
date: 2020-05-05T16:03:33+07:00
draft: false
categories: [code, webApp]
---

Oke pada kesempatan kali ini saya akan mendokumentasikan langkah-langkah operasi CRUD (Cread Read Update Delete) menggunakan angular dan firebase. Pada tutorial ini saya akan membuat aplikasi **daftar buku** yang akan menampilkan data dan harga buku pada suatu toko buku.<!--more-->

Sebelum kita lanjut, sebaiknya kita memahami dulu apa itu firebase dan kenapa kita menggunakan firebase pada projek kali ini.

Jadi firebase adalah suatu layanan dari Google yang digunakan untuk mempermudah para pengembang aplikasi dalam mengembangkan aplikasi. Dengan adanya Firebase, pengembang aplikasi bisa fokus mengembangkan aplikasi *tanpa* harus memberikan *usaha yang besar*. Dua fitur yang menarik dari Firebase yaitu Firebase Remote Config dan Firebase *Realtime Database*. Selain itu terdapat fitur pendukung untuk aplikasi yang membutuhkan pemberitahuan yaitu Firebase Notification. Perlu diketahui juga bahwa firebase berjenis NoSQL.

Setelah mengetahui sekilas tentang database yang akan kita gunakan, sekarang waktunya kita mulai membuat projek. 

Let's get started...

## Membuat Aplikasi Daftar Buku

### 1. Membuat projek baru

Kita akan membuat projek baru terlebih dahulu dengan nama `daftar-buku` dengan perintah berikut :

```
ng new daftar-buku
```

Setelah itu kita akan buat beberapa komponen lainnya seperti `buku`,`list-buku`, dan sebuah servis `books` untuk mengatur servis dari aplikasi yang akan kita buat. Masuk ke folder projek `cd daftar-buku` lalu ketikkan beberapa perintah berikut ini.

```
ng g c buku
```
```
ng g c list-buku
```
```
ng g s shared/books
```

Sehingga struktur folder kita akan menjadi seperti ini.

![buku-alamat](/uploads/1.JPG "buku alamat")

### 2. Memasang UI bootstrap

Pada projek ini saya menggunakan framework bootstrap untuk mengatur tampilan halaman. Saya akan memasang bootstrap secara online dengan cara berikut.

Masuk ke halaman [Get Bootstrap](https://getbootstrap.com/) kemudian klik button **Get Started**, kemudian copy kode script **css** dan **js** dari bootstrap ke dalam `index.html` pada projek.

![buku-alamat](/uploads/2.JPG "buku alamat")

Sehingga `index.html` pada projek akan berubah seperti berikut.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>DaftarBuku</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
  <app-root></app-root>
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>
```

Selain cara diatas, kita juga bisa memasang bootstrap secara offline. Untuk tutorialnya silahkan klik [Cara Integrasi Angular dan Bootstrap](https://github.com/ahmadsufyan455/tekwebuad_1800016074/wiki/Cara-Integrasi-Angular-Dengan-UI-Framework-Bootstrap).

### 3. Membuat desain halaman

Pertama kita akan memasang komponen navbar pada halaman. Masuk ke dokumentasi bootstrap, kemudian pada bagian *components* cari *navbar*, lalu pilih desain navbar sesuai selera kemudian copy kode htmlnya.

![buku-alamat](/uploads/3.JPG "buku alamat")

Setelah itu masuk ke `app.component.html` kemudian paste kode navbar tadi dan juga tambahkan selector `<app-buku></app-buku>` dibawahnya untuk menampilkan halaman dari `buku.component.html`, sehingga `app.component.html` menjadi seperti berikut.

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">{{title}}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <a class="nav-item nav-link" href="#"><i class="fas fa-user"></i></a>
      </div>
    </div>
  </div>
</nav>

<div class="container mt-3">
  <app-buku></app-buku>
</div>
```

Berhubung pada navbar ada salah satu icon yang menggunakan *font awesome* maka kita integrasikan juga *font awesome* dengan projek. Caranya buka kembali `index.html` kemudian paste kode berikut ini diatas `</head>`

```html
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossorigin="anonymous">
```

Sekarang kita bebas memasang icon dari *font awesome* sesuai keinginan.

Lanjut, buka `buku.component.html` kemudian kita akan membuat button **Tambah Buku** menggunakan *modal* dari bootstrap. 

Buka kembali dokumentasi bootstrap dan cari komponen *modal* dan pilih jenis *modal* sesuai selera lalu copy kode htmlnya dan paste ke dalam `buku.component.html` dan tambahkan juga selector `<app-list-buku></app-list-buku>` dibawahnya untuk menampilkan halaman `list-buku.component.html` sehingga kodenya seperti ini.

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
   Tambah Buku
 </button>
 
 <!-- Modal -->
 <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
   <div class="modal-dialog" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLongTitle">Masukkan Data</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">
         ...
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
         <button type="button" class="btn btn-primary">Simpan</button>
       </div>
     </div>
   </div>
 </div>

 <div class="container mt-3">
    <app-list-buku></app-list-buku>
 </div>
```

Kemudian di dalam body *modal* kita tambahkan *form-group* untuk menginput data, silahkan kembali ke dokumentasi bootstrap dan cari komponen forms dan paste kodenya ke dalam body *modal* sehingga kode lengkapnya seperti ini.

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
   Tambah Buku
 </button>
 
 <!-- Modal -->
 <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
   <div class="modal-dialog" role="document">
     <div class="modal-content">
       <div class="modal-header">
         <h5 class="modal-title" id="exampleModalLongTitle">Masukkan Data</h5>
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
         </button>
       </div>
       <div class="modal-body">
         <form>
            <div class="form-group">
              <label for="judul">Judul Buku</label>
              <input class="form-control" id="judul">
            </div>
            <div class="form-group">
               <label for="penulis">Penulis</label>
               <input class="form-control" id="penulis">
             </div>
             <div class="form-group">
               <label for="penerbit">Penerbit</label>
               <input class="form-control" id="penerbit">
             </div>
             <div class="form-group">
               <label for="tahun">Tahun Terbit</label>
               <input class="form-control" id="tahun">
             </div>
             <div class="form-group">
               <label for="harga">Harga</label>
               <input class="form-control" id="harga">
             </div>
          </form>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
         <button type="button" class="btn btn-primary">Simpan</button>
       </div>
     </div>
   </div>
 </div>

 <div class="container mt-3">
    <app-list-buku></app-list-buku>
 </div>
```

Dan sekarang tampilan halaman kita untuk sementara adalah seperti ini.

![buku-alamat](/uploads/4.JPG "buku alamat")

### 4. Mengatur form

Pertama kita import terlebih dahulu *ReactiveFormsModule* ke dalam `app.module.ts` seperti berikut.

```javascript
...
import { ReactiveFormsModule } from '@angular/forms'
..
.

@NgModule({
  declarations: [
    AppComponent,
    BukuComponent,
    ListBukuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // tambahan
  ]
```

Setelah itu masuk ke file `books.service.ts` dan import beberapa modul berikut, yaitu *FormControl*, *FormGroup*, dan *Validators*. Selanjutnya kita deklerasikan objek `form` untuk mengatur inputan apa saja yang akan kita gunakan di dalam form tersebut. Sehingga kodenya akan menjadi seperti ini.

```javascript
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms' // tambahan

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  form = new FormGroup({
    $key: new FormControl(null),
    judulBuku: new FormControl('', Validators.required),
    penulis: new FormControl(''),
    penerbit: new FormControl(''),
    tahun: new FormControl(''),
    harga: new FormControl('')
  });
}
```

Kode diatas nantinya akan menggenerate string yang sudah kita deklerasikan ke dalam firebase. `$key` pada form diatas kita gunakan sebagai primary key untuk data kita dan nilai defautlnya adalah *null*.

Kemudian kita juga memasang validator pada *judulBuku* untuk mengatur inputan pada judul buku sehingga inputan untuk judul buku wajib di isi.

Selanjutnya kita akan menghubungkannya dengan `buku.component.html`. Sebelumnya import terlebih dahulu *BooksService* ke dalam `app.module.ts` dan nama kelasnya dimasukkan ke dalam *providers array*.

```javascript
import { BooksService } from './shared/books.service' // tambahan

@NgModule({
  declarations: [
    AppComponent,
    BukuComponent,
    ListBukuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [BooksService], // tambahan
  bootstrap: [AppComponent]
})
```

Lalu import juga *BooksService* ke dalam `buku.component.ts` dan kita buat objek pada constructornya seperti berikut.

```javascript
import { BooksService } from '../shared/books.service'

@Component({
  selector: 'app-buku',
  templateUrl: './buku.component.html',
  styleUrls: ['./buku.component.css']
})
export class BukuComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }
}
```

Sekarang buka `buku.component.html` dan pada bagian *modal body* kita lakukan modifikasi pada komponen form bootstrap seperti berikut ini.

```html
<form [formGroup]="this.booksService.form">
            <input type="hidden" formControlName="$key">
            <div class="form-group">
              <label for="judul">Judul Buku</label>
              <input formControlName="judulBuku" class="form-control" id="judul"
                [ngClass]="{'is-invalid':submitted && formControls.judulBuku.errors}">
              <div class="invalid-feedback" *ngIf="submitted && formControls.judulBuku.errors">
                Kolom ini harus di isi.
              </div>
            </div>
            <div class="form-group">
              <label for="penulis">Penulis</label>
              <input formControlName="penulis" class="form-control" id="penulis">
            </div>
            <div class="form-group">
              <label for="penerbit">Penerbit</label>
              <input formControlName="penerbit" class="form-control" id="penerbit">
            </div>
            <div class="form-group">
              <label for="tahun">Tahun Terbit</label>
              <input formControlName="tahun" class="form-control" id="tahun">
            </div>
            <div class="form-group">
              <label for="harga">Harga</label>
              <input formControlName="harga" class="form-control" id="harga">
            </div>
          </form>
```

Pada kode diatas kita memanfaatkan *ReactiveForms* yang sudah kita pasang tadi. Kemudian kita melakukan spesifikasi menggunakan `[formGroup]` yang mengarah pada objek `form` pada booksService sehingga kita bisa dengan mudah untuk memanipulasi data inputan sesuai dengan objek yang sudah kita buat. Dengan menggunakan `formControlName` kita bisa memanggil setiap record yang ada pada objek `form`.

Kemudian primary key dari data tersebut tidak akan kita tampilkan pada *form-group* karena sifatnya unik sebagai indetifier setiap data.

Lalu pada inputan *judulBuku* kita menambahkan kode untuk melakukan validasi sehingga inputan tersebut harus di isi, apabila kosong maka proses penambahan data tidak akan terjadi.

### 5. Memasang firebase ke projek

Pertama lakukan installasi firebase ke projek angular, ketikkan perintah berikut.

```
npm install --save firebase angularfire2
```

Setelah installasi selesai maka akan terbentuk sebuah file environments yang di dalamnya terdapat `environment.ts` dan `environment.prod.ts`, namun yang akan kita gunakan adalah file `environment.ts`.

![buku-alamat](/uploads/5.JPG "buku alamat")

Setelah itu masuk ke firebase console atau bisa klik link https://console.firebase.google.com/

Kemudian klik tambah projek.

![buku-alamat](/uploads/6.JPG "buku alamat")

Lalu isikan nama projek firebase kita, misalkan disini saya menggunakan *DaftarBuku* sebagai nama projek, klik lanjutkan.

![buku-alamat](/uploads/7.JPG "buku alamat")

Selanjutnya matikan google analytics untuk projek dan klik buat projek.

![buku-alamat](/uploads/8.JPG "buku alamat")

Tunggu beberapa saat proses pembuatan projek selesai. Kalau sudah siap, klik lanjutkan.

Maka akan tampil halaman awal dari firebase console. Disana terdapat beberapa opsi untuk jenis projek yang akan dibuat menggunakan firebase yaitu ada iOS, Android, dan Web. Karena kita menggunakan angular maka kita pilih yang web.

![buku-alamat](/uploads/9.JPG "buku alamat")

Kemudian isikan nama aplikasi. Disini saya menggunakan nama *DaftarBuku* sebagai nama aplikasi. Selanjutnya klik **Daftarkan aplikasi**

![buku-alamat](/uploads/10.JPG "buku alamat")

Maka akan terdapat script yang di dalamnya ada *apiKey* dari aplikasi yang kita daftarkan.

![buku-alamat](/uploads/11.JPG "buku alamat")

Copy objek *firebaseConfig* beserta isinya tersebut ke dalam `environment.ts` sehingga kode di dalam `environment.ts` menjadi seperti ini.

```javascript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "apiKey anda disini",
    authDomain: "angularfire-72bcf.firebaseapp.com",
    databaseURL: "https://angularfire-72bcf.firebaseio.com",
    projectId: "angularfire-72bcf",
    storageBucket: "angularfire-72bcf.appspot.com",
    messagingSenderId: "616515919998",
    appId: "1:616515919998:web:2bdeaa6b977e5e6499b82f",
    measurementId: "G-3E8THQJ3EZ"
  }
};
```

Kemudian kembali lagi ke halaman firebase console klik menu **database** dan **Buat Database**.

![buku-alamat](/uploads/12.JPG "buku alamat")

Lalu pilih *mode pengujian* dan klik **aktifkan**.

![buku-alamat](/uploads/13.JPG "buku alamat")

Apabila kita klik menu *aturan* maka akan terdapat kode berikut.

```javascript
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Itu artinya bahwa kita mengizinkan untuk membaca dan menambahkan data ke dalam firebase database kita. Jadi sekarang kita bisa melihat data yang akan kita buat di dalam **Realtime Database**

Sekarang masuk ke `app.module.ts` dan import *AngularFireModule*, *AngularFireDatabaseModule*, dan *environment*, kemudian kita juga import kelasnya ke dalam array imports dan melakukan inisialisasi terhadap objek yang ada di `environment.ts` sehingga menjadi seperti ini.

```javascript
...
import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment'
...
...

@NgModule({
  declarations: [
    AppComponent,
    BukuComponent,
    ListBukuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // tambahan
    AngularFireDatabaseModule,
  ],
```

### 6. Membuat fungsi untuk menambahkan data

Kita akan membuat sebuah fungsi *onSubmit()* yang di dalamnya terdapat dua operasi CRUD yaitu insert dan update data. 

Di dalam fungsi insert nantinya kita akan memanfaatkan primary key yang sudah kita buat.

Logikanya begini jika `$key` bernilai null(defaultnya null) maka buat data baru, namun jika tidak null maka update datanya, kira-kira seperti itu.

Oke sebelum ke langkah tersebut kita buka terlebuh dahulu `books.service.ts` kemudian kita import *AngularFireDatabase* dan *AngularFireList*, lalu kita buat objek *firebase* di dalam constructor dan kita definisikan *listBuku*.

```javascript
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database' // tambahan

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private firebase: AngularFireDatabase) { }
  listBuku: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    judulBuku: new FormControl('', Validators.required),
    penulis: new FormControl(''),
    penerbit: new FormControl(''),
    tahun: new FormControl(''),
    harga: new FormControl('')
  });

  getBuku() {
    this.listBuku = this.firebase.list('buku');
    return this.listBuku.snapshotChanges();
  }
}
```

Kode diatas terdapat juga fungsi *getBuku()* yang mengarah pada *listBuku* dengan tipe *AngularFireList* yang akan membuat list dengan parent **buku** di dalam realtime database kita sehingga data-data yang akan kita inputkan masuk ke dalam list buku tersebut.

Selanjutnya buat fungsi *insertBuku()* untuk melakukan penambahan data pada realtime database. Tambahkan kode berikut ini dibawah fungsi *getBuku()* pada `books.service.ts`.

```javascript
insertBuku(buku) {
    this.listBuku.push({
      judulBuku: buku.judulBuku,
      penulis: buku.penulis,
      penerbit: buku.penerbit,
      tahun: buku.tahun,
      harga: buku.harga
    });
  }
```

Kode diatas akan melakukan push ke dalam database, sebelum itu akan terbuat sebuah parent random dari primary key dan barulah di dalam parent kedua tersebut terdapat data-data yang sudah kita inputkan ke dalam realtime database.

Kemudian buka `list-buku.component.ts` dan import *BooksService* lalu buat sebuah objek di dalam constructornya dan di dalam *ngOnInit* kita panggil fungsi *getBuku()*.

```javascript
...
import { BooksService } from '../shared/books.service'

@Component({
  selector: 'app-list-buku',
  templateUrl: './list-buku.component.html',
  styleUrls: ['./list-buku.component.css']
})
export class ListBukuComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  bukuArray = [];
  showDeletedMessage: boolean;

  ngOnInit() {
    this.booksService.getBuku()
	}
}
```

Lanjut, buka `buku.component.ts` kemudian buat fungsi *onSubmit()* jangan lupa untuk deklerasi variabel *submitted* dengan tipe boolean dan juga *formControls* yang akan kita gunakan untuk mengatur validator inputan sesuai dengan kode yang sudah kita tambahkan pada form-group inputan *judulBuku* sebelumnya.

```javascript
import { Component, OnInit } from '@angular/core';
import { BooksService } from '../shared/books.service'

@Component({
  selector: 'app-buku',
  templateUrl: './buku.component.html',
  styleUrls: ['./buku.component.css']
})
export class BukuComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  submitted: boolean;
  formControls = this.booksService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.booksService.form.valid) {
      if (this.booksService.form.get('$key').value == null) {
        this.booksService.insertBuku(this.booksService.form.value);
      }
      this.submitted = false;
      this.booksService.form.reset();
    }
  }
}
```

Fungsi *onSubmit()* akan melakukan proses validasi inputan kemudian apabila inputan sudah benar maka akan di push ke realtime database melalui fungsi *insertBuku()*. kode `this.booksService.form.reset();` akan mereset form apabila sudah melakukan submit data.

Sekarang tambahkan event *onClick* pada button **Simpan**. Buka `buku.component.html` kemudian sesuaikan kode button simpan seperti berikut.

```html
<button id="btnSave" type="button" class="btn btn-primary" (click)="onSubmit()">Simpan</button>
```

Selanjutnya kita akan menambahkan keterangan success ketika data berhasil di simpan.

Buka kembali `buku.component.html` dan tambahkan alert berikut di akhir kode html.

```html
<div class="alert alert-success mt-3" *ngIf="showSuccessMessage">
  Berhasil menambahkan data.
</div>
```

Kemudian buka lagi `buku.component.ts` dan tambahkan varibel `showSuccessMessage: boolean;` dan kita set nilainya menjadi *true* di dalam *onSubmit()* sehingga kodenya menjadi seperti ini.

```javascript
submitted: boolean;
showSuccessMessage: boolean; // tambah
formControls = this.booksService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.booksService.form.valid) {
      if (this.booksService.form.get('$key').value == null) {
        this.booksService.insertBuku(this.booksService.form.value);
		this.showSuccessMessage = true; // tambah
        setTimeout(() => this.showSuccessMessage = false, 3000); // tambah
      }
      this.submitted = false;
      this.booksService.form.reset();
    }
  }
```

Oke sekarang kita coba inputkan data buku ke dalam form. Jalankan projeknya `ng s --o` kemudian masukkan data seperti berikut.

![buku-alamat](/uploads/14.JPG "buku alamat")

Kemudian klik button simpan.

Selanjutnya cek di realtime database pada firebase console dan pastikan data yang sudah kita inputkan tadi sudah masuk seperti ini.

![buku-alamat](/uploads/15.JPG "buku alamat")

### 7. Menampilkan data ke dalam interface

Pada bagian ini kita akan menampilkan data yang sudah kita inputkan ke dalam `list-buku.component.html` sehingga data yang sudah di input bisa dilihat secara langsung.

Pertama buka `list-buku.component.ts` tambahkan variabel *bukuArray* dengan tipe array yang nantinya akan kita gunakan untuk menampung data dari firebase. Modifikasi kodenya sehingga seperti ini.

```javascript
import { Component, OnInit } from '@angular/core';

import { BooksService } from '../shared/books.service'

@Component({
  selector: 'app-list-buku',
  templateUrl: './list-buku.component.html',
  styleUrls: ['./list-buku.component.css']
})
export class ListBukuComponent implements OnInit {

  constructor(private booksService: BooksService) { }

  bukuArray = [];

  ngOnInit() {
    this.booksService.getBuku().subscribe(
      list => {
        this.bukuArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          }
        });
      }
    );
  }
}
```

Sekarang buka `list-buku.component.html` tambahkan komponen table pada file tersebut. Masuk ke halaman dokumentasi bootstrap dan cari komponen table, pilih sesuai selera. Kemudian sesuaikan kodenya sehingga menjadi seperti ini.

```html
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">No</th>
      <th>Judul</th>
      <th>Penulis</th>
      <th>Penerbit</th>
      <th>Tahun</th>
      <th>Harga</th>
      <th>Aksi</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let buku of bukuArray; let nomor=index">
      <th scope="row">{{nomor+1}}</th>
      <td>{{buku.judulBuku}}</td>
      <td>{{buku.penulis}}</td>
      <td>{{buku.penerbit}}</td>
      <td>{{buku.tahun}}</td>
      <td>{{buku.harga}}</td>
      <td>
        <button class="btn btn-outline-info mr-3" data-toggle="modal" data-target="#exampleModalLong"><i class="fas fa-edit"></i></button>
        <button class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
      </td>
    </tr>
  </tbody>
</table>
```
Maka hasilnya akan seperti berikut.

![buku-alamat](/uploads/16.JPG "buku alamat")

### 8. Membuat fungsi edit data

Pertama tambahkan event *onClick* pada button **edit**.

```html
<button class="btn btn-outline-info mr-3" data-toggle="modal" data-target="#exampleModalLong" (click)="booksService.populateForm(buku)"><i class="fas fa-edit"></i></button>
```

Kemudian buka `books.service.ts` dan buat fungsi *populateForm(buku)*.

```javascript
populateForm(buku) {
    this.form.setValue(buku);
  }
```

Fungsi tersebut akan mengarah pada value form sehingga form yang dituju akan aktif dan bisa diubah nilainya.

Lalu buka `buku.component.ts`, tambahkan else pada fungsi *onSubmit* sesuai dengan logika yang sudah dijelaskan sebelumnya. Modifikasi kodenya hingga seperti ini.

```javascript
onSubmit() {
    this.submitted = true;
    if (this.booksService.form.valid) {
      if (this.booksService.form.get('$key').value == null) {
        this.booksService.insertBuku(this.booksService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      } else {
        this.booksService.updateBuku(this.booksService.form.value); // tambahan
      }
      this.submitted = false;
      this.booksService.form.reset();
    }
  }
```

tambahan kode tersebut akan memanggil fungsi *updateBuku()* apabila `$key` tidak bernilai null.

Kemudian buka `books.service.ts` dan tambahkan fungsi *updateBuku()* sehingga menjadi seperti berikut.

```javascript
updateBuku(buku) {
    this.listBuku.update(buku.$key,
      {
        judulBuku: buku.judulBuku,
        penulis: buku.penulis,
        penerbit: buku.penerbit,
        tahun: buku.tahun,
        harga: buku.harga
      });
  }
```

Fungsi tersebut akan melakukan update terhadap data dengan key yang sudah ada. 

Setelah itu kita bisa coba untuk melakukan edit/update data. Klik tombol edit dan edit datanya misalkan disini saya mengubah tahun.

![buku-alamat](/uploads/17.JPG "buku alamat")

Maka hasilnya akan terupdate seperti ini.

![buku-alamat](/uploads/18.JPG "buku alamat")

### 9. Menghapus data

Buka `list-buku.component.html` pada button **hapus** tambahkan event *onClick* sehingga menjadi seperti berikut.

```html
<button class="btn btn-outline-danger" (click)="onDelete(buku.$key)"><i class="fas fa-trash-alt"></i></button>
```

Kemudian pada file `list-buku.component.ts` tambahkan fungsi *onDelete()* berikut.

```javascript
onDelete($key) {
    if (confirm('Apakah anda yakin ingin menghapus data ini ?')) {
      this.booksService.deleteBuku($key);
    }
  }
```

Terakhir pada `books.service.ts` tambahkan juga fungsi *deleteBuku()* berikut.

```javascript
deleteBuku($key: string) {
    this.listBuku.remove($key);
  }
```

fungsi *remove* akan dipanggil dan akan menghapus data sesuai parameternya yaitu *$key*.

Untuk menampilkan alert notifikasi bahwa data berhasil di hapus, masuk ke `list-buku.component.html` di bagian akhir tambahkan alert berikut.

```html
<div class="alert alert-danger mt-3" *ngIf="showDeletedMessage">
  Berhasil menghapus data.
</div>
```

Lalu pada `list-buku.component.ts` tambahkan variabel `showDeletedMessage: boolean;` dan modifikasi fungsi *onDelete()* dengan menambahkan showDeletedMessage sebagai true dan set waktunya.

```javascript
onDelete($key) {
    if (confirm('Apakah anda yakin ingin menghapus data ini ?')) {
      this.booksService.deleteBuku($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }
```

Oke sekarang tinggal kita coba, silahkan klik tombol hapus untuk menghapus data.

### 10. Penutup

Oke sekarang kita sudah berhasil membuat aplikasi daftar buku sederhana menggunakan angular dan firebase yang tampilan dan hasil akhirnya seperti ini.

![buku-alamat](/uploads/19.JPG "buku alamat")

Semoga dapat menjadi referensi. Selanjutnya silahkan dimodif dan berkreasi tanpa batas, sekian dan terima kasih **salam begadang**.

Thanks to **StackOverflow**