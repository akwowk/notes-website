# Notes Application Design System

## Overview

Notes adalah aplikasi catatan pribadi berbasis web yang dirancang sebagai personal knowledge base untuk menyimpan pembelajaran dari kampus, dokumentasi teknis, hasil riset pribadi, catatan pemrograman, serta referensi dari internet.

Fokus utama desain adalah:

* Readability First
* Minimal Cognitive Load
* Long-Term Knowledge Management
* Fast Access to Information
* Consistent User Experience

Inspirasi desain:

* Obsidian
* Notion
* Medium
* Linear

---

# Design Principles

## 1. Reading First

Konten adalah prioritas utama.

UI tidak boleh mengganggu proses membaca maupun menulis.

Setiap keputusan desain harus mendukung:

* Fokus membaca
* Fokus menulis
* Fokus mencari informasi

---

## 2. Simplicity

Hindari elemen visual yang tidak memiliki fungsi.

Jangan menggunakan:

* Gradien berlebihan
* Animasi kompleks
* Dekorasi yang tidak mendukung produktivitas

---

## 3. Consistency

Semua halaman harus menggunakan:

* Komponen yang sama
* Jarak yang sama
* Radius yang sama
* Warna yang sama

---

## 4. Academic and Professional

Tampilan harus cocok digunakan untuk:

* Catatan kampus
* Dokumentasi proyek
* Catatan pemrograman
* Catatan matematika
* Knowledge management pribadi

---

# Color System

Menggunakan pendekatan 60-30-10.

## Primary Color (60%)

Dominasi background utama.

```css
#F8FAFC
```

Penggunaan:

* Body background
* Main page background
* Reading area background

---

## Secondary Color (30%)

Surface dan struktur UI.

```css
#E2E8F0
```

Penggunaan:

* Sidebar
* Card
* Border
* Hover state
* Input background

---

## Accent & Text Color (10%)

Warna fokus dan identitas.

```css
#0F172A
```

Penggunaan:

* Headings
* Body text
* Icons
* Active menu
* Buttons
* Links

---

## Success

```css
#16A34A
```

---

## Warning

```css
#F59E0B
```

---

## Error

```css
#DC2626
```

---

# Typography

## Font Family

Primary:

```text
Inter
```

Fallback:

```text
system-ui
sans-serif
```

---

## Heading Scale

### H1

```css
48px
700
```

---

### H2

```css
36px
700
```

---

### H3

```css
30px
600
```

---

### H4

```css
24px
600
```

---

### H5

```css
20px
600
```

---

### H6

```css
18px
600
```

---

## Body Text

```css
16px
400
line-height: 1.8
```

---

## Reading Content

```css
18px
line-height: 1.9
max-width: 800px
```

---

# Spacing System

Menggunakan sistem 8px.

```text
xs  = 8px
sm  = 16px
md  = 24px
lg  = 32px
xl  = 48px
2xl = 64px
```

Semua margin dan padding harus mengikuti skala ini.

---

# Border Radius

## Small

```css
8px
```

## Medium

```css
12px
```

## Large

```css
16px
```

Standar aplikasi:

```css
12px
```

---

# Shadow System

## Card Shadow

```css
0 2px 8px rgba(0,0,0,0.05)
```

---

## Elevated Shadow

```css
0 8px 24px rgba(0,0,0,0.08)
```

---

# Layout Structure

## Desktop

```text
+-------------------------------+
| Top Navigation                |
+---------+---------------------+
| Sidebar | Main Content        |
|         |                     |
|         |                     |
+---------+---------------------+
```

---

## Mobile

```text
+-------------------+
| Top Navigation    |
+-------------------+
| Main Content      |
|                   |
+-------------------+
```

Sidebar berubah menjadi drawer.

---

# Navigation

## Sidebar Width

```css
280px
```

---

## Sidebar Items

* Dashboard
* Notes
* Tags
* Archive
* Settings

---

## Active State

Background:

```css
#0F172A
```

Text:

```css
#FFFFFF
```

---

# Button System

## Primary Button

Background:

```css
#0F172A
```

Text:

```css
#FFFFFF
```

Radius:

```css
12px
```

---

## Secondary Button

Background:

```css
#E2E8F0
```

Text:

```css
#0F172A
```

---

## Danger Button

Background:

```css
#DC2626
```

Text:

```css
#FFFFFF
```

---

# Card Design

Background:

```css
#FFFFFF
```

Radius:

```css
12px
```

Padding:

```css
24px
```

Shadow:

```css
0 2px 8px rgba(0,0,0,0.05)
```

---

# Form Design

## Input Field

Height:

```css
48px
```

Radius:

```css
12px
```

Border:

```css
1px solid #E2E8F0
```

---

## Textarea

Minimum height:

```css
160px
```

Radius:

```css
12px
```

---

# Notes Content Styling

Harus mendukung:

* Markdown
* Code Blocks
* Mathematical Formula
* Tables
* Blockquotes
* Lists

---

## Content Width

```css
max-width: 800px
```

---

## Code Block

Background:

```css
#0F172A
```

Text:

```css
#F8FAFC
```

Radius:

```css
12px
```

Padding:

```css
16px
```

---

## Blockquote

Border Left:

```css
4px solid #0F172A
```

Background:

```css
#E2E8F0
```

---

# Page Specifications

## Login

Tujuan:

Autentikasi admin.

Komponen:

* Logo
* App Name
* Email
* Password
* Login Button

---

## Dashboard

Tujuan:

Ringkasan sistem.

Komponen:

* Statistics Cards
* Recent Notes
* Quick Actions

---

## Notes

Tujuan:

Melihat seluruh catatan.

Komponen:

* Search
* Filter
* Sorting
* Notes Grid

---

## Read Note

Tujuan:

Pengalaman membaca terbaik.

Komponen:

* Title
* Metadata
* Tags
* Markdown Content

---

## Create Note

Tujuan:

Menulis catatan baru.

Komponen:

* Title
* Tags
* Markdown Editor
* Live Preview

---

## Edit Note

Tujuan:

Memperbarui catatan.

Komponen:

* Existing Data
* Auto Save
* Update Action

---

## Tags

Tujuan:

Manajemen kategori.

Komponen:

* Tag List
* Search
* Create Tag

---

## Archive

Tujuan:

Mengelola catatan lama.

Komponen:

* Timeline View
* Search
* Restore Action

---

## Settings

Tujuan:

Konfigurasi sistem.

Komponen:

* Profile
* Security
* Backup
* Appearance

---

# User Experience Goals

Pengguna harus dapat:

* Membaca catatan dengan nyaman selama berjam-jam.
* Menemukan informasi dalam hitungan detik.
* Menulis catatan tanpa gangguan visual.
* Mengelola knowledge base pribadi secara efisien.
* Merasakan pengalaman yang konsisten di seluruh aplikasi.

Desain harus terasa seperti perpustakaan digital pribadi yang dibangun untuk pembelajaran jangka panjang dan pengelolaan pengetahuan yang serius.
