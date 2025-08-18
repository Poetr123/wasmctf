// main.js - jan diubah biar asik wkwk
(async () => {
  function hexToBytes(hex) {
    const out = [];
    for (let i = 0; i < hex.length; i += 2) out.push(parseInt(hex.substr(i,2),16));
    return out;
  }
  function xorWithKey(bytes, key) {
    const out = [];
    for (let i=0;i<bytes.length;i++) out.push(bytes[i] ^ key[i % key.length]);
    return out;
  }
  function bytesToString(bytes) {
    return String.fromCharCode(...bytes);
  }

  // ambil hex dari halaman
  const cipherHex = document.getElementById("cipher").textContent.trim();

  // load wasm
  let wasmExports = null;
  try {
    const resp = await fetch("checker.wasm");
    const buf = await resp.arrayBuffer();
    const mod = await WebAssembly.instantiate(buf, {});
    wasmExports = mod.instance.exports;
  } catch (e) {
    document.getElementById("result").innerText = "Gagal load WASM — cek network / file checker.wasm";
    console.error(e);
    return;
  }

  // baca key dari WASM (ekspor: get_key_len, get_key_byte)
  const klen = wasmExports.get_key_len();
  const key = [];
  for (let i=0;i<klen;i++) key.push(wasmExports.get_key_byte(i));

  // decode ciphertext ke plaintext (tetap TIDAK menampilkannya)
  const cipherBytes = hexToBytes(cipherHex);
  const plainBytes = xorWithKey(cipherBytes, key);
  const plaintext = bytesToString(plainBytes);

  // tampilkan info seadanya
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `Payload panjang ${plainBytes.length} byte. Tebak flagnya, jangan curi sinyal tetangga.`;

  // hook check button
  document.getElementById("check").addEventListener("click", () => {
    const guess = document.getElementById("guess").value.trim();
    if (!guess) return;
    if (guess === plaintext) {
      resultEl.innerHTML = `<strong style="color:#9fffa3">Yeay! Bener. Flag = ${guess}</strong>`;
    } else {
      resultEl.innerHTML = `<span style="color:#ff9f9f">Salah coy. Coba dibongkar WASM-nya dulu.</span>`;
    }
  });

  // sedikit petunjuk lucu di console (biar yang suka buka console nggak bete)
  console.log("Hey, pembongkar WASM! Kalo kamu lagi rajin: download checker.wasm -> wasm2wat -> lihat data segmen. Ceile.");
})();
