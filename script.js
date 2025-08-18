(function(){
  // flag asli
  const flag = "ptz{js_crypt0_rev3rsal_1s_asy1k}";

  // step 1: convert ke base64
  let step1 = btoa(flag);

  // step 2: XOR tiap char sama kunci
  let key = 23;
  let step2 = step1.split("").map(c => 
    String.fromCharCode(c.charCodeAt(0) ^ key)
  ).join("");

  // step 3: reverse string
  let final = step2.split("").reverse().join("");

  // simpan hasil di console biar attacker harus buka DevTools
  console.log("Encrypted my pesan:", final);

  // clue buat player
  document.body.innerHTML += `<p>Pesan rahasia sudah terenkripsi. Cari di <code>console</code> kalau mau curi-curi lihat 😏</p>`;
})();
