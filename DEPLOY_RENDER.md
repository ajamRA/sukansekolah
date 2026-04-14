# Deploy Pantas (Render) - SUKANTARA SKKJ 2026

## Apa yang perlu buka selepas deploy
- `/pencatat` untuk tablet urusetia di padang
- `/tv` untuk TV/projektor di dewan
- `/score` juga boleh (redirect ke `/tv`)

## Step ringkas (5-8 minit)
1. Push folder ini ke GitHub repository.
2. Login [Render](https://render.com) > `New +` > `Blueprint`.
3. Pilih repo GitHub tadi (Render akan baca `render.yaml` automatik).
4. Klik `Apply` dan tunggu deploy siap.
5. Bila dapat URL public, uji:
   - `https://<app>.onrender.com/pencatat`
   - `https://<app>.onrender.com/tv`

## Nota penting hari kejohanan
- Pastikan tablet padang dan TV dewan guna internet yang sama stabil (WiFi/hotspot).
- Simpan satu telefon hotspot sebagai backup line.
- App simpan state markah semasa ke `state.json` semasa server berjalan.
- Jika servis free sleep lama, buka `/tv` 10-15 min awal untuk warm up.

## Ujian sebelum acara
1. Buka `/pencatat` di tablet, pilih rumah, tekan `2 MARKAH`.
2. Semak `/tv` update dalam 1-2 saat.
3. Ulang 2-3 kali untuk Merah/Biru/Hijau/Kuning.
