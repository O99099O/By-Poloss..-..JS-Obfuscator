#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const inputFile = process.argv[2];

if (!inputFile || !fs.existsSync(inputFile)) {
    console.error("Usage: node jobf-nuclear.js <file.js>");
    process.exit(1);
}

const sourceCode = fs.readFileSync(inputFile, 'utf8');

console.log("☢️  MEMULAI PROSES NUKLIR (LAYER 1)...");
console.log("   -> Menghancurkan struktur logika & transformasi angka...");

// ==========================================
// LAYER 1: LOGIC CRUSHER
// ==========================================
const pass1Result = JavaScriptObfuscator.obfuscate(sourceCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 2, // Lebih pendek lebih menyakitkan
    stringArray: true,
    stringArrayThreshold: 1,
    identifierNamesGenerator: 'mangled',
});

console.log("🔒 LAYER 2: ENKRIPSI VISUAL & TRAP...");
// ==========================================
// LAYER 2: HEX & ANTI-DEBUG
// ==========================================
const pass2Result = JavaScriptObfuscator.obfuscate(pass1Result.getObfuscatedCode(), {
    compact: true,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 2000, // Lebih agresif
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: ['rc4', 'base64'],
    stringArrayThreshold: 1,
    stringArrayWrappersCount: 5,
    unicodeEscapeSequence: true,
    target: 'node'
});

console.log("🎭 LAYER 3: THE ILLUSION LAYER (Poloss Custom)...");
// ==========================================
// LAYER 3: CUSTOM "POLOSS" WRAPPER
// ==========================================
// Layer ini membungkus kode asli di dalam lautan fungsi sampah 
// yang terlihat identik secara visual.
function applyIllusionLayer(code) {
    const dummyFunctionName = "Poloss";
    const garbageCount = 200; // Jumlah fungsi sampah
    
    let garbageFunctions = "";
    for (let i = 0; i < garbageCount; i++) {
        // Membuat variasi fungsi kosong yang terlihat sama
        garbageFunctions += `function ${dummyFunctionName}${i}(){if(false){return 'empty'}} `;
        garbageFunctions += `var _0x${i.toString(16)} = ${dummyFunctionName}${i}; `;
    }

    // Membungkus kode asli ke dalam IIFE (Immediately Invoked Function Expression)
    // Lalu menyisipkan ribuan panggilan ke "Poloss"
    const finalWrapper = `
    (function(){
        ${garbageFunctions}
        function mainCore(){
            ${code}
        }
        try {
            // Memanggil ribuan 'Poloss' sebelum eksekusi asli
            ${Array(50).fill(`${dummyFunctionName}1();`).join('')}
            mainCore();
        } catch(e) {}
    })();`;
    
    return finalWrapper;
}

const finalCode = applyIllusionLayer(pass2Result.getObfuscatedCode());

// Final touch: Compact ulang agar Layer 3 menyatu tanpa spasi
const ultimateResult = JavaScriptObfuscator.obfuscate(finalCode, {
    compact: true,
    simplify: true
}).getObfuscatedCode();

const outputFileName = path.basename(inputFile, '.js') + '.nuclear.js';
fs.writeFileSync(outputFileName, ultimateResult);

console.log("💀 NUKLIR SELESAI! File tersimpan sebagai:", outputFileName);
console.log("   Status: SANGAT BERBAHAYA UNTUK DIBACA.");
