---
title: "Migrasi Ke Linux"
date: 2020-06-15T21:27:06+07:00
draft: false
categories: [Ubuntu, OS, Linux]
---

Selamat datang di dunia **Open Source**. Beberapa hari yang lalu saya memutuskan untuk beralih dari sistem operasi windows 10 ke ubuntu 20.04 LTS dengan alasan yang sangat simpel yaitu ingin belajar otak-atik pake terminal dan bisa bebas dari aplikasi crack / pak tani.

Awalnya semua berjalan mulus pas penginstalan, namun hari pertama pemakaian banyak menemui problem saat melakukan konfigurasi OS. Tentu ini hal yang sangat wajar dan sangat bagus bagi pemula seperti saya.

Inti dari tulisan ini sebenarnya hanya untuk menyimpan dokumentasi beberapa perintah yang saya lakukan untuk konfigurasi OS, mulai dari permission, install app, dll.

#### Mengganti permission pada partisi

```
$ lsblk
$ ls -la /media/fyn/FYN
$ id -gn
$ chown -R fyn:fyn /media/fyn/FYN
```

#### Install app

```
$ sudo apt-get install namaApp
```

#### Memberikan hak akses ke direktori

```
$ chmod 777 namaDirektori
```

#### Fix screen tearing / layar patah-patah (nvidia)

```
$ sudo gedit /etc/modprobe.d/nvidia-drm-nomodeset.conf
```

Isi filenya dengan kode dibawah lalu save.

```
options nvidia-drm modeset=1
```

Update intramfs

```
$ sudo update-initramfs -u
```

Reboot and cek.

```
$ sudo cat /sys/module/nvidia_drm/parameters/modeset
Output : Y
```

#### Install and Uninstall KDE

Btw kde ini adalah desktop environment punya kubuntu, nah kalo di ubuntu namanya gnome.

```
$ sudo apt-get install kde-full
$ sudo apt-get remove --auto-remove kde-full
$ sudo apt-get purge --auto-remove kde-full
```

#### Manajer tampilan

Ada 3 manajer tampilan yaitu `gdm3`, `sddm`, dan `lightdm`. Gunanya untuk mengatur tampilan manajer ketika user login.

Install:

```
$ sudo apt-get install gdm3 // (Gnome)
$ sudo apt-get install sddm
$ sudo apt-get install lightdm
```

Remove:

```
$ sudo apt-get remove gdm3
$ sudo apt-get remove sddm
$ sudo apt-get remove lightdm
```

Configure:

```
$ sudo dpkg-reconfigure gdm3
$ sudo dpkg-reconfigure sddm
$ sudo dpkg-reconfigure lightdm
```

#### Blank screen ketika booting dan pesan error
```
/dev/sda1: clean 106xxxxx files, 2344xxx/23xxx blocks
```

Masuk ke console **ctrl+alt+f2** dan ketik perintah:

```
$ systemctl restart gdm
```

#### Connect ke wifi lewat console

```
$ nmcli c up <SavedWifiConn>
```

#### Restart

```
$ reboot
```

Next bakal di update lagi apabila ada problem dan ilmu baru.