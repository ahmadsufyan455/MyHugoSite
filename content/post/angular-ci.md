---
title: "Create TodoApp Using Angular And Codeigniter (Include CRUD)"
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

```
ng g c login
ng g c todo
```

Maka akan tercipta dua buah folder untuk komponen login dan todo.

![todo](https://lh3.googleusercontent.com/gUnqmh7t69z6usX-CfysaqeelsV2knCWpZMusJJjRN_aNKbiYkP93Ih2eRpmANjzSxIKvvqpXQ2niBM8v5w9pcAWpbe739YZuqiFMLLbKn6UO6VNJ1P9BJUETmbNXmkdaF2i9nNOrVrwC64dSTbLWC5oewvmewsadX3i1YcMA7ChgXS9yC5OiXT3BP6eVN52nduqFQ5DDEpLtNq0PZuIbM4WgyZrZ8bRGPCU4gl3_aMNfGiazXb7iPkT1ehRZo8ppKB3t2BBNYGR0lsmfP6BiyeZ8AuQ79qelN-TJ4hJSSbUNWJ8PCumKbM_muZIH6vb8bYZZr4V3r7-VURv8lNbywx3vWxw_MAx8-LZneZMC6EBQAp-hh3ohXjQvYmvB17GrJe9oEu-iWqTMjxLHtXtArSqh0qbK81MvCWOvT1jaJyrln4P9-KHOCLy4a6_z8OhkLVkL6w7EB7AK2eErcCYMVyel8QMS4Z7exg8_lazyDOILh2RxMJbbKWoW9Wtd2fYBdv7ylD_WguJnw8_3Yzujzap8PIsKPLHOVYtNfutsDjfG8YVrs98XKNMXYfzx4v7fCsjbVgP9N0LCInCB236Jk7yOyV1ip0xj4LGknS_Z-1FVRQxgq9H-IWsF9P-qaHl-Gr9izByjG59hF5efkLV1n0hjgJrdPSKo4mwYw4iPnpi_IWt4o87Uqj-ydP8Vg=w229-h111-no?authuser=0)
![todo](https://lh3.googleusercontent.com/IMadTiPcW5gO4yPZpwQN_PG5dKYp65BziU221VMG1juSsmGvDmmYso9UDnBKiFyDbfiWPWA25pCl1OSWe9jaQKw1ix_o0fAjnbhA8GhYOE-FtZepp4kKajKXBU9ZsnzUKomEQT8c49E2m2T1hTx49WPIzCk9ldJEIOgrvXk4i2HSg_h8weNqBg0R293Vd70S1d-kT-6oxWirbhdgfd1ZTfYlUtby6plEWnbrczy4V3OESrfuQZcBEnOKBkCrl39lAq7kKzbnFAGXIjGRv8d417VXZBRE2JRa-iCg1j58xJkQY_jkSZPO11Sioms45QGsz9CiZhCnxySeFOnIMq-b9ZryGWK86Xd6LtLWNdyh3_i37_oheww9nJvA8gPhActmzIoxYzgGiGmSDqWYgbWsnevdYobwUVIKO1AqGLr4gwZaTrh10eyEERfqTJr3OJXJ91lvbn81BtM7hj3jfnoVKsbyK34TKiDZv-rWDLICuIqGqQceig8lU-MSH-ENE_c2szJLXQOWdBXr8XwYkG1e04rFySutN0qva9B77sRPVWiWI6B-mnAburTY3F-JmFmPBflaRttmT99XvZNslUJiVVRBT5mZRy_d6-b5EirHoR0w_xgxDXrC8aaKar6RNQLAnx6Fd3v6Wz9e-VMtK3eJKTu7KZFFjJQ5htbvCJe17iKYm5_Z0atOnmTBU6RN_Q=w242-h108-no?authuser=0)

### 2. Menginstall material desain

Untuk membuat tampilan dari aplikasi, disini saya menggunakan material desain dari google. Untuk menggunakannya kita perlu menginstallnya dulu dengan perintah berikut.

```
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

![todo](https://lh3.googleusercontent.com/6hUFxVX_AWGwk6B6CTDpK5jrI4xWeGHaVRTcvtjAIkVBfoeI-wTi_2kGRotffxMq4vyLKn1G-qvIB-BtlLUiOMQCUPReh4DBiXVzJaO6k3U0LTAVGliw1iUcrFY0IKivCXcwQWPlzKiaPaoA_jW1ELUmdaZxS4wGgHLLbXCWK2TaXMLpSDihEVIr0wKr0QshToDteimUwj9TbKYRzPpbCNnHJFR-WY7qOAUEImuz0zr0zikyD2GzOyD7ooHW5m-QlDX20-t8UdB184gRcNGoUn1ROCOPgv9wCCfoTYYFElGDn7QC1L8zCUJK6e8bgLIX-rEt5qNFUUGRfPDFBmLAy_cTuTK-XfNJci3Z69hnVqIf0_xwSNzS2Z4vZgoJUdG-oPgLeXuzRhYX0OYREBemmUvzZgGYOOhSbMFXQY4LbDZs-wyNuPrLXaqvLN2goxTxsGeylEGNnWif44CipGDHHtj3cM_mMu-5ax7vSR5DyZsY6Mj2OPqibZ_JCF9wTwKS9uzyfaZlFU3xqGX5L6bVvYg38lMF_i6QuwBbSKl9xe9oOU4EsNrz7NkE_9gLrs5uWTH0mDvgWPjwyJ-v4vGxUN9fvnfEIPrljYAqIzU3KyKOXs374gU51SU_d2fQPeFzkRKzcLujPP-99pwnkH_N0EtCQRMqzPbp-Lm_EN7soGN-T8e7Z0Uyj1l659kwqg=w1184-h640-no?authuser=0)

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

![todo](https://lh3.googleusercontent.com/fFdzdngVhiXX7vfj7zoOxTGvmS84CfMUWYogiQZ73mW3sI9yhkXbEZ_553s5YUz7U-nxVWZTpRWu6qjmsDb29QlITX4LRf2P83CG0zflISlixFXdrTrouV48rd8mlQ6-2l5Eb3etX3uc3Zqr-XhaEMmZreeDKdP_ALBpbvKiybI77fjUPXRO9ukE-QPOwpb3lr71sG6XdBDCtzkAbaeD2sdjQsISVtYzcaisJoDesX7i45GU-04QJl15dhohqF9vukeBkANzj8V2J3i-drimhgeZ04l9bgHlmQ_Btr437gYfAWJWAkEQuQRsRFKQpAzNEV-DzDFfSok3EhWVUAe9HJfDStYZsLYEOUzPE421Wu2V1xJs44jGF69yWP8VgXrBGzytcy6XbDCvATtymJEj22zVGUl3KY7llmTSbvJVcnMWBExm_y4DSV_CYT84oOEVEnHEY-Lz2vxfO_4qQ5mKTUsXdhksYThannD_4yIpfVbTaOaeiDnVRasYiTVcLG_RWiZspY4blExKrbtFZvEfU-ezabb5V54xXfZJaj6d10QrT1pB6Lpj0Mj7r68PqRMqPlvcGSx7Rw88Jty8nYQdxUChgttDOB92RGYUWqPhihNh7ZJ_APxMucULkcFtN4csb42UiHeIK9b9PeqOYtkvlAWXmK2zqPYtYcE89Tl2A963qVHlLg89MCsYLYS3dw=w1257-h640-no?authuser=0)

Selanjutnya kita akan membuat dialog untuk menambahkan data / kegiatan. Saya menggunakan komponen dialog material desain.

Sebelumnya buat dulu komponen baru untuk tambah data, ketikka perintah berikut.

```
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

![todo](https://lh3.googleusercontent.com/B3ex23EYPu_Kpi7KO82FCBqdT9fE8QwYQmrs3BwWddAyIcqmAMclGuY0fdszH5QvHGo3yka2aHlwlBWGxyiL7YzpgC4ch2tKbr-0NaPDkDd-sZ4PRgWaFQ6_WbAKjtHE93pTOklXi40jq0YD7W6aRLiom_Ji3OZaEcCyVOksLx9M9aNER5KDwb75eE3IFQh9y_TMjrkMSD-rQfGfKqc6WM3aF4AKLgGgA3PHjbivmGCqD_StBDNmWkFUAbpt9BtYxtd7ZqYbrhoJzyUKK1hU45ZKbxWmBS_yBePPanlJEXM5aSHqd5tqgcEwPFsZUJp50rDvOe5ptcN8JnCEeo5jXYJmK7XNuLzQVKqhPdEUDB3E4qRKy4omLpl-QR2XTGuLVWnispYGTdKjvGItPFJCB0HFIVp-oYabP9v9uU7jNfU4CWyg53ylYn96swbdwzguyedb-inBD7HDRkDUqIyq-XkmCyrP2iLPvXRPePVY0QG0EtLfQ9DDxRWOTly-gMCxxMfogiaaX4ZaON_cHozopj2ahRnNWzYqHTLv_50TZx1QPCzFjwlp3YkOJ4Cx8XzliiRv4U5zT2tqNHoJRAJAtHb4X_H3dXBDBIN6oeYpzvgBNpZeF450qEELu-gMqkowtch6sgUOJVnkdLkRZseKeT-U9ykfVhIYxrbgH3M5LatdLYtNCQ-jFR0Uq5NTqw=w1344-h574-no?authuser=0)

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

![todo](https://lh3.googleusercontent.com/PYQs_mDb1X5am-TsmocS2VKHrRkplMk81Gu7YyID_k4LTB4e0G5nnQ2DPc5Irc5NCUviqk18ZGoCRJ30ZNFWUP6sMvlwMjHNHTxgpsbVcEeY8VarAafrSpu-jc1wQaBJWoUb81g3A6Jmo-SllsmOM86U1e_Dxx5mcmeo9TAJp22zrAFn6FRURMt9hGTnO3lvHDwNobzI4rurUU7uDYnpaqNGzGgehW2PmNr7v4vA1uXFbLyraytQt03Xr4BH7PKzD1iR603JV9I_2kFIYgL7MttagG1AAyIoulraj3vKwFbcPauC0amDHxGf9vLiE8FFFwa58RSr7TNIQJj58lx5Ce61fT-XOe3Y0slKB1MwnVaxV8fvkEsWYp9tvKvg-OXHMZ_QABKHFrbOtijksT8PU49qdQiGrbzvCekVbNTvEQirIy6YNwgORZypHyIxy5IEk9cnsq-tOQka-0RhJHdZXMirGxOcD4nt5CesHGNwHUTWQaDgtXhX1TYWR16QIGH1jc57bfmp-jIHzxkYloV1z1a6PiiTGS1j1goC9wO4s7MxkuAiRdYmrgh0e5wBIq-i5htErwHTaoa8jO7HEwoYyIJZGCpjzJ_HphexI9bH1T2Rexa0nmrnIWXDJwnbaNImaIyCrHN6lHlQS2d7JSQEVyOlHdxr8UG-MDPRIlXXd2fAudG07uAmgP3JxeB5FA=w1353-h598-no?authuser=0)

Kemudian buka file `.env` dan cari bagian database lalu uncomment dan sesuaikan menjadi seperti ini.

```
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

![todo](https://lh3.googleusercontent.com/-flihvu0FAC_9rt1BqP85ZSSJhLK2iH4U119YORAET8XVPzppDKTxTyQkOOFXrWo4EydBFlFTP7rhOc6EEV-gsZzIwk9QLG_CcIngWwEEFOcLNuvfMIFVtx4iLSMyT0G_O47hjDrUwKe1niDsxIl_zKAwLpC-qIeUnZwuj9nCoFe9zugdd0_8SM_gnTKMbelApKUUi3qGkuCE3emZYSZgGgWxbiGDOBJzMTntX9JtR8N2YbLZAnmsilgRxtdYKcK46O-jgRzrYtogMSNbTuQD4N7nqq1NAqlDetRD3sepC-MxOMszLN1oc1pyaAVXeorlVm6zM-NZ2kO7tqYTUL6v_TzhpyTq-OOYfsZiEdc4kz-BJ3vYSdQeiuloTwv6pKzwIFisnwPn41m44HTuBXhl7Om0BfUuLUstJT98qAc-Agji7t8wpvRBaToh42ru2HWNCSv7mY1A3GTaGVYsf1cRkYuuEB8ntLkYfzZ7KS4Bv7-Y0pu9LRAzz7wwEzd3xJXCDkq9--AQtr2fI6kLXyebpLqcgVUA1NFq-9Bxzq1-etaYSKdLoEPoN6m_dAnXtJxk4HebEuaePW08wA12uBtZPhyv8JsrjM8UPwDh6OqSj1__LZIkdTCaf6TcaDXC8Rvmyub4DjO68tigwVvMjvx84xLE62V3jRLqToqTIirtwrtYmt_GPneU2H-Lc3qGw=w1026-h608-no?authuser=0)

Bisa diliat bahwa data sudah bisa kita tampilkan dengan format JSON. Kita juga bisa melakukan create, update, dan delete data dengan mengganti methodnya dan sesuaikan url nya.

# Bagian 3 integrasi angular dan codeigniter

Setelah sebelumnya kita sudah membuat front end angular untuk tampilan dan backend codeigniter untuk rest apinya. Sekarang kita akan melakukan integrasi atau menggabungkan keduanya sehingga menghasilkan aplikasi todo yang memuat operasi CRUD dengan data yang disimpan pada database.

Oke masih semangat ? let's code again...

### 15. Koneksi ke rest api

Sekarang kita akan coba untuk melakukan koneksi antara angular dengan rest api yang sudah kita buat.

Karena kita masih menggunakan local server, maka perlu disediakan web server lokal dan yang akan kita gunakan adalah xampp. Oke langsung saja start xampp kalian.

Kemudian pindahkan projek rest api yang sudah dibuat ke dalam folder `htdocs` di xampp kalian dan ganti namanya menjadi `rest-api` sehingga menjadi seperti ini.

![todo](https://lh3.googleusercontent.com/UJd3DVFhG8BEuXPCx8qTPrWXcLzIaxOQMd6PyZEvqrBqDSnqa2lUYuWRlAJOrKW4yGHljScnSOsmq16QQCDfCRkt_5IkwifmwRPs4gT7TSShArxfMRnKANmcRYjNFlVsgtGGrTarcXIE7vgGrTmLB-GvaNoZmNp0VumKdEaA8fYMUOCQQaAkEhKoTT7zgC5b2ulTszGMeejd7GKpp7KvKwFEGfaYE3rVHbY5JNqxdk3tuCSlv21CUkqrf2B4oGT8CupfbL1e0z2FJdR_3uAVpPpveYjdpKgWSrhDjopJqX0zQrtIQ93Kmh-t7BSBKDDOA3DhJvW4f5AKe0eRaPc_LSNd9V7wR4Qo825L2PMTQJIf8RUiNy9Ilzk8j1J_9Y2E1n03116OUlCIxpq_BpeY42Yi6hWRNKCicREMJT_jXRh7vjFey9gYZZpRRxlS3moIrmn3-5Mbh_UV7jFHMyiOG-_3alS05QR6eMf1KKdvu1ILQdT2BSZzI9cKT__zVzQrJi54SHvA1PfJ9slR3LNdk29Uh7AKLu1JLU_AH1drswHm9SWD0YkGDhe_57tZDyCHcN8Epp5Qb1oUP5ENZSjU5zw7wskj7yD-fI-yyPKu8q0o81xarME_6f4J8cmzW-7NfrlEVn_tEVuh43GHlAKLv5Vvs8rOK0jF0V7UbupZIPIZ49vShM1GeSiehOseXA=w741-h341-no?authuser=0)

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

```
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

![todo](https://lh3.googleusercontent.com/SnuwdWRdJ-tGOCvOh5fR5m6HoM9QdaTTeHwqELxG5Km9FLiynCHLbvn3cLg1e99SKyENSqG6kdKjSYSi3aEWuNVGurmmRuK2N9NGfOQ36A7ZHVdAFpf7CfZ_wfH9ZYozqD3OYUW2rWT53_eg99vn9YM4uIaG1_nfHS2fYydfxB7SUmyoqf_dm5AfZ3__RiJ6YV256ztRjSeUOALUuJGxBDR6a0DIv8naUJq2x9QUOTsTU8JgEuSN9J8YfZ83pTIQW-cMBQxuTAS7PahMg6RBHwH-3QbRpAbzCyJ0A4xuxj0ddTqknBUzv0bQ4mQUxzkRdczb_9AgSQGr0joKjlcstLvyeXDfCismbhtnTGWOV8DApBWo9uCA93b2IdElwPgvosZrIj38SMChdUNufvqvFv6yJYaXV4UZ3-g-KqjKXZ5A_4D8yYDV02Ee7bDEKklePHcM-IqMnuwg1rrei-jXlCRBddmCJoPHiid46cee9OAZl5krZA6Mddg-LL2fWeqYPU-Sc5iPBxRgc0VxlsTFMqmVPwlegGuXH_SidzWtD5mBIvpPrvmcgwm3zsAjH7MJ5H3D00EPLSf5cJuWgWWfJH_h-zOxDZJhY660_vx2Ft4gno_PGq8IZNmG_U73rjj2o18U_-dBpzhIuOFfxH7r246lBlJCEkDzU3KoPvZzrx2WkCFkHDFwfrYxObpzaw=w630-h620-no?authuser=0)

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

![todo](https://lh3.googleusercontent.com/p-8zzyksY1VlCEy2HSF3uFK4bqGThcVCABWJmdWre6_NbDYWMxgl_AUjk6flx3kA3ebkslnv6PsTl51y9bDyS0ELwxVk4f4gf5L0B6CcsmugPJ4ilseUrUJkJnZvwUEoJCAT5CcIBbFOchKkK0FuQn5udalJokV6tpli2I5UgkKDxOnzr0DFufRYyhy8lwBjtSb8rQBNYzRCqh7qVhqjj4EP6f1Lg9RtX6E6wr2ls16m-4GLAcVcRnK-uSK1sfRhQ68rFnER5njULagGbuCG0uOpFvOyo-Ppmam_0WJfEAkOyA3_E5DotqOYit9Ou0WkC7rQ2RIl38M75KldtgVx4VeUn8WfbvQFS7Ym8QrpcN462ZObmxmZMS80sDXwOIC5sAQw5bqsrWGt9biohizpUjK3fSCbY58NTh1ZpUSsQfqepc6ca9mwJzh48BERMwscPWJXhxqUoNwBy506D1ChFLpk7YbwqyO7E6-qy52-5oqvXyMg_IXJz_KLrxCI4MEYvvghrgoYpYewziS3G3c3O6dYphAwKvk4USsGYpFpfYE7mFEDDSmG5SRt8lrwF9g1M4X6ZBjb1DWkF3Z7sGKdSdr6Du3WsFQ9sNAqpSR-u4EcHN_kdBHJ5xIt_vPfd3I4MS42yXzRyeKXV8QgmW00DfpS4dZRIAbEKIXBaVLrkE5sF75rFKYkMKQk3YRg2A=w1182-h640-no?authuser=0)

### 17. Lagi stuck -_- istirahat dulu fren biar fresh :)