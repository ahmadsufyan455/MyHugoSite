---
title: "Membuat Form Login Dengan Codeigniter 4"
description: "Form login codeigniter 4 dengan otentikasi"
date: 2020-07-04T14:26:44+07:00
draft: false
categories: [code, webApp]
---

Berikut ini saya akan mendokumentasikan cara untuk membuat form login menggunakan Codeigniter 4.

Skenarionya adalah, user melakukan input email dan password pada form dan bila sesuai dengan data yang ada di database maka user akan di arahkan ke halaman user, apabila user gagal login maka akan tampil alert warning yang memberitahu bahwa user tersebut memasukkan email/password yang salah.

Oke let's cekidot..

#### 1. Mempersiapkan database

Sebelumnya kita buat terlebih dahulu databasenya, bisa menggunakan `sqlyog` maupun `phpmyadmin`.

Untuk membuat database jangan lupa nyalakan web server dalam hal ini kita gunakan `xamppp`.

Disini saya membuat database `praktikum` kemudian di dalamnya ada tabel `user` seperti berikut.

![database](/formloginci4/1.png)

Yang akan digunakan login adalah field `user_email` dan `user_pass`.

#### 2. Menghubungkan database dengan project CI 4

Untuk menghubungkan database yang sudah kita buat dengan project, sekarang kita buka folder project di code editor dan fokus pada folder `App` disana akan ada banyak folder yang biasa kita gunakan adalah `Config`, `Controller`, `Models`, dan `Views`.

Kemudian pada folder `Config` cari `Database.php` kemudian sesuaikan isinya seperti berikut.

```php
public $default = [
		'DSN'      => '',
		'hostname' => '127.0.0.1',
		'username' => 'root',
		'password' => '',
		'database' => 'praktikum',
		'DBDriver' => 'MySQLi',
		'DBPrefix' => '',
		'pConnect' => false,
		'DBDebug'  => (ENVIRONMENT !== 'production'),
		'cacheOn'  => false,
		'cacheDir' => '',
		'charset'  => 'utf8',
		'DBCollat' => 'utf8_general_ci',
		'swapPre'  => '',
		'encrypt'  => false,
		'compress' => false,
		'strictOn' => false,
		'failover' => [],
		'port'     => 3306,
	];
```

Yang perlu di ubah pada kode diatas adalah:

hostname : isi dengan localhost/127.0.0.1

username : isi dengan username database, biasanya root

password : isi dengan password database, biasanya kosong

database : isi dengan nama database

#### 3. Membuat model

Kemudian kita akan membuat sebuah model untuk mengambil data yang ada di database.

Buat file baru di dalam folder `Models` dengan nama `M_user.php` Kemudian kita isi dengan kode berikut.

```php
<?php namespace App\Models;
use CodeIgniter\Model;

class M_user extends Model
{
	public function get_data($email, $password)
	{
      return $this->db->table('user')
      ->where(array('user_email' => $email, 'user_pass' => $password))
      ->get()->getRowArray();
	}

	//--------------------------------------------------------------------

}
```

Kode diatas berfungsi untuk mengambil data dari tabel `user` yang ada di database dan fungsi `get_data` untuk memfilter field `user_email` dan `user_pass` yang akan digunakan sebagai data untuk login.

#### 4. Membuat controller

Selanjutnya masuk ke folder `Controller` dan buat sebuah file dengan nama `Login.php` kemudian isi dengan kode berikut.

```php
<?php namespace App\Controllers;

use App\Models\M_user;

class Login extends BaseController
{
	public function index()
	{
		return view('user_form');
   }
   
   public function login_action() 
   {
      $muser = new M_user();

      $email = $this->request->getPost('email');
      $password = $this->request->getPost('password');

      $cek = $muser->get_data($email, $password);

      if (($cek['user_email'] == $email) && ($cek['user_pass'] == $password))
      {
         session()->set('user_email', $cek['user_email']);
         session()->set('user_nama', $cek['user_nama']);
         session()->set('user_id', $cek['user_id']);
         return redirect()->to(base_url('user'));
      } else {
         session()->setFlashdata('gagal', 'Username / Password salah');
         return redirect()->to(base_url('login'));
      }
   }

   public function logout() 
   {
      session()->destroy();
      return redirect()->to(base_url('login'));
   }

	//--------------------------------------------------------------------

}
```

Kode diatas berfungsi untuk menampilkan halaman `user_form` untuk melakukan login. Kemudian fungsi `login_action` berfungsi untuk memfilter inputan user, jika benar maka redirect ke halaman user, jika salah maka tetap di halaman login dan menampilkan pesan warning bahwa email/password salah.

Kemudian ada juga fungsi `logout` untuk digunakan logout oleh user ketika berada di halaman user.

#### 5. Membuat view user form

Sekarang kita akan membuat sebuah view baru untuk form login. Buka folder `Views` dan buat file dengan nama `user_form` dan isi dengan kode untuk membuat form berikut.

```html
<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

   <title>Login Form</title>
</head>

<body>

   <div class="container">
      <div class="row">
         <div class="col-md-4 mx-auto pt-5">
            <form method="POST" action="<?= base_url('login/login_action'); ?>">
               <div class="form-group">
                  <label for="email">Email address</label>
                  <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp">
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
               </div>
               <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" name="password" class="form-control" id="password">
               </div>
               <div class="form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1">
                  <label class="form-check-label" for="exampleCheck1">Check me out</label>
               </div>
               <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <p>
               <?php if (!empty(session()->getFlashdata('gagal'))) { ?>
                  <div class="alert alert-warning">
                     <?php echo session()->getFlashdata('gagal') ?>
                  </div>
               <?php } ?>
            </p>
         </div>
      </div>
   </div>

   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>
``` 

Perhatikan pada atribut form kita menggunakan method `POST` dan actionnya mengarah ke controller `Login` dan memanggil fungsi `login_action`.

#### 6. Membuat view user 

Sekarang kita akan buat view untuk user ketika berhasil login.

Buat file baru di folder `Views` dengan nama `user_view` isi dengan kode berikut.

```html
<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

   <title>User</title>
</head>

<body>
   <div class="jumbotron">
      <h1 class="display-4">Hello, <?= session()->get('user_nama'); ?>!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <a class="btn btn-primary btn-lg" href="<?= base_url('login/logout'); ?>" role="button">Logout</a>
   </div>

   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>
```

#### 7. Membuat controller user

Untuk menampilkan user view ketika login berhasil maka kita memerlukan controller.

Buka folder `Controller` kemudian buat file dengan nama `User.php` kemudian isi dengan kode berikut.

```php
<?php

namespace App\Controllers;

class User extends BaseController
{
   public function index()
   {
      if (session()->get('user_nama') == '') {
         session()->setFlashdata('gagal', 'Anda belum login');
         return redirect()->to(base_url('login'));
      }
      return view('user_view');
   }

   //--------------------------------------------------------------------

}
```

#### 8. Uji coba login

Tampilan dari user form adalah seperti ini

![form](/formloginci4/4.png)

Kemudian bila user memasukkan email atau password salah maka akan muncul warning

![form](/formloginci4/3.png)

Dan apabila user berhasil login makan akan redirect ke halaman user
 
![form](/formloginci4/2.png)

Sekian dan terima kasih.