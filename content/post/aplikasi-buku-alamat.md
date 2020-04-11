---
title: "Membuat Aplikasi Buku Alamat Menggunakan Angular & Codeigniter"
date: 2020-04-11T21:13:15+07:00
draft: true
categories: [code]
---
Pada kesempatan kali ini saya akan mendokumentasikan **cara membuat aplikasi buku alamat menggunakan angular dan codeigniter**. Aplikasi yang akan dibuat ini adalah aplikasi yang memuat CRUD (Create, Read, Update, Delete). Skenarionya adalah kita akan menampilkan data alamat pada browser yang mana data tersebut diambil dari local server dengan bantuan aplikasi PHP. Tanpa berlama-lama lagi mari kita mulai.<!--more-->

## Membuat Aplikasi Buku Alamat Menggunakan Angular & Codeigniter

### 1. Installasi angular

Hal pertama adalah melakukan installasi nodeJs dan angular, untuk proses installasi sudah dibahas pada bagian sebelumnya, bisa dilihat pada link wiki berikut, [Installasi NodeJs](https://github.com/ahmadsufyan455/tekwebuad_1800016074/wiki/Langkah-Installasi-Node.Js-Pada-Linux-Mint) dan [Installasi Angular](https://github.com/ahmadsufyan455/tekwebuad_1800016074/wiki/Cara-Installasi-Angular).

### 2. Membuat project baru 

Setelah melakukan proses installasi, selanjutnya kita buat project baru dengan menuliskan perintah berikut pada cmd / git bash / terminal.

```
ng new buku-alamat
```

Kemudian kita pilih CSS sebagai file untuk mengatur tampilannya.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/1.JPG)

Kita tunggu proses installasi sampai selesai, jika sudah selesai maka kita akan melihat log tampilan seperti ini pada cmd.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/2.JPG)

Kemudian kita masuk ke folder projek yang sudah kita buat dengan perintah `cd buku-alamat` lalu kita jalankan projek tersebut dengan perintah `ng serve` atau `ng s`.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/3.JPG)

Setelah berhasil di compile, kita bisa buka browser dan ketikkan `localhost:4200` pada address bar untuk melihat tampilannya.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/4.JPG)

### 3. Memasang template

Kita akan menggunakan material design dari google sebagai komponen UI dari aplikasi yang akan kita buat. Material desain dapat kita akses melalui link berikut [Material Desain Angular](https://material.angular.io/).

Secara default angular tidak menyediakan template, tapi kita bisa menambahkannya secara manual, sekarang ketikkan perintah berikut untuk installasi material design.

```
ng add @angular/material
```

Kita bisa memilih jenis template yang kita inginkan,

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/5.JPG)

Oke, selanjutnya kita akan menerapkan template tersebut ke dalam aplikasi, ikuti langkah-langkah berikut.

Pertama kita import modul komponen material design ke dalam **app.module.ts** sehingga kodenya seperti ini.

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; // tambahan baru

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, // tambahan baru 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Kemudian kita masukkan komponen material design ke dalam **app.component.html**, kode sebelumnya bisa kita hapus saja sehingga isinya adalah kode berikut ini saja.

```html
<mat-toolbar color="primary">
  Aplikasi Buku Alamat
</mat-toolbar>
```

Kode tersebut merupakan kode html untuk membuat sebuah toolbar, bisa dilihat hasilnya dengan menjalankan projek tersebut.

selengkapnya bisa dilihat di halaman material.angular.io

### 4. Membuat desain UI

Tampilan yang akan kita buat pada aplikasi ini adalah seperti berikut ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/6.JPG)

Oke pertama kita edit dulu bagian toolbar yang sebelumnya sudah kita buat dengan menambahkan tombol **tambah alamat** pada bagian kanan toolbar.

Tambahkan kode css berikut ini pada **app.component.css**

```css
.spacer {
	flex-grow: 1;
}
```

Lalu tambahkan modul komponen button pada **app.module.ts**

```javascript
...
import {MatButtonModule} from '@angular/material/button';
...
.
.
imports: [
BrowserModule,
AppRoutingModule,
BrowserAnimationsModule,
MatToolbarModule,   
MatButtonModule,
]
```

Kemudian tambahkan button pada **app.component.html** pada bagian toolbar.

```html
<mat-toolbar color="primary">
<span>
Aplikasi Buku Alamat
</span>
<span class="spacer"></span>
<button mat-button>Tambah Alamat</button>
</mat-toolbar>
```

### 5. Membuat card daftar alamat

Card daftar alamat digunakan untuk menampilkan data alamat. Komponen yang digunakan adalah Card, List, Icon, dan Button.

Oke, pertama import modul card, list, dan icon ke dalam **app.module.ts**.

```javascript
...
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
...
.
.
imports: [
..
MatCardModule,
MatListModule,
MatIconModule,
]
```

Kemudian kita tambahkan kode untuk membuat desain cardnya ke dalam **app.component.html**, perlu di ketahui juga bahwa kita memasukkan gambar disini yang ditaruh di dalam folder `src/assets`, jadi kita sesuaikan juga nama gambar yang kita masukkan.

```html
<div class="container">
<mat-card>
<mat-card-header>
  <mat-card-title>Daftar Alamat</mat-card-title>
</mat-card-header>
<mat-card-content>
  <mat-list>
    <mat-list-item>
      <img matListAvatar src="assets/avatar.png" alt="...">
      <h3 matLine> Nama Lengkap </h3>
      <p matLine>
        <span> nama@domain.com </span>           
      </p>           
    </mat-list-item>
  </mat-list>
 </mat-card-content>
</mat-card>
</div>
```
Lalu tambahan kode css berikut ke dalam **app.component.css**.

```css
.container{
padding: 50px 100px 50px 100px;
}
```

Selanjutnya kita akan membuat **list menu** pada card tersebut.

List menu ini akan menampilkan daftar menu dalam tampilan popup yang muncul setelah sebuah tombol ditekan. Daftar menu yang akan kita tampilkan adalah DETAIL, EDIT, dan DELETE.

Untuk menampilkan menu di dalam list, kita import dulu modul `matMenuModule` pada **app.module.ts**.

```javascript
...
import {MatMenuModule} from '@angular/material/menu';
..
.
.

@NgModule({
  ...
  imports: [
    ...
    MatMenuModule
  ],
  ...
})
```

Kemudian pada bagian **app.component.html** kita tambahkan kode html berikut ini di dalam `mat-list` yang sudah kita buat sebelumnya.

```html
<mat-list>
        <mat-list-item>
          ...
          .
          .
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item>Detail</button>
            <button mat-menu-item>Edit</button>
            <button mat-menu-item>Delete</button>
          </mat-menu>
        </mat-list-item>
</mat-list>
```

Sehingga sekarang tampilan aplikasi web kita seperti ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/7.JPG)

### 6. Membuat dialog penambahan alamat

Untuk menambahkan dan membuat dialog pada saat kita mengklik button **tambah alamat**, maka kita import dulu modul `MatDialog`, `MatFormField`, dan `MatInput` pada **app.module.ts**.

```javascript
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
...
 @NgModule({
  ...
  imports: [
    ...
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ...
  ],
 ...
 })
```

Selanjutnya kita buat komponen baru untuk menampilkan desain dialog, maka kita ketikkan perintah berikut ini.

```
ng generate component tambah-alamat
```

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/8.JPG)

Sekarang kita sudah mempunyai folder komponen tambah-alamat di bagian `src/app/tambah-alamat`.

Secara otomatis juga akan terbuat modul tambah-alamat pada bagian **app.module.ts**.

```javascript
 ...
 import { TambahAlamatComponent } from './tambah-alamat/tambah-alamat.component';
 @NgModule({
  declarations: [
    AppComponent,
    TambahAlamatComponent
  ],
  ...
 })
```

Kemudian kita juga perlu untuk menambahkan `entryComponent` pada **app.module.ts**.

```javascript
 @NgModule({
 ...
 entryComponents:[
    TambahAlamatComponent
  ]
  ...
  })
```

Selanjutnya kita akan buat desain untuk dialognya saat tombol **tambah-alamat** di klik, masuk ke bagian `tambah-alamat/tambah-alamat.component.html` kemudian tambahkan kode html berikut ini.

```html
<h3 mat-dialog-title>Tambah Alamat Baru</h3>
<div mat-dialog-content>
    <mat-form-field style="width: 100%;">
        <mat-label>Nama</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Alamat</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Kota</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Propinsi</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Kode Pos</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Nomer HP</mat-label>
        <input matInput >
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Email</mat-label>
        <input matInput >
    </mat-form-field>
</div>
<mat-dialog-actions>
    <span class="spacer"></span>
    <button mat-button mat-dialog-close>Batal</button>    
    <button mat-raised-button color="primary" [mat-dialog-close]="true">Simpan</button>
  </mat-dialog-actions>
```

Lalu kita tambahkan perintah untuk menampilkan dialog, pada bagian **app.component.ts** tambahkan kode berikut sehingga hasilnya seperti ini.

```javascript
import { Component } from '@angular/core';
//import modul dialog
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import halaman dialog yang sudah dibuat pada tahap sebelumnya
import {TambahAlamatComponent} from './tambah-alamat/tambah-alamat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'buku-alamat';
  constructor(
    public dialog:MatDialog //menambahkan variabel dialog
    ){}
    //fungsi untuk menampilkan dialog penambahan alamat baru
    buatAlamat()
    {
      const dialogRef = this.dialog.open(TambahAlamatComponent, {
        width: '450px',      
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog ditutup');     
      });
      }
}
```

Pertintah tersebut akan memanggil `tambahAlamatComponent` yang akan ditampilkan ke dalam dialog.

Kemudian kita akan menambahkan trigger pada button **tambah alamat** yang akan memanggil fungsi `buatAlamat()` yang sudah kita buat sebelumnya.

```html
<mat-toolbar color="primary">
  <span>
    Aplikasi Buku Alamat
  </span>
  <span class="spacer"></span>
  <button mat-button (click)="buatAlamat()">Tambah Alamat</button>
</mat-toolbar>
```

Sehingga tampilan sampai sejauh ini adalah seperti berikut.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/9.JPG)

### 7. Membuat dialog detail alamat

Dialog detail alamat ini nantinya berfungsi untuk menampilkan detail alamat apabila tombol **detail** di klik pada bagian list menu. Prinsipnya sama saat kita membuat dialog tambah alamat.

Oke yang pertama kita buat dulu komponen detail alamat dengan perintah berikut.

```
ng g component detail-alamat
```

Kemudian buka file ```detail-alamat/detail-alamat.component.html dan tambahkan kode html berikut ini.

```html
<h3 mat-dialog-title>Haryanto Effendi</h3>
<div mat-dialog-content>
<mat-list>
    <h3 matSubheader>Detail Alamat</h3>
    <mat-list-item>
        <mat-icon matListIcon>call</mat-icon>
        <h3 mat-line>087730300127</h3>
        <mat-divider></mat-divider>
    </mat-list-item>
    <mat-list-item>
        <mat-icon matListIcon>email</mat-icon>
        <h3 mat-line>email@domain.com</h3>
        <mat-divider></mat-divider>
    </mat-list-item>
    <mat-list-item>
        <mat-icon matListIcon>place</mat-icon>
        <h3 mat-line>Jl. Gaza no 34</h3>
        <p mat-line>Kota Yogyakarta</p>
        <p mat-line>Daerah Istimewa Yogyakarta</p>
        <mat-divider></mat-divider>
    </mat-list-item>
</mat-list>
</div>
<mat-dialog-actions>
  <span class="spacer"></span>
  <button mat-button mat-dialog-close>Tutup</button>
</mat-dialog-actions>
```

Lalu tambahkan `detailAlamatComponent` pada `entryComponents` yang ada pada **app.module.ts**.

```javascript
.
.
entryComponents:[
    TambahAlamatComponent,
    DetailAlamatComponent
  ],
.
.
```

Kemudian import juga komponen `detailAlamatComponent` pada **app.component.ts** lalu buat fungsi untuk membuka dialog seperti berikut.

```javascript
...
import {DetailAlamatComponent} from './detail-alamat/detail-alamat.component';
...
export class AppComponent {
  constructor(public dialog:MatDialog){}
  ...
  //membuka dialog detail alamat
	  detailAlamat()
	  {
	    const dialogRef = this.dialog.open(DetailAlamatComponent, {
	      width: '450px',      
	    });	
	    dialogRef.afterClosed().subscribe(result => {
	      console.log('The dialog was closed');     
	    });
	  }
}
```

Selanjutnya kita panggil fungsi detailAlamat() melalui tombol **detail** pada list menu yang ada pada **app.component.html**.

```html
 ...
  <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="detailAlamat()">Detail</button>
            <button mat-menu-item>Edit</button>
            <button mat-menu-item>Delete</button>
 </mat-menu>
 ...
```

Sehingga sekarang hasilnya seperti ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/10.JPG)

Selanjutnya kita akan membuat **Dialog konfirmasi hapus data** yang berfungsi untuk memberitahu pengguna bahwa ia akan mengahpus sebuah data dan memastikan hal itu benar terjadi.

Seperti biasa kita buat dulu komponen dialog-konfirmasi dengan perintah berikut.

```
ng g c dialog-konfirmasi
```
Lalu tambahkan `dialogKonfirmasiComponent` pada `entryComponents` yang ada pada **app.module.ts** seperti cara sebelumnya.

Kemudian import `dialogKonfirmasiComponent` pada **app.component.ts** dan tambahkan fungsi berikut untuk menampilkan dialog.

```javascript
...
 import {DialogKonfirmasiComponent} from './dialog-konfirmasi/dialog-konfirmasi.component';
 .
 .
 ...
 konfirmasiHapus()
 {
		const dialogRef = this.dialog.open(DialogKonfirmasiComponent, {
			width: '450px',      
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result == true)
			{
				console.log('Menghapus data');
			}
		});
 }
 ...
```

Lalu tambahkan kode html berikut ini ke dalam `dialog-konfirmasi/dialog-konfirmasi.html`.

```html
<div mat-dialog-content>   
<p>Apakah Anda yakin akan menghapus data?</p>
</div>
<mat-dialog-actions>
    <span class="spacer"></span>
    <button mat-button mat-dialog-close>Batal</button>    
    <button mat-raised-button color="warn" (click)="konfirmasi()">Ya, hapus!</button>
</mat-dialog-actions>
```

Kemudian kita tambahkan fungsi konfirmasi() pada **dialog-konfirmasi.component.ts**.

```javascript
 ...
 import { MatDialogRef} from '@angular/material/dialog';
 .
 .
 .
 constructor(
    public dialogRef:MatDialogRef<DialogKonfirmasiComponent>
  ) { }
 konfirmasi()
  {
    	this.dialogRef.close(true);
  }
```

Kode tersebut berfungsi memberikan nilai true saat pengguna menekan tombol hapus.

Jangan lupa juga untuk menambahkan trigger `konfirmasiHapus()` pada list menu delete di **app.component.html**.

```html
...
  <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="detailAlamat()">Detail</button>
            <button mat-menu-item>Edit</button>
            <button mat-menu-item (click)="konfirmasiHapus()">Delete</button>
 </mat-menu>
 ...
```

Sekarang tampilan aplikasi web kita menjadi seperti ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/11.JPG)

### 8. Membuat API menggunakan codeigniter

Pada percobaan kali ini kita membutuhkan xampp sebagai web service.

Pertama kita lakukan installasi codeigniter, bisa di unduh di link github berikut ini https://github.com/faridsurya/restapi_codeigniter3, kemudian extract filenya ke folder `htdocs` pada `xampp` dan ubah namanya menjadi `rest-api`.

Selanjutnya kita akan mengatur koneksi http angular. Silahkan pasang modul `http` pada **app.module.ts**.

```javascript
...
import { HttpClientModule } from '@angular/common/http';
.
.
.
@NgModule({
  declarations: [
    AppComponent,
    TambahAlamatComponent,
    DetailAlamatComponent,
    DialogKonfirmasiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, //tambahan modul baru
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    TambahAlamatComponent,
    DetailAlamatComponent,
    DialogKonfirmasiComponent
  ]
})
export class AppModule { }
```

Selanjutnya adalah membuat **api.service.ts** dengan perintah berikut.

```
ng g service api
```

Maka akan terbuat file **api.service.ts**. Tambahkan kode berikut sehingga sekarang kode di **api.service.ts** menjadi seperti berikut.

```javascript
 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
}
```

Selanjutnya adalah membuat fungsi pada **api.service.ts** dengan kode berikut ini.

```javascript
 ...
  export class ApiService {
  constructor(private http: HttpClient) { }
  apiUrl:any='http://localhost/rest-api/index.php/api/';
  status()
  {
      return this.http.get(this.apiUrl+'status');
  }
  }
```

Selanjutnya kita akan memanggil data pada server melalui komponen **app.component.ts** dengan kode berikut.

```javascript
 ...
 import {ApiService} from './api.service'; //kode tambahan
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public dialog:MatDialog,
    public api:ApiService
    )
  {
    this.getData(); //kode tambahan
  } 
    //mengambil data pada server (kode tambahan)
	getData()
	{
		this.api.status().subscribe(res=>{
			console.log(res);
		})
	}
  .
  .
  .
 }
```

Kode `this.getData()` akan dieksekusi ketika halaman tersebut ditampilkan. Kode `this.getData()` akan mengeksekusi fungsi `getData()`. Fungsi tersebut memanggil `this.api` yang sudah dibuat. Service yang dipanggil pada fungsi tersebut adalah fungsi `status()` yang memanggil data dari server http://localhost/rest-api/index.php/api/status.

Sekarang kita jalankan dan akan tampilk status `OK` pada bagian network `status`. Jangan lupa nyalakan xampp nya.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/12.JPG)

### 9. Menampilkan data server

Oke, pertama kita buat database, kita bisa buat database mysql melalui `localhost/phpmyadmin` atau kita bisa menggunakan `sqlyog` dan membuat database dengan nama `buku_alamat`.

Setelah membuat database buku_alamat, kemudian buat tabel di dalamnya dengan nama tabel `alamat` dan isi atributnya sesuai gambar dibawah.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/13.JPG)

Kemudian isikan datanya sembarang seperti gambar dibawah ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/14.JPG)

Kemudian buka file pada `rest-api/application/config/database.php` menggunakan code editor dan isikan `buku_alamat` pada atribut database sesuai dengan nama database yang sudah kita buat.

```php
$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'root',
	'password' => '',
	'database' => 'buku_alamat',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
```
Selanjutnya kita akan menampilkan data yang tersedia pada API ke dalam list aplikasi kita.

Buka **api.service.ts** dan tambahkan fungsi berikut.

```javascript
baca()
  {
    return this.http.get(this.apiUrl+'data');
  }  
``

Kemudian update **app.component.ts** sehingga menjadi seperti ini.

```javascript
//Sebelum
  getData()
  {
    this.api.status().subscribe(res=>{
      console.log(res);
    })
  }
 //ganti menjadi
  dataAlamat:any=[];
  getData()
  {
    this.api.baca().subscribe(res=>{
      this.dataAlamat=res;
    })
  }
```

Setelah itu run projeknya dan liat pada bagian network `data` maka akan muncul data yang sudah kita buat pada database.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/15.JPG)

Gambar di atas adalah respon data yang dihasilkan oleh fungsi `getData()`.

Kemudian kita akan menampilkan data tersebut ke dalam user interface aplikasi.

Buka **app.component.html** dan update kodenya sehingga menjadi seperti ini.

```html
 .
 .
 ...
  <mat-list>
        <mat-list-item *ngFor="let item of dataAlamat">
          <img matListAvatar src="assets/avatar.png" alt="...">
          <h3 matLine> {{item.nama}} </h3>
          <p matLine>
          {{item.kota}}           
          </p>
          <p matLine>
            {{item.email}}
          </p>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="detailAlamat()">Detail</button>
            <button mat-menu-item>Edit</button>
            <button mat-menu-item (click)="konfirmasiHapus()">Delete</button>
          </mat-menu>
        </mat-list-item>
      </mat-list>
 ...
```
Sehingga hasilnya seperti ini, datanya mengikuti data pada database yang telah kita buat.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/16.JPG)

### 10. Menambahkan data baru

Sekarang kita akan memanfaatkan button **tambah alamat** untuk menambahkan data baru pada database.

Pertama buka file **api.service.ts**, tambahkan fungsi `simpan(data)`.

```javascript
simpan(data)
  {
    return this.http.post(this.apiUrl+'data',data);
  }  
```

Fungsi `simpan(data)` akan mengirimkan data ke server dengan metode POST. Data tersebut akan diterima oleh aplikasi API Codeigniter melalui fungsi `data_post()` pada Class `Api.php`.

Kemudian buka **tambah-alamat.component.ts** dan sesuaikan kodenya menjadi seperti berikut.

```javascript
import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-tambah-alamat',
  templateUrl: './tambah-alamat.component.html',
  styleUrls: ['./tambah-alamat.component.css']
})
export class TambahAlamatComponent implements OnInit {

  constructor(public api:ApiService, public dialogRef:MatDialogRef<TambahAlamatComponent>) { }
  data:any={};

  ngOnInit() {
  }
  simpan(data)
  {
    this.api.simpan(data).subscribe(res=>{
      this.dialogRef.close(true);
    })
  }
```

Lalu buka file **tambah-alamat.component.html** dan sesuaikan sehigga kode menjadi seperti berikut ini.

```html
<h3 mat-dialog-title>Tambah Alamat Baru</h3>
<div mat-dialog-content>
    <mat-form-field style="width: 100%;">
        <mat-label>Nama</mat-label>
        <input matInput [(ngModel)]="data.nama">
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Alamat</mat-label>
        <input matInput [(ngModel)]="data.alamat">
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Kota</mat-label>
        <input matInput [(ngModel)]="data.kota">
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Propinsi</mat-label>
        <input matInput [(ngModel)]="data.propinsi">
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Nomer HP</mat-label>
        <input matInput [(ngModel)]="data.hp">
    </mat-form-field>

    <mat-form-field style="width: 100%;">
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="data.email">
    </mat-form-field>
</div>
<mat-dialog-actions>
    <span class="spacer"></span>
    <button mat-button mat-dialog-close>Batal</button>    
    <button mat-raised-button color="primary" (click)="simpan(data)">Simpan</button>
  </mat-dialog-actions>
```

Tambahkan juga fungsi trigger (click)="simpan(data)" pada button **simpan**.

Kemudian tambahkan modul Form pada **app.module.ts**.

```javascript
 ...
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
...
.
.
.
@NgModule({
  ...
  imports: [
    ...
    FormsModule,
    ...
  ],
  ...
})
export class AppModule { }
```

Selanjutnya adalah membuat **list daftar alamat otomatis diperbarui**, caranya adalah buka file **app.component.ts** dan sesuaikan kodenyan menjadi seperti berikut ini

```javascript
 ...
 buatAlamat()
  {
    const dialogRef = this.dialog.open(TambahAlamatComponent, {
      width: '450px',      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData(); // data diambil lagi dari server saat dialog tertutup
    });
  }
 ...
```
Jadi ketika kita menambahkan data baru maka data tersebut akan otomatis dibuat di dalam database kita dan akan otomatis bertambah pada bagian list card.

### 11. Menampilkan data

Selanjutnya kita akan menampilkan data yang tersimpan di database di bagian **detail**.

Pertama kita tambahkan dan edit trigger dengan menambahkan parameter `item`.

```html
 ...
 <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="detailAlamat(item)">Detail</button>
            <button mat-menu-item (click)="editAlamat(item)">Edit</button>
            <button mat-menu-item (click)="konfirmasiHapus(item)">Delete</button>
 </mat-menu>
 ...
```
Kemudian buka *app.component.ts** dan sesuaikan menjadi seperti berikut.

```javascript
detailAlamat(item)
  {
    const dialogRef = this.dialog.open(DetailAlamatComponent, {
      width: '450px',
      data:item // tambahan kode
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');     
    });
  }
```

Lalu buka **detail-alamat.component.ts** dan sesuaikan kodenya menjadi seperti berikut.

```javascript
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-detail-alamat',
  templateUrl: './detail-alamat.component.html',
  styleUrls: ['./detail-alamat.component.css'],  
})
export class DetailAlamatComponent implements OnInit {
  constructor(
    public dialogRef:MatDialogRef<DetailAlamatComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any
  ) {}
  ngOnInit() {
  }
}
```
Object data : any merupakan variabel yang dapat dibaca pada komponen HTML.

Selanjutnya buka **detail-alamat.component.html** dan sesuaikan kodenya seperti berikut.

```html
<h3 mat-dialog-title>{{data.nama}}</h3>
<div mat-dialog-content>
<mat-list>
    <h3 matSubheader>Detail Alamat</h3>
    <mat-list-item>
        <mat-icon matListIcon>call</mat-icon>
        <h3 mat-line>{{data.hp}}</h3>
        <mat-divider></mat-divider>
    </mat-list-item>
    <mat-list-item>
        <mat-icon matListIcon>email</mat-icon>
        <h3 mat-line>{{data.email}}</h3>
        <mat-divider></mat-divider>
    </mat-list-item>
    <mat-list-item>
        <mat-icon matListIcon>place</mat-icon>
        <h3 mat-line>{{data.alamat}}</h3>
        <p mat-line>{{data.kota}}</p>
        <p mat-line>{{data.propinsi}}</p>
        <mat-divider></mat-divider>
    </mat-list-item>
</mat-list>
</div>
<mat-dialog-actions>
    <span class="spacer"></span>
    <button mat-button mat-dialog-close>Tutup</button>
  </mat-dialog-actions>
```

`{{data.nama}}` akan menampilkan variabel nama yang diperoleh dari list data. Nama atribut pada objek `data` merupakan nama atribut yang ada pada database.

Dan hasilnya sejauh ini akan seperti berikut.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/17.JPG)

### 12. Memperbarui data

Untuk memperbarui data kita akan menggunakan UI yang sama dengan tambah data. Kita akan modifikasi kode yang ada pada **tambah-alamat.component.ts**.

Pertama kita buka file **app.component.html** dan pastikan pada trigger sudah terdapat fungsi editAlamat(item) pada button EDIT.

Kemudian buka **app.component.ts** dan tambahkan fungsi editAlamat(data) seperti berikut.

```javascript
editAlamat(data)
  {
    const dialogRef = this.dialog.open(TambahAlamatComponent, {
      width: '450px',
      data:data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();    
    });
  }
```

Kemudian buka **app.tambah-alamat.component.ts** dan sesuaikan kodenya seperti berikut ini.

```javascript
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-tambah-alamat',
  templateUrl: './tambah-alamat.component.html',
  styleUrls: ['./tambah-alamat.component.css']
})
export class TambahAlamatComponent implements OnInit {

  constructor(public api:ApiService, public dialogRef:MatDialogRef<TambahAlamatComponent>, @Inject(MAT_DIALOG_DATA) public itemData:any) {
    if(itemData != null)
      {
        this.data=itemData;
      }
   }
  data:any={};

  ngOnInit() {
  }
  simpan(data)
  {
    if(data.id == undefined)
    {
      this.api.simpan(data).subscribe(res=>{
        this.dialogRef.close(true);
      });
    }else{
      this.api.ubah(data).subscribe(res=>{
        this.dialogRef.close(true);
      })
    }
  }
}
```

Lalu di **api.service.ts** tambahkan fungsi `ubah(data)`.

```javascript
ubah(data){
    return this.http.put(this.apiUrl+'data/' + data.id, data);
  }
```
Variabel `data` akan diisi oleh data detail alamat jika nilai variabel `itemData` bernilai `null`. Kita juga perlu melakukan modifikasi juga terhadap file **app.component.ts** untuk fungsi `buatAlamat()` agar fungsi `simpan(data)` memiliki dua fungsi yakni menambahkan data baru atau memperbarui data yang sudah ada.

Lalu sesuaikan kode pada fungsi buatAlamat() di **app.component.ts**.

```javascriptbuatAlamat()
  {
    const dialogRef = this.dialog.open(TambahAlamatComponent, {
      width: '450px',
      data:null
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }
```

Setelah itu kita bisa melakukan edit data dan menyimpan perubahan yang di edit, maka secara otomatis data akan tersimpan sesuai dengan perubahan yang sudah dilakukan.

### 13. Menghapus data

Untuk menghapus data kita akan modifikasi fungsi `konfirmasiHapus(id)` yang ada pada **app.component.ts**, silahkan sesuaikan dengan kode berikut ini.

```javascript
konfirmasiHapus(id)
  {
    const dialogRef = this.dialog.open(DialogKonfirmasiComponent, {
      width: '450px',      
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {
        console.log('Menghapus data');
        this.api.hapus(id).subscribe(res=>{
          this.getData();
        })
      }   
    });
  }
```

Kemudian di **api.service.ts** tambahan fungsi berikut `hapus(id)`.

```javascript
hapus(id){
    return this.http.delete(this.apiUrl+'data/' + id);
  }
```

Terakhir tambahkan parameter `item.id` pada fungsi konfirmasiHapus di trigger button `delete` pada bagian **app.component.html**.

```html
<mat-menu #menu="matMenu">
            <button mat-menu-item (click)="detailAlamat(item)">Detail</button>
            <button mat-menu-item (click)="editAlamat(item)">Edit</button>
            <button mat-menu-item (click)="konfirmasiHapus(item.id)">Delete</button>
</mat-menu>
```

Fungsi tersebut berfungsi untuk menghapus data pada daftar data alamat yang sudah kita buat.

Sehingga hasil akhir dari aplikasi buku alamat kita adalah seperti ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/18.JPG)

### 14. Mendistribusikan aplikasi ke website

Semua fungsi CRUD pada aplikasi kita sudah berjalan dengan baik, kini saatnya kita distribusikan supaya dapat dijalankan pada browser.

Ketikkan perintah berikut ini :

```
ng build --base-href ./
```
Maka akan terbentuk folde `dist` pada projek angular.

Buka folder tersebut, maka di dalamnya ada folder buku-alamat, kemudian folder buku-alamat tersebut kita pindahkan ke folder `htdocs`.

Kemudian kita bisa jalankan pada browser dengan alamat `localhost/buku-alamat` sehingga hasilnya akhir setelah di distribusikan seperti ini.

![buku-alamat](https://github.com/ahmadsufyan455/tekweblanjut-1800016074/blob/master/assets/19.JPG)

**Sekian dan terima kasih, semoga bermanfaat!**