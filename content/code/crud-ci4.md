---
title: "Membuat Operasi CRUD Dengan CodeIgniter 4"
description: "Membuat operasi crud dengan codeigniter 4 dengan sistem login"
date: 2020-07-12T19:37:24+07:00
draft: false
categories: [code, webApp]
---

Setelah sebelumnya kita membuat [form login dengan CI 4](https://ahmadsufyan.my.id/post/form-login-ci4/), sekarang kita akan lanjutkan untuk membuat halaman user yang di dalamnya memuat CRUD(Create, Read, Update, Delete). Kita akan menggunakan database yang sebelumnya sudah kita buat di tutorial form login. Untuk tampilan dari halaman user akan memuat tombol untuk tambah data, edit, delete, dan logout, kemudian apabila tombol delete di klik akan menampilkan dialog konfirmasi sebelum data dihapus.

Oke, let's get started...

## Membuat halaman user CRUD

### 1. Membuat fungsi untuk menampilkan data

Kita akan membuat fungsi untuk menampilkan data yang ada di database. Kita buka model `M_user` kemudian tambahkan fungsi `get_user` berikut.

```javascript
public function get_user($id = false)
	{
		if ($id === false) {
			return $this->findAll();
		}

		return $this->getWhere(['user_id' => $id]);
	}
```

### 2. Membuat controller user

Selanjutnya kita buat controller untuk menampilkan viewnya, buat dengan nama `User`, kemudian tambahkan kode berikut ini.

```javascript
<?php

namespace App\Controllers;

use App\Models\M_user;

class User extends BaseController
{
   public function index()
   {
      if (session()->get('user_nama') == '') {
         session()->setFlashdata('gagal', 'Anda belum login');
         return redirect()->to(base_url('login'));
      }

      $model = new M_user();
      $data['user'] = $model->get_user();

      return view('user_view', $data);
   }

}
```

Kode diatas berfungsi untuk menampilkan data yang sudah kita buat di database ke dalam view `user_view` yang akan kita buat. Kita juga bisa membawa data ke dalam view tersebut dengan memasukkan parameter `$data`, kemudian `user` akan menjadi variabel baru atau data baru yang bisa kita tambahkan di dalam view tersebut.

### 3. Membuat halaman user view

Sekarang kita akan membuat halaman untuk menampilkan datanya, di folder `Views` buat file dengan nama `user_view` kemudian tambahkan kode berikut.

```html
<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

   <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

   <script>
      $(function() {
         $('#save').click(function() {
            $('#myForm').submit()
            $('#tambahdata').modal('hide')
         })
      })
   </script>

   <title>User</title>
</head>

<body>

   <div class="container mt-3">
      <h1>Hello, <?= session()->get('user_nama'); ?>!</h1>
      <a class="btn btn-primary" href="/user/tambahdata" role="button">Tambah Data</a>
      <table class="table mt-3">
         <thead class="thead-light">
            <tr>
               <th scope="col">user_id</th>
               <th scope="col">user_nama</th>
               <th scope="col">user_email</th>
               <th scope="col">Aksi</th>
            </tr>
         </thead>
         <tbody>
            <?php foreach ($user as $row) : ?>
               <tr>
                  <td><?= $row['user_id']; ?></td>
                  <td><?= $row['user_nama']; ?></td>
                  <td><?= $row['user_email']; ?></td>
                  <td>
                     <a class="btn btn-success" href="/user/edit/<?= $row['user_id']; ?>" role="button">Edit</a>
                     <a class="btn btn-danger text-white" onclick="hapusData(<?= $row['user_id']; ?>)" role="button">Delete</a>
                  </td>
               </tr>
            <?php endforeach; ?>
         </tbody>
      </table>

      <a class="btn btn-primary" href="<?= base_url('login/logout'); ?>" role="button">Logout</a>
   </div>

   <script>
      function hapusData(id) {
         message = confirm('are sure want to delete this data ?')

         if (message) {
            window.location.href = ("<?= base_url('user/delete'); ?>") + "/" + id
         } else return false
      }
   </script>

   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>
```

Kita menggunakan html untuk membuat viewnya. Pada kode diatas menggunakan framework `bootstrap` untuk menyusun halaman tersebut supaya lebih rapi. Lalu kita juga sudah menambahkan tombol / button `tambah data`, `edit`, `delete`, dan juga `logout`. Kemudian kita juga menambahkan fungsi pada kode javascriptnya untuk memunculkan dialog konfirmasi apabila tombol hapus di klik.

Bila kita perhatikan pada button tambah data terdapat `href="/user/tambahdata"` yang artinya apabila tombol tersebut di klik, maka akan mengarah pada controller `user` kemudian memanggil fungsi `tambahdata`. Fungsi `tambahdata` akan kita buat juga nantinya.

Lalu dibagian button `edit` ada atribut `href="/user/edit/<?= $row['user_id']; ?>"` yang artinya ketikan button edit di klik akan mengarah ke controller `user` dan memanggil fungsi `edit` dengan mambawa parameter `id` sesuai dengan data yang dipilih.

Kemudian pada kode ini

```javascript
<script>
      function hapusData(id) {
         message = confirm('are sure want to delete this data ?')

         if (message) {
            window.location.href = ("<?= base_url('user/delete'); ?>") + "/" + id
         } else return false
      }
   </script>
```

Terdapat fungsi `hapusData` dengan parameter id yang akan dikirm ke dalam button delete. Jika button delete di klik maka akan muncul dialog konfirmasi, jika OK di klik maka akan mengarah ke controller `user` method `delete` dan membawa parameter `id` sesuai data yang di pilih. Kemudian di atribut buttonnya di tambahkan `onclick="hapusData(<?= $row['user_id']; ?>)" ` untuk memanggil fungsi yang ada pada javascript tersebut.

### 4. Membuat halaman tambah data

Sama seperti sebelumnya kita akan membuat view untuk menampilkan form tambah data, kita juga menggunakan bootstrap disini. Oke tambahkan kode berikut ini.

```html
<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

   <title>Hello, world!</title>
</head>

<body>
   <div class="container">
      <h1>Tambah Data</h1>
      <form action="/user/save" method="POST">
         <div class="form-group">
            <input type="text" class="form-control" name="user_nama" placeholder="Nama">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" name="user_email" placeholder="Email">
         </div>
         <button class="btn btn-primary" type="submit">Save</button>
      </form>
   </div>

   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>
```

Bila diperhatikan atribut formnya yaitu `action="/user/save" method="POST"` artinya ketika tombol save di klik maka akan diarahkan dengan controller `user` dan memanggil fungsi `save` yang akan kita buat nanti dan juga menggunakan method `POST` untuk mengirim data.

### 5. Membuat halaman edit data

Sama seperti sebelumnya kita buat file di dalam folder `Views` untuk menampilkan view edit data, tambahkan kode berikut ini.

```html
<!doctype html>
<html lang="en">

<head>
   <!-- Required meta tags -->
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

   <!-- Bootstrap CSS -->
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

   <title>Hello, world!</title>
</head>

<body>
   <div class="container">
      <h1>Edit Data</h1>
      <form action="/user/updateData" method="POST">
         <div class="form-group">
            <input type="text" class="form-control" name="user_id" value="<?= $user->user_id; ?>" readonly>
         </div>
         <div class="form-group">
            <input type="text" class="form-control" name="user_nama" value="<?= $user->user_nama; ?>">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" name="user_email" value="<?= $user->user_email; ?>">
         </div>
         <button class="btn btn-primary" type="submit">Save</button>
      </form>
   </div>

   <!-- Optional JavaScript -->
   <!-- jQuery first, then Popper.js, then Bootstrap JS -->
   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
</body>

</html>
```

Terdapat atribut `action="/user/updateData" method="POST"` pada formnya yang mengarah ke controller `user` dan fungsi `updateData` yang akan kita buat, lalu untuk mengirim data kembali kita menggunakan method `POST`.

### 6. Membuat fungsi untuk menambah data pada model

Sekarang kita buka model yang sudah kita buat tadi yaitu `M_user`, kemudian disini kita akan membuat fungsi `saveUser` untuk menyimpan data user. Kita menggunakan query builder CI 4 seperti berikut, tambahkan kode ini.

```javascript
public function saveUser($data)
	{
		$query = $this->db->table($this->table)
			->insert($data);
		return $query;
	}
```

Artinya insert into table user dengan membawa parameter data yang akan di dapatkan dari controller nantinya.

### 7. Membuat fungsi untuk menghapus data pada model

Masih di dalam model `M_user` tambahkan fungsi untuk menghapus data berikut.

```javascript
public function deleteUser($id)
	{
		$query = $this->db->table($this->table)
			->delete(['user_id' => $id]);
		return $query;
	}
```

Artinya kita akan menghapus data tersebut bedasarkan parameter id yang dibawa dari controller.

### 8. Membuat fungsi untuk update data pada model

Kemudian tambahkan satu fungsi lagi di `M_user` untuk melakukan update data.

```javascript
public function updateUser($data, $id)
	{
		return $this->db->table('user')->update($data, ['user_id' => $id]);
	}
```

### 9. Membuat fungsi tambah data di controller user

Oke sekarang masuk ke dalam controller `User` kemudian tambahkan fungsi berikut.

```javascript
public function tambahdata()
   {
      echo view('view_tambah_data');
   }

   public function save()
   {
      $model = new M_user();
      $data = [
         'user_nama' => $this->request->getPost('user_nama'),
         'user_email' => $this->request->getPost('user_email')
      ];
      $model->saveUser($data);
      return redirect()->to('/user');
   }
```

Pada fungsi diatas kita arahkan dulu ke halaman view tambah data, kemudian apabila tombol save di klik, maka akan mengambil inputan dari form dan memanggil fungsi `saveUser` untuk menyimpan datanya ke database lalu di redirect lagi ke halaman user untuk menampilkan data tersebut.

### 10. Membuat fungsi delete

Masih di dalam controller, kita buat fungsi `delete` untuk menghapus data apabila tombol delete di klik pada halaman user yang tadi sudah kita arahkan ke method delete ini.

```javascript
public function delete($id)
   {
      $model = new M_user();
      $model->deleteUser($id);
      return redirect()->to('/user');
   }
```

### 11. Membuat fungsi edit dan update data

Kemudian kita buat fungsi lagi di dalam controller user untuk edit dan hapus data, tambahkan kode berikut.

```javascript
public function edit($id)
   {
      $model = new M_user();
      $data['user'] = $model->get_user($id)->getRow();
      return view('user_view_edit', $data);
   }

   public function updateData()
   {
      $model = new M_user();
      $id = $this->request->getPost('user_id');
      $data = [
         'user_nama' => $this->request->getPost('user_nama'),
         'user_email' => $this->request->getPost('user_email')
      ];
      $model->updateUser($data, $id);
      return redirect()->to('/user');
   }
```

Ketika tombol `edit` di klik pada halaman user maka akan mengarah ke halaman edit user dengan membawa parameter id, kemudian setelah data di update akan redirect kembali ke halaman user untuk menampilkan data.

### 12. Redirect dari login ke user

Terakhir kita akan redirect ke halaman user apabila berhasil login. Pada artikel sebelumnya yang sudah kita buat yaitu tentang login form, kita hanya tinggal mengganti viewnya saja ketika login berhasil.

```javascript
return redirect()->to(base_url('user'));
```

Kita bisa menggunakan kode diatas untuk masuk ke halaman user apabila berhasil login.

### 13. Hasil

Berikut tampilan atau hasil akhir dari kodingan diatas.

Login terlebih dahulu:

{{< figure src="/formloginci4/5.png" width="100%" >}}

Tampilan halaman user ketika berhasil login dan menampilkan data user:

{{< figure src="/formloginci4/6.png" width="100%" >}}

Ketika tombol tambah data di klik, akan mengarah ke halaman untuk menambah data user:

{{< figure src="/formloginci4/7.png" width="100%" >}}

Kembali ke halaman user setelah tombol save di klik dan menampilkan data termasuk yang sudah ditambahkan:

{{< figure src="/formloginci4/8.png" width="100%" >}}

Menampilkan dialog konfirmasi ketika tombol delete di klik untuk menghapus data:

{{< figure src="/formloginci4/9.png" width="100%" >}}

Menampilkan halaman edit data ketika tombol edit di klik dan melakukan edit data pada form:

{{< figure src="/formloginci4/10.png" width="100%" >}}

Tampilan ketika data sudah berhasil di edit:

{{< figure src="/formloginci4/11.png" width="100%" >}}

### Penutup

Sekian tutorial dokumentasi mengenai CRUD dengan CI 4, semoga bermanfaat.