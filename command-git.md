command git for this repo: 

## konfigurasi git : 
git --version

# tambah configurasi global utk username dan email 
git config --global user.name "<username anda>"
git config --global user.email <emailanda@gmail.com>

# cek daftar konfigurasi
git config --list

# outputnya 
user.email = emailanda@gmail
user.name = username-anda
(END)

## membuat repo local

# membuat repo "belajar-git" atau <namarepoanda>
git init belajar-git

# outputnya
Initialized empty Git repository in <path yg anda gunakan untuk git init>

# pindah direktori
cd belajar-git

# buat .gitignore file utk list file yang diabaikan (ini langkah opsional) 
nano .gitignore

# contoh isi, kemudian simpan (ini langkah opsional)
/vendor/
/upload/
/cache

# cek status git dengan perintah
git status

# outputnya
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        .gitignore

nothing added to commit but untracked files present (use "git add" to track)

## buat file, lalu isi filenya

# setelah file dimodifikasi, jalankan perintah berikut 
git add <fileanda>
git add latihan.php

# atau bisa dalam satu perintah 
git add latihan.php latihan2.php

# atau menandai semua file dgn extensi .php
git add *.php

# atau menandai semua file 
git add . 

# cek status
git status

#outputnya, kira2 akan seperti ini
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)

        new file:   .gitignore
        new file:   latihan1.php
        new file:   latihan2.php
		
		
## merubah kondisi file ke commited

# melakukan git commit
git commit -m "<pesan anda>"
git commit -m "commit pertama"

# outputnya kira2 begini 
[master (root-commit) dd0ad1a] Commit pertama
 3 files changed, 5 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 latihan1.php
 create mode 100644 latihan2.php
 
# cek git status
git status

# outputnya 
On branch master
nothing to commit, working tree clean

#cek log perubahan, buat melihat history peruabahan
git log

#output
commit f7e48c328a17c3b97d0034e38c62d67bb1b41b89 (HEAD -> master)
Author: najcardboyz <najcardboyz.03@gmail.com>
Date:   Tue Jan 22 11:07:07 2019 +0800

    Perubahan pada latihan1.php

commit dd0ad1a6f842f60d9325449cf592bc1ab4b885ad
Author: najcardboyz <najcardboyz.03@gmail.com>
Date:   Tue Jan 22 10:55:57 2019 +0800

    Commit pertama
(END)

#untuk versi singkat dapat ditambahkan argument --oneline
git log --oneline

#output
f7e48c3 (HEAD -> master) Perubahan pada latihan1.php
dd0ad1a Commit pertama
(END)

#cara-cara lain melihat log
#log ver version 
git log dd0ad1a6f842f60d9325449cf592bc1ab4b885ad

#log ver author
git log --author='najcardboyz'

#log branch dan namanya
git log --graph --oneline --decorate --all

# melihat perbedaan/perubahan file dgn git diff
#melihat log untuk mengambil nomor revisi
git log

#kemudian ambil nomor revisinya, dan git diff
git diff dd0ad1a6f842f60d9325449cf592bc1ab4b885ad f7e48c328a17c3b97d0034e38c62d67bb1b41b89

diff --git a/latihan1.php b/latihan1.php
index 24b7435..f721918 100644
--- a/latihan1.php
+++ b/latihan1.php
@@ -1 +1,2 @@
 Belajar Latihan 1
+ini perbaikan kedua


This PC\Redmi 8\Internal shared storage\DCIM\Camera

## catatan pake vi editor di git bash: 
ctrl + o --> buat masukin perintahnya 

# perintahnya : 
:w --> save file 
:q --> quit file
:q! --> quit file tanpa save 



