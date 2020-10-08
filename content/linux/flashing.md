---
title: "Flash Hp Xiaomi Menggunakan Linux"
slug: "flashing"
date: 2020-10-09T05:46:31+07:00
draft: false
---

Kalau biasanya kita menggunakan Mi Flash di windows untuk melakukan flashing pada hp xiaomi, maka di linux pun kita juga bisa melakukan flashing bahkan secara mudah dan jauh lebih cepat dengan perintah-perintah pada terminal. Cara ini menurut saya berlaku untuk semua jenis hp xiaomi yang ingin di flash/install ulang. Oke langsung saja berikut langkah-langkahnya.

1. Download dan persiapkan ROM fastboot yang akan digunakan untuk flash dan sesuaikan dengan jenis Hp masing-masing (format ROM .tgz).
2. Ekstrak ROM fastboot .tgz tersebut menggunakan archive atau bisa menggunakan perintah `tar -zxvf nama-rom-fastboot-yg-sesuai-ponsel.tgz` pada terminal.
3. Jangan lupa install tools pendukung yaitu adb fastboot dengan perintah `sudo apt-get install android-tools-adb android-tools-fastboot`.
4. Masuk ke setting -> about phone -> tekan 5x pada MIUI version untuk menghidupkan mode pengembang.
5. Masuk ke setting -> additional setting -> developer options -> centang usb debugging.
6. Masuk ke mode fastboot dengan menekan tombol power + volume bawah atau dengan perintah `sudo adb reboot-bootloader`
7. Hubungkan ponsel dengan dengan laptop menggunakan kabel data dan pastikan sudah terhubung dengan baik dengan perintah `sudo fastboot devices`
8. Masuk ke direktori ROM fastboot yang sudah di ekstrak.
9. Langsung eksekusi dengan perintah `sudo sh flash_all.sh`

Tunggu hingga proses instalasi selesai, biasanya akan memakan waktu sekitar 6-10 menit. Oiya disini saya menggunakan ubuntu dan hp yang saya flash adalah redmi 5a. Sangat mudah dan simpel untuk melakukan flashing menggunakan linux.
