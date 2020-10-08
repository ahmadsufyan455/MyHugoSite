---
title: "Create TodoApp Using Angular And Codeigniter (Include CRUD)"
slug: "todoapp-angular-ci"
date: 2020-07-25T13:15:11+07:00
draft: false
categories: [code, webApp]
---

Howdy, pada kesempatan yang baik ini saya akan membuat sebuah dokumentasi mengenai pembuatan web app menggunakan angular + codeiginter 4 yang di dalamnya memuat operasi CRUD.

Sebagai sampel project, disini saya akan membuatnya dengan tema **todoApp**. Halaman yang akan dibuat adalah login dan todo, jadi user akan login terlebih dahulu dengan username dan password yang sudah ditentukan kemudian baru bisa masuk dan mengakses crud todoApp.

Saya sudah memecah project ini menjadi beberapa bagian supaya lebih mudah untuk dikerjakan:
* Membuat front end (angular)
* Membuat back end (codeigniter)
* Integrasi front end dan back end

Oke let's code...

# Bagian 1 membuat front end (angular)

Untuk membuat front end kita mulai dari membuat beberapa halaman/component pada angular kemudian membuat tampilan atau UI desainnya.

### 1. Membuat component login dan todo

Komponen yang kita buat ini digunakan sebagai halaman utama aplikasi, untuk membuatnya masuk ke folder project, kemudian ketikkan perintah berikut:

```txt
ng g c login
ng g c todo
```

Maka akan tercipta dua buah folder untuk komponen login dan todo.

{{< figure src="/todo/1.png" width="70%" >}}
{{< figure src="/todo/2.png" width="70%" >}}

### 2. Menginstall material desain

Untuk membuat tampilan dari aplikasi, disini saya menggunakan material desain dari google. Untuk menggunakannya kita perlu menginstallnya dulu dengan perintah berikut.

```txt
ng add @angular/material
```

Kemudian buat folder `material` di dalam folder `app`, lalu di folder material tersebut kita buat sebuah file dengan nama `material.ts` untuk memasukkan beberapa komponen material angular, sesuaikan menjadi seperti ini.

```typescript
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

export const MaterialDesign = [
   MatCheckboxModule,
   MatCheckboxModule,
   MatButtonModule,
   MatInputModule,
   MatAutocompleteModule,
   MatDatepickerModule,
   MatFormFieldModule,
   MatRadioModule,
   MatSelectModule,
   MatSliderModule,
   MatSlideToggleModule,
   MatMenuModule,
   MatSidenavModule,
   MatToolbarModule,
   MatListModule,
   MatGridListModule,
   MatCardModule,
   MatStepperModule,
   MatTabsModule,
   MatExpansionModule,
   MatButtonToggleModule,
   MatChipsModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatProgressBarModule,
   MatDialogModule,
   MatTooltipModule,
   MatSnackBarModule,
   MatTableModule,
   MatSortModule,
   MatPaginatorModule
]
```

Kemudian buka `app.module.ts` dan tambahkan module material desain yang sudah kita buat.

```typescript
...
...
// angular material design
import { MaterialDesign } from './material/material';

import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesign,
  ],

..
..
```

Selengkapnya tentang material desain angular bisa dibaca di dokumentasi resminya https://material.angular.io/

Untuk penggunaan material pada angular sendiri pernah saya dokumentasikan di video [Cara Menggunakan Material Desain Pada Angular](https://www.youtube.com/watch?v=V1vzSoB7GLY&t)

### 3. Mengatur routing

Untuk memudahkan navigasi antar halaman maka kita perlu untuk mengatur routingnya.

Buka `app-routing.module.ts` kemudian import `LoginComponent` dan `TodoComponent` lalu tambahkan objek route di dalam Routes sehingga menjadi seperti ini.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { TodoComponent } from './todo/todo.component'


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    component: TodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

Jadi ketika path nya kosong misal localhost, maka akan redirect otomatis ke localhost/login.

### 4. Membuat desain UI halaman utama

Nah, dibagian ini saya akan membuat desain tampilan untuk halaman utama, login, dan juga todo.

Pertama buka `app.component.html` hapus semua kode yang ada kemudian tambahkan sebuah toolbar.

```html
<mat-toolbar>
  <span>{{title}}</span>
</mat-toolbar>

<router-outlet></router-outlet>
```

`router-outlet` kita gunakan untuk menampung atau menampilkan halaman yang sudah kita routing.

Lanjut ke file `login.component.html` kita akan membuat tampilan form login sederhana, kodenya adalah berikut.

```html
<div class="login-form-flex">
  <mat-card>
    <mat-form-field>
      <mat-label>Username</mat-label>
      <input matInput [(ngModel)]="data.username">
    </mat-form-field>
    <mat-form-field>
      <mat-label>Password</mat-label>
      <input type="password" matInput [(ngModel)]="data.password">
    </mat-form-field>
    <mat-card-actions>
      <div class="button-flex-container">
        <button mat-raised-button color="primary" (click)="masuk(data)">Login</button>
      </div>
    </mat-card-actions>
  </mat-card>
</div>
```

Jangan lupa tambahkan css pada `login.component.css` dengan kode css berikut.

```css
.login-form-flex {
  display: flex;
  justify-content: center;
  margin-top: 160px;
}

.button-flex-container {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

mat-card {
  width: 30%;
}

mat-form-field {
  width: 100%;
}
```

Oiya, penting jangan lupa untuk menambahkan form module ke dalam `app.module.ts` supaya bisa memproses inputan pada form.

```typescript
..
import { FormsModule } from '@angular/forms'
..
..
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesign,
    FormsModule
  ],
```

Selanjutnya buka file `login.component.ts` disini kita akan menambahkan data dan fungsi untuk login ke aplikasi todo, kita pakai logika if disini, dan ini kita buat sementara saja sebelum nantinya kita masuk ke bagain backend dan database, oke sesuaikan kodenya seperti ini.

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  data: any = {};
  masuk(data) {
    if ((data.username == 'admin') && (data.password == 'admin')) {
      this.router.navigate(['/todo']);
    }
  }
}
```

Sekarang tampilan halaman login menjadi seperti ini.

{{< figure src="/todo/3.png" width="100%" >}}

Kemudian kita lanjut mengatur tampilan halaman todo, buka `todo.component.html` kemudian tambahkan kode html berikut.

```html
<div class="container">
  <button class="btn-tambah" mat-raised-button color="primary" (click)="buatKegiatan()">Add Activities</button>
  <mat-card>
    <mat-card-header>
      <mat-card-title>To Do List</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-list>
        <mat-list-item>
          <img matListAvatar src="assets/todo.png" alt="...">
          <h3 matLine> UAS Tekweb Lanjut </h3>
          <p matLine>
            <span> Membuat aplikasi menggunakan angular dan codeigniter 4 yang memuat CRUD </span>
          </p>
          <p matLine>
            <span>Deadline : 28 juli 2020</span>
          </p>
          <button class="btn-edit" mat-raised-button color="accent">Edit</button>
          <button class="btn-selesai" mat-raised-button color="warn">Done</button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
</div>
```

Jangan lupa tambahkan css pada `todo.component.css`

```css
.container {
  padding: 50px 100px 50px 100px;
}

.btn-tambah {
  margin-bottom: 20px;
}

.btn-edit {
  margin-right: 10px;
}
```

Maka hasilnya akan seperti ini

{{< figure src="/todo/4.png" width="100%" >}}

Selanjutnya kita akan membuat dialog untuk menambahkan data / kegiatan. Saya menggunakan komponen dialog material desain.

Sebelumnya buat dulu komponen baru untuk tambah data, ketikka perintah berikut.

```txt
ng g c tambah-data
```

Setelah terbentuk filenya, buka `tambah-data.component.html` dan tambahkan kode berikut untuk mengatur tampilannya.

```html
<h3 mat-dialog-title>Add New Activities</h3>
<div mat-dialog-content>
  <mat-form-field style="width: 100%;">
    <mat-label>Title</mat-label>
    <input matInput>
  </mat-form-field>

  <mat-form-field style="width: 100%;">
    <mat-label>Description</mat-label>
    <input matInput>
  </mat-form-field>

  <mat-form-field style="width: 100%;">
    <mat-label>Deadline</mat-label>
    <input matInput>
  </mat-form-field>
</div>
<mat-dialog-actions>
  <span class="spacer"></span>
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-raised-button color="primary" [mat-dialog-close]="true">Save</button>
</mat-dialog-actions>
```

Karena kita akan menampilkan dialog, maka buka `app.module.ts` dan tambahkan `entryComponents` berikut.

```typescript
entryComponents: [
    TambahDataComponent
  ]
```

Next, pada `todo.component.ts` tambahkan kode berikut.

```typescript
import { Component, OnInit } from '@angular/core';
//import modul dialog
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import halaman dialog yang sudah dibuat pada tahap sebelumnya
import { TambahDataComponent } from '../tambah-data/tambah-data.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    public dialog: MatDialog //menambahkan variabel dialog
  ) { }

  ngOnInit(): void {
  }

  //fungsi untuk menampilkan dialog penambahan alamat baru
  buatKegiatan() {
    const dialogRef = this.dialog.open(TambahDataComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog ditutup');
    });
  }

}
```

Fungsi `buatKegiatan()` berfungsi untuk menampilkan dialog tambah-data yang sudah kita buat, sehingga tampilannya menjadi seperti ini.

{{< figure src="/todo/5.png" width="100%" >}}

> Tips : Jangan panik ketika ketemu error, tetap tenang, cari solusinya, di googling banyak tinggal ketik errornya nanti muncul tuh stackoverflow atau forum angular/Ci. Error mengajarkan kita untuk belajar memecahkan masalah.

# Bagian 2 membuat back end (codeigniter 4)

Pada bagian yang kedua ini saya akan membuat bagian back end dari aplikasi yang akan memuat CRUD. Saya akan menggunakan codeigniter 4 sebagai back end. Oke let's cekidot..

### 5. Install codeigniter 4

Pertama download dulu coigniter 4 di https://codeigniter.com/download

Kemudian extract hasil download tersebut dan ganti nama foldernya menjadi `ci4_restApi`

Silahkan buka project rest api tersebut ke dalam kode editor favorit kalian. Untuk menjalankan project codeigniter, masuk dulu ke folder projectnya lalu klik kanan open terminal or cmd dan ketikkan perintah `php spark serve`

Jangan lupa untuk mengganti **CI_ENVIRONMENT = production** menjadi **CI_ENVIRONMENT = development** pada file `.env` (jika namanya env ubah menjadi .env)

Untuk lebih jelasnya saya pernah membuat video instalasi, bisa diliat pada [Cara Install Codeigniter 4](https://www.youtube.com/watch?v=BX2Hex9yQoQ&t)

### 6. Koneksi ke database

Sebelumnya silahkan buat databasenya terlebih dahulu, disini saya membuat database dengan nama `rest_ci4` lalu di dalamnya saya buat sebuah tabel dengan nama `todo` yang memiliki 4 kolom(id[auto increment], judul, deskripsi, jadwal_selesai) jangan lupa juga untuk isi datanya.

{{< figure src="/todo/6.png" width="100%" >}}

Kemudian buka file `.env` dan cari bagian database lalu uncomment dan sesuaikan menjadi seperti ini.

```txt
database.default.hostname = 127.0.0.1
database.default.database = rest_ci4
database.default.username = root
database.default.password = 
database.default.DBDriver = MySQLi
```

Sesuaikan nama database kalian jika berbeda.

### 7. Membuat Model

Pada folder `Models` silahkan buat file baru dengan nama `Mtodo.php` kemudian isi dengan kode berikut.

```php
<?php

namespace App\Models;

use CodeIgniter\Model;

class Mtodo extends Model
{
   protected $table = 'todo';

   public function getTodo($id = false)
   {
      if ($id === false) {
         return $this->findAll();
      } else {
         return $this->getWhere(['id' => $id])->getRowArray();
      }
   }
}
```

Fungsi `getTodo` akan kita gunakan untuk mengambil data di dalam tabel, jika id nya kosong maka semua data akan ditampilkan, namun jika id nya ada maka akan ditampilkan data berdasarkan id.

### 8. Membuat controller 

Pada folder `Controllers` buat sebuah file dengan nama `Todo.php` yang akan kita jadikan sebagai controllernya. Setelah itu sesuaikan kodenya menjadi seperti berikut.

```php
<?php

namespace App\Controllers;

use App\Models\Mtodo;
use CodeIgniter\RESTful\ResourceController;

class Todo extends ResourceController
{
   protected $format = 'json';
   protected $modelName = 'use App\Models\Mtodo';

   public function __construct()
   {
      $this->mtodo = new Mtodo();
   }

   public function index()
   {
      $mtodo = $this->mtodo->getTodo();

      foreach ($mtodo as $row) {
         $mtodo_all[] = [
            'id' => intval($row['id']),
            'judul' => $row['judul'],
            'deskripsi' => $row['deskripsi'],
            'jadwal_selesai' => $row['jadwal_selesai'],
         ];
      }

      return $this->respond($mtodo_all, 200);
   }
}
```

Disini kita menggunakan `ResourceController` sebagai parent dari controller yang memuat berbagai macam fungsi seperti edit, delete, dll. yang akan mempermudah kita dalam membuat CRUD.

Kemudian variabel `$format` bertugas untuk mengatur format data yang ditampilkan dalam hal ini adalaj **JSON**. Saya juga membuat objek `$mtodo` agar bisa mengakses fungsi yang ada di dalam model `Mtodo.php`.

### 9. Mengatur resources todo

Buka file `Routes.php` kemdudian tambahkan kode berikut ini dibawah `$routes->get('/', 'Home::index');` sehingga menjadi seperti berikut.

```php
$routes->get('/', 'Home::index');
$routes->resource('todo');
```

Kode diatas berfungsi untuk menangani resource controller.

### 10. Membuat fungsi tambah data

Buka file `Mtodo.php` dan tambahkan fungsi berikut ini.

```php
public function insertTodo($data)
   {
      $query = $this->db->table($this->table)->insert($data);
      if ($query) {
         return true;
      } else {
         return false;
      }
   }
```

Fungsi `insertData` berfungsi untuk melakukan insert/menambah data ke dalam database.

Kemudian buka controller `Todo.php` dan tambahkan juga fungsi `create` untuk memanggil fungsi yang ada pada model sehingga bisa menambah data.

```php
public function create()
   {
      $judul = $this->request->getPost('judul');
      $deskripsi = $this->request->getPost('deskripsi');
      $jadwal_selesai = $this->request->getPost('jadwal_selesai');

      $data = [
         'judul' => $judul,
         'deskripsi' => $deskripsi,
         'jadwal_selesai' => $jadwal_selesai
      ];

      $simpan = $this->mtodo->insertTodo($data);

      if ($simpan == true) {
         $output = [
            'status' => 200,
            'message' => 'Berhasil menyimpan data',
            'data' => ''
         ];
         return $this->respond($output, 200);
      } else {
         $output = [
            'status' => 400,
            'message' => 'Gagal menyimpan data',
            'data' => ''
         ];
         return $this->respond($output, 400);
      }
   }
```

### 11. Menambahkan fungsi show dan edit

Masih di controller `Todo.php` tambahkan kode berikut.

```php
public function show($id = null)
   {
      $mtodo = $this->mtodo->getTodo($id);

      if (!empty($mtodo)) {
         $output = [
            'id' => intval($mtodo['id']),
            'judul' => $mtodo['judul'],
            'deskripsi' => $mtodo['deskripsi'],
            'jadwal_selesai' => $mtodo['jadwal_selesai'],
         ];

         return $this->respond($output, 200);
      } else {
         $output = [
            'status' => 400,
            'message' => 'Data tidak ditemukan',
            'data' => ''
         ];

         return $this->respond($output, 400);
      }
   }

   public function edit($id = null)
   {
      $mtodo = $this->mtodo->getTodo($id);

      if (!empty($mtodo)) {
         $output = [
            'id' => intval($mtodo['id']),
            'judul' => $mtodo['judul'],
            'deskripsi' => $mtodo['deskripsi'],
            'jadwal_selesai' => $mtodo['jadwal_selesai'],
         ];

         return $this->respond($output, 200);
      } else {
         $output = [
            'status' => 400,
            'message' => 'Data tidak ditemukan',
            'data' => ''
         ];
         return $this->respond($output, 400);
      }
   }
```

Kode diatas bergungsi untuk manampilkan detail dari data berdasarkan id.

### 12. Menambah fungsi update

Buka file model `Mtodo.php` kemudian tambahkan fungsi `updateTodo` untuk melakukan update pada data.

```php
public function updateTodo($data, $id)
   {
      return $this->db->table($this->table)->update($data, ['id' => $id]);
   }
```

Kemudian bukan file `Todo.php` dan tambahkan fungsi `update` berikut.

```php
public function update($id = null)
   {
      // menangkap data dari method PUT, DELETE
      $data = $this->request->getRawInput();

      // cek data berdasarkan id
      $mtodo = $this->mtodo->getTodo($id);

      //cek todo
      if (!empty($mtodo)) {
         // update data
         $updateTodo = $this->mtodo->updateTodo($data, $id);

         $output = [
            'status' => true,
            'data' => '',
            'message' => 'sukses melakukan update'
         ];

         return $this->respond($output, 200);
      } else {
         $output = [
            'status' => false,
            'data' => '',
            'message' => 'gagal melakukan update'
         ];

         return $this->respond($output, 400);
      }
   }
```

Jangan lupa simpan hasilnya.

### 13. Menambahkan fungsi delete

Terakhir kita tambahkan fungsi untuk menghapus data, buka `Mtodo.php` dan tambahkan fungsi `deleteTodo` berikut.

```php
public function deleteTodo($id)
   {
      return $this->db->table($this->table)->delete(['id' => $id]);
   }
```

Kemudian pada controllernya tambahkan fungsi `delete`.

```php
public function delete($id = null)
   {
      // cek data berdasarkan id
      $mtodo = $this->mtodo->getTodo($id);

      //cek todo
      if (!empty($mtodo)) {
         // delete data
         $deleteTodo = $this->mtodo->deleteTodo($id);

         $output = [
            'status' => true,
            'data' => '',
            'message' => 'sukses hapus data'
         ];

         return $this->respond($output, 200);
      } else {
         $output = [
            'status' => false,
            'data' => '',
            'message' => 'gagal hapus data'
         ];

         return $this->respond($output, 400);
      }
   }
```

Jangan lupa di save.

### 14. Testing

Untuk mengecek apakah rest api yang sudah kita buat berjalan dengan baik, kita bisa cek menggunakan aplikasi **postman**. Jika belum punya silahkan download (https://www.postman.com/downloads/) kemudian install seperti biasa.

Setelah postman di install, silahkan buka.

Jangan lupa untuk menjalankan server CI terlebih dahulu dengan perintah `php spark serve`.

Kemudian tulisankan `localhost:8080/todo` dengan method GET, maka hasilnya akan seperti ini.

{{< figure src="/todo/7.png" width="100%" >}}

Bisa diliat bahwa data sudah bisa kita tampilkan dengan format JSON. Kita juga bisa melakukan create, update, dan delete data dengan mengganti methodnya dan sesuaikan url nya.

# Bagian 3 integrasi angular dan codeigniter

Setelah sebelumnya kita sudah membuat front end angular untuk tampilan dan backend codeigniter untuk rest apinya. Sekarang kita akan melakukan integrasi atau menggabungkan keduanya sehingga menghasilkan aplikasi todo yang memuat operasi CRUD dengan data yang disimpan pada database.

Oke masih semangat ? let's code again...

### 15. Koneksi ke rest api

Sekarang kita akan coba untuk melakukan koneksi antara angular dengan rest api yang sudah kita buat.

Karena kita masih menggunakan local server, maka perlu disediakan web server lokal dan yang akan kita gunakan adalah xampp. Oke langsung saja start xampp kalian.

Kemudian pindahkan projek rest api yang sudah dibuat ke dalam folder `htdocs` di xampp kalian dan ganti namanya menjadi `rest-api` sehingga menjadi seperti ini.

{{< figure src="/todo/8.png" width="100%" >}}

Lalu tambahkan module http client ke dalam `app.module.ts`.

```typescript
// koneksi http
import { HttpClientModule } from '@angular/common/http';
..
..
imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesign,
    FormsModule,
    HttpClientModule
  ],
..
..
```

Selanjutnya buat api service pada angular dengan perintah berikut.

```txt
ng g service api
```

Maka akan terbentuk dua file yaitu `api.service.ts` dan `api.service.spec.ts`. Di dalam file `api.service.ts` tambahkan dan sesuaikan kodenya sehingga menjadi seperti ini.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiUrl: any = 'http://localhost/rest-api/public/todo';

  baca() {
    return this.http.get(this.apiUrl);
  }
}
```

`apiUrl` merupakan base url dari rest api yang sudah kita buat yang di dalamnya bisa mengakses fungsi CRUD, sedangkan fungsi `baca()` merupakan sebuah fungsi yang akan kita gunakan untuk membaca data dari api.

Kemudian buka file `todo.component.ts` dan tambah dan sesauikan kodenya menjadi seperti ini.

```typescript
// api service
import { ApiService } from '../api.service'; // import apiservice

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    public dialog: MatDialog, //menambahkan variabel dialog
    public api: ApiService
  ) {
    this.getData()
  }

  todo: any = []
  getData() {
    this.api.baca().subscribe(res => {
      this.todo = res
    })
  }
...
...
```

fungsi `getData()` kita gunakan untuk mengambil atau membaca data dari api ke aplikasi angular yang kita buat.

Jalankan aplikasi angular dengan perintah `ng s --o` kemudian cek konsole (f12) dan pada menu `network` kemudian `todo` dan seharusnya data sudah berhasil ditampilkan seperti berikut ini.

{{< figure src="/todo/9.png" width="100%" >}}

### 16. Menampilkan data ke user interface

Setelah front end dan backend berhasil kita integrasikan, sekarang kita tinggal menampilkan datanya ke dalam user interface yang sudah kita buat.

Buka file `todo.component.html` dan sesuaikan kode yang ada menjadi seperti berikut.

```html
<div class="container">
  <button class="btn-tambah" mat-raised-button color="primary" (click)="buatKegiatan()">Add Activities</button>
  <mat-card>
    <mat-card-header>
      <mat-card-title>To Do List</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <mat-list>
        <mat-list-item *ngFor="let item of todo">
          <img matListAvatar src="assets/todo.png" alt="...">
          <h3 matLine> {{item.judul}} </h3>
          <p matLine>
            <span> {{item.deskripsi}} </span>
          </p>
          <p matLine>
            <span>Deadline : {{item.jadwal_selesai}}</span>
          </p>
          <button class="btn-edit" mat-raised-button color="accent">Edit</button>
          <button class="btn-selesai" mat-raised-button color="warn">Done</button>
        </mat-list-item>
      </mat-list>
    </mat-card-content>
  </mat-card>
</div>
```

Kita melakukan perulangan di dalam list item tersebut sehingga hasilnya menjadi seperti ini.

{{< figure src="/todo/10.png" width="100%" >}}

### 17. Membuat fungsi insert data

Buka file `api.service.ts` kemudian tambahkan fungsi `simpan()` dengan method http post untuk membuat data baru, sehingga fungsinya seperti berikut.

```typescript
simpan(data: any) {
    console.log(data)
    return this.http.post(this.apiUrl, data)
  }
```

Fungsi diatas akan memanggil method `create` yang sudah dibuat pada codeigniter 4 karena menggunakan `ResourceController` sebagai parent dari controller dalam pembuatan rest. Ada juga method `show`, `edit`, dan `delete`.

Lalu buka `tambah-data.component.ts dan sesuaikan kodenya menjadi seperti berikut.

```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tambah-data',
  templateUrl: './tambah-data.component.html',
  styleUrls: ['./tambah-data.component.css']
})
export class TambahDataComponent implements OnInit {

  data: any = {}
  constructor(
    public api: ApiService,
    public dialogRef: MatDialogRef<TambahDataComponent>,
    @Inject(MAT_DIALOG_DATA) public itemData: any
  ) {
    if (itemData != null) {
      this.data = itemData;
    }
  }

  ngOnInit(): void {
  }

  insert(data) {
      this.api.simpan(data).subscribe(res => {
        this.dialogRef.close(true)
      })
  }
}
```

Saya menambahkan fungsi `insert` untuk memanggil api dan melakukan penambahan data sesaui method pada api.

Sekarang buka `tambah-data.component.html` kemudian tambahkan `ngModel` dan juga `onclick` sehingga menjadi seperti ini.

```html
<h3 mat-dialog-title>Add New Activities</h3>
<div mat-dialog-content>
  <mat-form-field style="width: 100%;">
    <mat-label>Title</mat-label>
    <input matInput [(ngModel)]="data.judul">
  </mat-form-field>

  <mat-form-field style="width: 100%;">
    <mat-label>Description</mat-label>
    <input matInput [(ngModel)]="data.deskripsi">
  </mat-form-field>

  <mat-form-field style="width: 100%;">
    <mat-label>Deadline</mat-label>
    <input matInput [(ngModel)]="data.jadwal_selesai">
  </mat-form-field>
</div>
<mat-dialog-actions>
  <span class="spacer"></span>
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-raised-button color="primary" [mat-dialog-close]="true" (click)="insert(data)">Save</button>
</mat-dialog-actions>
```

### 18. Membuat fungsi edit data

Buka kembali file `api.service.ts` dan tambahkan fungsi `ubah` seperti berikut.

```typescript
ubah(data) {
    return this.http.put(this.apiUrl + '/' + data.id, data)
  }
```

Fungsi diatas akan melakukan edit data sesuai dengan id data dan kita menggunakan method `put`.

Lalu tambahkan fungsi `editTodo` pada file `todo.component.ts` untuk memunculkan dialog edit.

```typescript
//fungsi untuk menampilkan dialog edit data
  editTodo(data) {
    const dialogRef = this.dialog.open(TambahDataComponent, {
      width: '450px',
      data: data
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getData() // menampilkan data setelah diperbarui
    });
  }
```

Dan jangan lupa di `todo.component.html` tambahkan trigger `click` pada button edit seperti ini.

```html
<button class="btn-edit" mat-raised-button color="accent" (click)="editTodo(item)">Edit</button>
```

Selanjutnya buka `tambah-data.component.ts` dan sesuaikan fungsi `insert` menjadi seperti berikut.

```typescript
insert(data) {
    if (data.id == undefined) {
      this.api.simpan(data).subscribe(res => {
        this.dialogRef.close(true)
      })
    } else {
      this.api.ubah(data).subscribe(res => {
        this.dialogRef.close(true)
      })
    }
  }
```

Oke jadi ketika id nya kosong maka insert data baru, namun ketika idnya ada maka akan di update sesaui id.

### 19. Membuat fungsi hapus data

Buka lagi file `api.service.ts` dan tambahkan fungs `hapus` dengan method delete by id seperti berikut.

```typescript
hapus(id) {
    return this.http.delete(this.apiUrl + '/' + id)
  }
```

Terakhir di `todo.component.ts` tambahkan fungsi `hapusTodo` dengan paramter id sehingga seperti ini.

```typescript
//fungsi untuk menghapus data
  hapusTodo(id) {
    console.log('data dihapus')
    this.api.hapus(id).subscribe(res => {
      this.getData()
    })
  }
```

Dan tambahkan trigger `onclick` pada button hapus di file `todo.component.html`

```html
<button class="btn-selesai" mat-raised-button color="warn" (click)="hapusTodo(item.id)">Done</button>
```

Kode diatas berfungsi untuk menghapus data berdasarkan id nya.

### 20. Penutup

Selamat kita sudah menyelesaikan project membuat aplikasi menggunakan angular sebagai front end dan codeigniter 4 sebagai back end. Tetap semangat, stay coding and stay awesome.

Untuk hasilnya seperti berikut.

Halaman login :

{{< figure src="/todo/11.png" width="100%" >}}

Ketika login berhasil masuk ke halaman todo yang membuat CRUD :

{{< figure src="/todo/12.png" width="100%" >}}

Tambah data :

{{< figure src="/todo/13.png" width="100%" >}}

{{< figure src="/todo/14.png" width="100%" >}}

Edit data :

{{< figure src="/todo/15.png" width="100%" >}}

Hapus data :

{{< figure src="/todo/16.png" width="100%" >}}

> "The only way to learn a new programming language is by writing programs in it." 

Source code : [To Do App Github](https://github.com/ahmadsufyan455/todoApp-angularCI)