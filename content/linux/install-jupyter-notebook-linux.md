---
title: "Install Jupyter Notebook Di Linux Ubuntu"
slug: "jupyter-notebook"
description: "Cara menginstall jupyter notebook di linux ubuntu melalui terminal"
date: 2020-06-21T13:09:50+07:00
draft: false
categories: [linux, ubuntu]
---

### Install jupyter nootebook di ubuntu

Saat ini saya menggunakan ubuntu 20.04 LTS

1. Buka terminal

2. Kemudian masuk ke directory Downloads dan ketikkan perintah berikut :

```txt
username@ubuntu:~$ cd Downloads
username@ubuntu:~/Downloads$ wget https://repo.anaconda.com/archive/Anaconda3-2019.07-Linux-x86_64.sh
```

3. Install Anaconda dengan perintah :

```txt
username@ubuntu:~/Downloads$ ﻿bash ./Anaconda3-2019.07-Linux-x86_64.sh
```

4. Tekan `Enter` untuk membaca lisensi persetujuan. Gunakan `Space` untuk lanjut ke halaman berikutnya.

```txt
Welcome to Anaconda3 2019.07

In order to continue the installation process, please review the license agreement.
Please, press ENTER to continue
```

5. Tulis `yes` untuk menyetujui terms

```txt
Do you approve the license terms? [yes|no]
[no] >>> yes
```

6. Tekan `Enter` untuk melanjutkan installasi anaconda, lokasinya biarkan default atau bisa di custom

```txt
Anaconda will now be installed into this location:
/home/username/anaconda3

- Press ENTER to confirm the location
- Press CTRL-C to abort the installation
- Or specify an different location below
[/home/username/anaconda3] >>> 
```

7. Ketikkan `yes` untuk update PATH

```txt
installation finished.
Do you wish the installer to initialize Anaconda3
by running conda init? [yes|no]
[no] >>> yes

==> For changes to take effect, close and re-open your current shell. <==

If you'd prefer that conda's base environment not be activated on startup, set the auto_activate_base parameter to false:

conda config --set auto_activate_base false

Thank you for installing Anaconda!
```

8. Tutup dan buka kembali terminal

9. ketikkan perintah berikut untuk mengecek apakah sudah terinstall

```txt
(base) username@ubuntu:~$ python --version
Python 3.7.3
```

10. Ketikkan perintah berikut untuk update anaconda :

```txt
(base) username@ubuntu:~$ conda update --all --yes
```

### Membuka dan menjalankan jupyter notebook

Untuk membuka dan menjalankan jupyter notebook, maka ketikkan perintah berikut :

```txt
username@ubuntu:~$ jupyter notebook
```