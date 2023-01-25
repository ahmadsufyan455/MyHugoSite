---
title: "Handle Connectivity In Android"
slug: ""
date: 2023-01-25T18:57:47+07:00
draft: false
---

Firt of all we need to create extension function for connectivity.

```java
fun Context.getConnectivity(): NetworkCapabilities? {
    val cm = getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        cm.getNetworkCapabilities(cm.activeNetwork)
    } else {
        TODO("VERSION.SDK_INT < M")
    }
}
```

then we can call extension function that we have made into activity/fragment that will use it.

```java
val connectivity = this.getConnectivity()
```

after that we can use that to check connectivity before display the data.

```java
if (connectivity != null) {
        if (connectivity.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
            setupData()
        }
        if (connectivity.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
            setupData()
        }
    } else {
        Toast.makeText(this, "No internet connection", Toast.LENGTH_SHORT).show()
}
```

that's all.
