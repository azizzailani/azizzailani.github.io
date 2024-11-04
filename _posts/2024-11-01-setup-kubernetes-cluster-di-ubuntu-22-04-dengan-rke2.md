---
layout: post
title: "Setup Kubernetes Cluster Di Ubuntu 22.04 Dengan RKE2"
date: 2024-11-01
categories: [Kubernetes, DevOps]
tags: [Kubernetes, RKE2, Ubuntu, Cluster, Setup]
author: Abdul Aziz Zailani
---

## Mengapa Memilih RKE2?

RKE2, atau Rancher Kubernetes Engine 2, adalah solusi Kubernetes yang aman dan handal, dirancang khusus untuk lingkungan produksi. RKE2 menyederhanakan instalasi dan konfigurasi Kubernetes, serta menambahkan fitur keamanan dengan sertifikasi FIPS (Federal Information Processing Standards).

### Mengapa RKE2 Bukan RKE1?

RKE2 adalah penerus RKE1 dan dirancang untuk menjawab kebutuhan modern dari infrastruktur Kubernetes dengan keamanan dan stabilitas lebih tinggi. Beberapa alasan memilih RKE2 dibandingkan RKE1 meliputi:

- **Dukungan FIPS**: RKE2 mendukung sertifikasi FIPS, yang sangat penting untuk memenuhi standar keamanan dalam lingkungan produksi, khususnya untuk industri yang memerlukan kepatuhan keamanan ketat.
- **Konsistensi dengan Upstream Kubernetes**: RKE2 lebih konsisten dengan rilis upstream Kubernetes, menjadikan proses upgrade dan patching lebih efisien.
- **Optimasi untuk Cluster Skala Besar**: Dibandingkan dengan RKE1, RKE2 lebih baik dalam menangani cluster dengan skala besar, serta didesain agar lebih fleksibel untuk integrasi dengan layanan-layanan cloud dan alat-alat keamanan terbaru.
- **Modularitas & Extensibilitas**: RKE2 memberikan opsi untuk menambah atau mengurangi komponen-komponen non-esensial, memberikan Anda fleksibilitas yang lebih besar dalam memilih komponen yang dibutuhkan untuk menjalankan cluster.
- **Keamanan yang Ditingkatkan**: Selain sertifikasi FIPS, RKE2 juga dilengkapi dengan beberapa fitur keamanan tambahan, seperti enkripsi data secara default pada level datastore dan penerapan standar keamanan yang lebih ketat.

Dengan semua kelebihan tersebut, RKE2 adalah pilihan ideal untuk pengaturan Kubernetes di lingkungan produksi dengan kebutuhan keamanan dan skalabilitas yang tinggi, dari pengembangan hingga operasional.

## Prasyarat: Persiapan Awal

Pastikan Anda memiliki dua node Ubuntu 22.04:

- **Node Server (Control Plane)**
- **Node Worker**

### Langkah Awal

Pastikan keduanya dapat diakses dengan hak akses root. Perbarui kedua node menggunakan perintah berikut:

```bash
sudo apt update && sudo apt upgrade -y
```

Pastikan juga kedua node memiliki jaringan yang stabil dan dapat terhubung satu sama lain.

---

## Langkah 1: Instalasi RKE2 di Server (Control Plane)

Di node server (control plane), unduh dan instal RKE2:

```bash
curl -sfL https://get.rke2.io | sudo sh -
```

Aktifkan layanan `rke2-server` agar RKE2 dapat berjalan sebagai control plane Kubernetes:

```bash
sudo systemctl enable rke2-server.service
sudo systemctl start rke2-server.service
```

Tambahkan PATH dari RKE2 agar mempermudah akses `kubectl`:

```bash
export PATH=$PATH:/var/lib/rancher/rke2/bin
echo 'export PATH=$PATH:/var/lib/rancher/rke2/bin' >> ~/.bashrc
```

Cek status layanan dengan:

```bash
sudo systemctl status rke2-server.service
```

Verifikasi status cluster:

```bash
kubectl get nodes
```

---

## Langkah 2: Menambahkan Worker Node ke Cluster

1. **Ambil Token dari Control Plane**  
   Di node server control plane, ambil token node dengan:

   ```bash
   cat /var/lib/rancher/rke2/server/node-token
   ```

2. **Instal RKE2 di Worker Node**  
   Di node worker, instal RKE2 sebagai `agent`:

   ```bash
   curl -sfL https://get.rke2.io | sudo INSTALL_RKE2_TYPE="agent" sh -
   ```

3. **Konfigurasi Worker untuk Bergabung ke Control Plane**  
   Buat file konfigurasi `/etc/rancher/rke2/config.yaml` di node worker:

   ```yaml
   server: https://<Control_Plane_IP>:9345
   token: "<node-token>"
   ```

   Gantilah `<Control_Plane_IP>` dengan IP dari server control plane (dapat diperoleh dengan `hostname -I`), dan `<node-token>` dengan token yang Anda dapatkan sebelumnya.

4. **Jalankan dan Aktifkan RKE2 Agent**  
   Setelah konfigurasi, jalankan layanan `rke2-agent` di node worker:
   ```bash
   sudo systemctl enable rke2-agent.service
   sudo systemctl start rke2-agent.service
   ```

---

## Langkah 3: Verifikasi Cluster Kubernetes

Kembali ke node server (control plane) dan verifikasi bahwa worker node berhasil bergabung dengan cluster:

```bash
kubectl get nodes -o wide
```

Anda akan melihat daftar node termasuk control plane dan worker node dengan status `Ready`, yang menandakan bahwa cluster Kubernetes berhasil dikonfigurasi menggunakan RKE2.

## Menjalankan Aplikasi Pertama di Cluster

Sebagai contoh, jalankan aplikasi `nginx` di cluster:

```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --type=NodePort --port=80
```

Periksa status service `nginx`:

```bash
kubectl get svc
```

Anda dapat mengakses aplikasi `nginx` menggunakan alamat IP node dan port yang diberikan oleh NodePort.

---

Selamat! Anda telah berhasil membuat Kubernetes cluster yang aman dan siap untuk produksi menggunakan RKE2 di Ubuntu 22.04.
