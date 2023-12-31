// Memanggil package prompt-sync untuk input dari pengguna
const prompt = require("prompt-sync")();
// Memanggil package fs untuk operasi file
const fs = require("fs");

// Membuat variabel keluarga untuk menyimpan data aplikasi dalam bentuk array
let keluarga = [];

// Function untuk menambahkan keluarga dengan dua parameter (namaKelurga & jenisKelamin)
function tambahKeluarga(namaKelurga, jenisKelamin) {
  // Memerika jenis kelamin adalah l/p
  if (jenisKelamin !== "l" && jenisKelamin !== "p") {
    console.log("Jenis kelamin tidak valid!");
    return;
  }
  // Mengubah jenis kelamin menjadi lebih jelas
  jenisKelamin = jenisKelamin == "l" ? "Laki-laki" : "Perempuan";
  // Menambahkan keluarga sesuai dengan parameter ke dalam array keluarga
  keluarga.push({ nama: namaKelurga, jenisKelamin: jenisKelamin, ayah: undefined, ibu: undefined, anak: [] });
  console.log("Keluarga berhasil ditambahkan!");
}

// Function untuk mencari keluarga berdasarkan nama keluarga
function cariKeluarga(namaKeluarga) {
  // Memeriksa apakah daftar keluarga kosong
  if (!keluarga.length) {
    console.log("Daftar keluarga tidak tersedia!");
    return;
  }
  // Mencari keluarga yang sesuai dengan namaKeluarga yang dimasukkan
  const keluargaDitemukan = keluarga.find((anggota) => anggota.nama.toLowerCase() === namaKeluarga.toLowerCase());
  // Memeriksa apakah daftar keluarga tidak ada
  if (!keluargaDitemukan) {
    console.log("Keluarga tidak ditemukan!");
    return;
  }
  console.log("Keluarga ditemukan!");
  console.log(`Nama Keluarga: ${keluargaDitemukan.nama}`);
  console.log(`Jenis Kelamin: ${keluargaDitemukan.jenisKelamin}`);
}

// Function untuk menghapus keluarga
function hapusKeluarga() {
  // Memeriksa apakah daftar keluarga kosong
  if (!keluarga.length) {
    console.log("Daftar keluarga tidak tersedia!");
    return;
  }
  // Menampilkan semua daftar keluarga yang tersedia
  console.log("Daftar keluarga Tersedia:");
  keluarga.forEach((anggota, index) => {
    console.log(`${index + 1}. ${anggota.nama}`);
  });
  // Meminta pengguna untuk memilih kategori yang akan dihapus
  const index = prompt(`Pilih keluarga yang akan dihapus [1-${keluarga.length}]: `) - 1;
  // Memerika apakah index dari keluarga ada dari array keluarga
  if (index >= 0 && index < keluarga.length) {
    // Menghapus keluarga yang dipilih dari array keluarga
    keluarga.splice(index, 1);
    console.log("Keluarga berhasil dihapus!");
    return;
  }
  console.log("Pilihan keluarga tidak valid!");
}

// Function untuk mengkaitkan anggota keluarga
function kaitkanKeluarga() {
  // Memeriksa apakah daftar keluarga kosong
  if (!keluarga.length) {
    console.log("Daftar keluarga tidak tersedia. Tambahkan keluarga terlebih dahulu!");
    return;
  }

  // Menampilkan daftar keluarga yang tersedia
  keluarga.forEach((anggota, index) => {
    console.log(`${index + 1}. ${anggota.nama}`);
  });

  // Mendapatkan keluarga sesuai dengan input user
  const parentIndex = prompt(`Pilih keluarga yang akan dikaitkan [1-${keluarga.length}]: `);

  // Menampilkan daftar keluarga yang tersedia
  keluarga.forEach((anggota, index) => {
    console.log(`${index + 1}. ${anggota.nama}`);
  });
  // Mendapatkan keluarga sesuai dengan input user
  const childIndex = prompt(`Pilih yang akan dikaitkan [1-${keluarga.length}]: `);

  // Memerika apakah index dari keluarga ada dari array keluarga
  if (parentIndex > 0 && parentIndex <= keluarga.length && childIndex > 0 && childIndex <= keluarga.length) {
    // Mendapatkan details keluarga sesuai dengan index
    const parentFamily = keluarga[parentIndex - 1];
    const childFamily = keluarga[childIndex - 1];
    // Mendapatkan hubungan antar anggota keluarga
    const relation = prompt(`${parentFamily.nama} dengan merupakan [ayah/ibu/anak] dari ${childFamily.nama}: `);
    // Mengubah hubungan menjadi hruf kecil
    const relationType = relation.toLowerCase();

    // Jika hubungan ayah atau ibu
    if (relationType === "ayah" || relationType === "ibu") {
      // Mengubah hubungan ayah dan ibu
      keluarga[childIndex - 1][relationType] = keluarga[parentIndex - 1].nama;
      keluarga[parentIndex - 1].anak.push(keluarga[childIndex - 1].nama);
      console.log("Keluarga berhasil dikaitkan!");
      return;
      // Jika hubungan anak
    } else if (relationType === "anak") {
      // Mengubah hubungan anak
      keluarga[parentIndex - 1].ayah = keluarga[childIndex - 1].nama;
      keluarga[childIndex - 1].anak.push(keluarga[parentIndex - 1].nama);
      // Mereset ibu jika ditetapkan sebagai anak
      keluarga[parentIndex - 1].ibu = undefined;
      console.log("Keluarga berhasil dikaitkan!");
      return;
    }
    // Jika hubungan selain anak, ayah dan ibu
    console.log("Hubungan keluarga tidak valid!");
  } else {
    console.log("Pilihan keluarga tidak valid!");
  }
}

// Function untuk mencari silsilah
function cariSilsilah() {
  // Memeriksa apakah daftar keluarga kosong
  if (!keluarga.length) {
    console.log("Daftar keluarga tidak tersedia!");
    return;
  }
  // Menampilkan daftar keluarga yang tersedia
  keluarga.forEach((fam, index) => console.log(`${index + 1}. ${fam.nama}`));
  // Meminta pengguna untuk memilih nama keluarga
  const familyIndex = prompt(`Pilih Keluarga yang akan dicari silsilahnya [1-${keluarga.length}]: `) - 1;
  // Memerika apakah index dari keluarga ada dari array keluarga
  if (familyIndex >= 0 && familyIndex < keluarga.length) {
    // Mendapatkan detail dari array keluarga sesuai dengan index
    const selectedFamily = keluarga[familyIndex];

    console.log(`Data leluhur dari ${selectedFamily.nama} adalah:`);
    console.log(`Ibu: ${selectedFamily?.ibu ?? "-"}`);
    console.log(`Ayah: ${selectedFamily?.ayah ?? "-"}`);

    const keluargaAyah = cariLeluhur(selectedFamily?.ayah);
    const keluargaKakek = cariLeluhur(keluargaAyah?.ayah);
    console.log(`Kakek: ${keluargaAyah?.ayah ?? "-"}`);
    console.log(`Nenek: ${keluargaAyah?.ibu ?? "-"}`);
    console.log(`Kakek Buyut: ${keluargaKakek?.ibu ?? "-"}`);
    console.log(`Nenek Buyut: ${keluargaKakek?.ibu ?? "-"}`);

    console.log(`Data keturunan dari ${selectedFamily.nama} adalah:`);
    // Mengecek apakah sudah memiliki anak atau belum
    const anak = selectedFamily.anak.length ? selectedFamily.anak.join(", ") : "-";
    console.log(`Anak: ${anak}`);
  } else {
    // Menampilkan output jika index dari keluarga tidak ada
    console.log("Pilihan keluarga tidak valid!");
  }
}

// Fungsi rekursif untuk mencari leluhur berdasarkan nama
function cariLeluhur(namaLeluhur) {
  // Jika namaLeluhur tidak ada maka megembalikan undefined
  if (!namaLeluhur) return undefined;
  // Mencari keluarga sesuai dengan nama leluhur
  return keluarga.find((fam) => fam.nama.toLowerCase() === namaLeluhur.toLowerCase());
}

// Function untuk menyimpan data keluarga ke dalam file JSON
function simpanDataKeluarga() {
  // Mendapatkan semua data aplikasi
  const data = {
    keluarga,
  };
  // Menyimpan data aplikasi ke dalam file data.json
  fs.writeFileSync("data.json", JSON.stringify(data));
  console.log("Data berhasil disimpan ke dalam file json!");
}

// Perulangan untuk menampilkan menu
// Meminta input pengguna hingga pengguna memilih untuk keluar (pilihan 6)
let pilihan = "";
while (pilihan !== "6") {
  console.log("\n======================");
  console.log("Program Pencatatan Silsilah Keluarga");
  console.log("======================");
  console.log("1. Tambah Keluarga");
  console.log("2. Cari Keluarga");
  console.log("3. Hapus Keluarga");
  console.log("4. Kaitkan Keluarga");
  console.log("5. Cari silsilah");
  console.log("6. Keluar");

  // Mendapatkan pilihan menu dari input user
  pilihan = prompt("Pilih Menu [1-6]: ");
  // Percabangan pilihan menu sesuai dengan input user
  switch (pilihan) {
    case "1":
      // Mendapatkan nama keluarga sesuai dengan input user
      const namaKelurga = prompt("Nama Keluarga: ");
      // Mendapatkan jenis keluarga sesuai dengan input user
      // Mengubah huruf dari input menjadi huruf kecil
      const jenisKelamin = prompt("Jenis Kelamin (l/p): ").toLowerCase();
      // Memangil & Memasukkan data input diatas ke dalam function
      tambahKeluarga(namaKelurga, jenisKelamin);
      break;
    case "2":
      // Mendapatkan nama keluarga sesuai dengan input user
      const namaKeluarga = prompt("Masukan nama keluarga: ");
      // Memangil & Memasukkan data input diatas ke dalam function
      cariKeluarga(namaKeluarga);
      break;
    case "3":
      // Memangil function hapusKeluarga
      hapusKeluarga();
      break;
    case "4":
      // Memangil function kaitkanKeluarga
      kaitkanKeluarga();
      break;
    case "5":
      // Memangil function cariSilsilah
      cariSilsilah();
      break;
    // Jika pilihan menu tidak sesuai dengan diatas
    default:
      // Jika pilihan menu tidak sama dengan 6
      // Maka akan muncul pilihan menu tidak valid dan mengulangi Program Pencatatan Silsilah Keluarga
      if (pilihan !== "6") {
        console.log("Pilihan menu tidak valid! Silakan pilih menu yang sesuai");
      }
      break;
  }
}
// Menyimpan data keluarga ke dalam file JSON saat user memilih keluar dari program
simpanDataKeluarga();
console.log("Terima kasih telah menggunakan program Program Pencatatan Silsilah Keluarga!");
