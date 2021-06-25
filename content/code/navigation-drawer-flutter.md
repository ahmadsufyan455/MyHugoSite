---
title: "Navigation Drawer Flutter"
slug: "navigation-drawer-flutter"
date: 2021-06-25T18:05:53+07:00
draft: false
---

Di flutter kita bisa berpindah screen atau halaman menggunakan navigator. Untuk penerapan navigator ada berbagai cara, salah satunya yang akan kita terapkan pada tutorial kali ini adalah menggunakan navigation drawer. Oke gak usah lama-lama lagi, let's cekidot...

Seperti biasa buatlah project flutternya terlebih dahulu kemudian hapus kode starter bawaan dari flutter dan ganti dengan kode berikut ini.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Navigation Basics',
    home: FirstRoute(),
  ));
}

class FirstRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Route'),
      ),
    );
  }
}
```
Kemudian buatlah folder baru dengan klik kanan pada folder lib kemudian new folder, beri nama page. Lalu buatlah tiga file dart baru pada folder page dan berikan nama *item1.dart*, *item2.dart*, dan *item3.dart* kemudian isi dengan kode berikut.

```dart
import 'package:flutter/material.dart';

class Item1 extends StatelessWidget {
  const Item1({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Item 1'),
          leading: IconButton(
              onPressed: () {
                Navigator.pop(context);
              },
              icon: Icon(Icons.arrow_back)),
        ),
        body: Container(
          color: Colors.red,
        ),
      ),
    );
  }
}
```

Sesuaikan judul dan warna container pada tiap-tiap item.

Oke, setelah itu buatlah objek drawer pada scaffold yang ada di *main.dart* atau halaman utama seperti berikut.

```dart
drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
                decoration: BoxDecoration(color: Colors.blue),
                child: Text('Drawer Header')),
            ListTile(
              title: Text('Item 1'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item1()));
              },
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item2()));
              },
            ),
            ListTile(
              title: Text('Item 3'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item3()));
              },
            ),
          ],
        ),
      ),
```

Untuk navigasi kita menggunakan fungsi Navigator.push yang bisa dilihat pada tiap-tiap onTap pada ListTile dan navigasi tersebut mengarah ke screen yang sudah kita buat tadi.

Perhatikan juga ketika kita menulis nama file diluar file main.dart maka kita wajib untuk mengimport file tersebut pada main.dart supaya tidak terjadi error.

```dart
import 'package:navigation_drawer/page/item1.dart';
import 'package:navigation_drawer/page/item2.dart';
import 'package:navigation_drawer/page/item3.dart';
```

Sehingga keseluruhan kode pada main.dart menjadi seperti ini.

```dart
import 'package:flutter/material.dart';
import 'package:navigation_drawer/page/item1.dart';
import 'package:navigation_drawer/page/item2.dart';
import 'package:navigation_drawer/page/item3.dart';

void main() {
  runApp(MaterialApp(
    title: 'Navigation Basics',
    home: FirstRoute(),
  ));
}

class FirstRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Route'),
      ),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
                decoration: BoxDecoration(color: Colors.blue),
                child: Text('Drawer Header')),
            ListTile(
              title: Text('Item 1'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item1()));
              },
            ),
            ListTile(
              title: Text('Item 2'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item2()));
              },
            ),
            ListTile(
              title: Text('Item 3'),
              onTap: () {
                // update state
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Item3()));
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

Terakhir, run kodenya untuk melihat hasilnya.