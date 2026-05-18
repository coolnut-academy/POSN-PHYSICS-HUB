const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Update index.html mock-feedback-mistake container
indexHtml = indexHtml.replace(
    '<div class="bg-red-900/20 p-4 rounded border border-red-500/30">\n                        <h4 class="font-bold text-red-400 mb-2">⚠️ ข้อควรระวัง (จุดที่มักพลาด)</h4>',
    '<div id="mock-feedback-mistake-container" class="bg-red-900/20 p-4 rounded border border-red-500/30">\n                        <h4 class="font-bold text-red-400 mb-2">⚠️ ข้อควรระวัง (จุดที่มักพลาด)</h4>'
);
fs.writeFileSync(indexHtmlPath, indexHtml);

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Update renderTheoryList
appJs = appJs.replace(
    '<p><strong>A:</strong> ${t.example.ans}</p>',
    '<div>${t.example.solution ? renderDetailedSolution(t.example.solution) : t.example.ans}</div>'
);

// Update checkMockAnswer
appJs = appJs.replace(
    "document.getElementById('mock-feedback-solution').innerHTML = q.detailedSolution;",
    "document.getElementById('mock-feedback-solution').innerHTML = q.solution ? renderDetailedSolution(q.solution) : q.detailedSolution;"
);

appJs = appJs.replace(
    "document.getElementById('mock-feedback-mistake').innerHTML = q.commonMistake;",
    `const mistakeContainer = document.getElementById('mock-feedback-mistake-container');
    if (q.solution) {
        if(mistakeContainer) mistakeContainer.classList.add('hidden');
    } else {
        if(mistakeContainer) mistakeContainer.classList.remove('hidden');
        document.getElementById('mock-feedback-mistake').innerHTML = q.commonMistake;
    }`
);

// Insert renderDetailedSolution before loadProgress
const rendererCode = `
// --- 4.5. DETAILED SOLUTION RENDERER ---
function renderDetailedSolution(sol) {
    if (typeof sol === 'string') return sol;

    let html = '<div class="space-y-4 mt-4 text-sm sm:text-base">';

    if (sol.problemReading) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors">
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">📝 Step 1: วิเคราะห์โจทย์และแปลความหมาย</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300 space-y-2 leading-relaxed">
                \${sol.problemReading}
            </div>
        </details>\`;
    }

    if (sol.diagramInstruction || sol.variables) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors">
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">🎨 Step 2: วาดภาพและกำหนดตัวแปร</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300 space-y-4">
                \${sol.diagramInstruction ? \`<div class="bg-black/40 p-4 rounded-xl text-center flex justify-center">\${sol.diagramInstruction}</div>\` : ''}
                \${sol.variables ? \`
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[300px]">
                        <thead><tr class="border-b border-gray-600 text-cyan"><th class="pb-2">ตัวแปร</th><th class="pb-2">ความหมาย</th><th class="pb-2">บทบาท</th></tr></thead>
                        <tbody>
                            \${sol.variables.map(v => \`<tr class="border-b border-gray-700/50"><td class="py-2 text-violet font-bold">\\\\(\${v.symbol}\\\\)</td><td class="py-2">\${v.meaning} \${v.unit ? \`<span class="text-gray-500">(\${v.unit})</span>\` : ''}</td><td class="py-2 text-xs text-gray-400">\${v.role === 'given' ? 'โจทย์กำหนด' : v.role === 'unknown' ? 'ต้องการหา' : 'ค่าคงที่'}</td></tr>\`).join('')}
                        </tbody>
                    </table>
                </div>\` : ''}
            </div>
        </details>\`;
    }

    if (sol.principle) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors">
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">⚖️ Step 3: เลือกหลักการฟิสิกส์</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300">
                <p><strong class="text-cyan text-lg">\${sol.principle.name}</strong></p>
                <p class="mt-2 leading-relaxed">\${sol.principle.reason}</p>
            </div>
        </details>\`;
    }

    if (sol.equations) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors" open>
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">📌 Step 4: สร้างสมการตั้งต้น</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300 space-y-3">
                \${sol.equations.map(e => \`
                <div class="bg-black/40 p-4 rounded-lg border border-gray-700/50">
                    <div class="text-center text-xl mb-3 text-white overflow-x-auto overflow-y-hidden pb-2">\${e.line}</div>
                    <p class="text-sm text-gray-400 text-center">\${e.explanation}</p>
                </div>\`).join('')}
            </div>
        </details>\`;
    }

    if (sol.derivationSteps) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors" open>
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">🧮 Step 5: แก้สมการทีละขั้น</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300 space-y-4">
                \${sol.derivationSteps.map((s, i) => \`
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 bg-black/20 p-3 rounded-lg border-l-2 border-cyan/50">
                    <div class="sm:w-1/2 text-center sm:text-right text-white overflow-x-auto overflow-y-hidden">
                        \${s.line}
                    </div>
                    <div class="sm:w-1/2 text-sm text-gray-400 border-t sm:border-t-0 sm:border-l border-gray-700 pt-2 sm:pt-0 sm:pl-4">
                        \${s.explanation}
                    </div>
                </div>\`).join('')}
            </div>
        </details>\`;
    }

    if (sol.finalAnswer) {
        html += \`
        <details class="bg-navy/40 border border-cyan/50 rounded-lg open:bg-navy/60 transition-colors" open>
            <summary class="p-3 font-bold text-cyan cursor-pointer outline-none">🏁 Step 6: คำตอบสุดท้าย</summary>
            <div class="p-6 border-t border-cyan/20 flex flex-col items-center">
                <div class="bg-gradient-to-r from-cyan/20 to-violet/20 border-2 border-cyan px-8 py-4 rounded-xl text-2xl sm:text-3xl font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] overflow-x-auto max-w-full">
                    \${sol.finalAnswer}
                </div>
            </div>
        </details>\`;
    }

    if (sol.answerCheck) {
        html += \`
        <details class="bg-navy/40 border border-violet/30 rounded-lg open:bg-navy/60 transition-colors">
            <summary class="p-3 font-bold text-violet cursor-pointer outline-none">🔍 Step 7: ตรวจคำตอบ</summary>
            <div class="p-4 border-t border-violet/20 text-gray-300 leading-relaxed">
                \${sol.answerCheck}
            </div>
        </details>\`;
    }

    if (sol.commonMistakes || sol.recap) {
        html += \`
        <details class="bg-red-900/10 border border-red-500/30 rounded-lg open:bg-red-900/20 transition-colors" open>
            <summary class="p-3 font-bold text-red-400 cursor-pointer outline-none">⚠️ Step 8: จุดที่มักพลาด & สรุปทริค</summary>
            <div class="p-4 border-t border-red-500/20 text-gray-300 space-y-5">
                \${sol.commonMistakes ? \`
                <div class="bg-red-900/30 p-4 rounded-lg border border-red-500/30">
                    <h5 class="text-red-300 font-bold mb-3 flex items-center gap-2"><span>❌</span> จุดที่นักเรียนมักจะพลาด:</h5>
                    <ul class="list-disc pl-5 text-red-200/90 space-y-2">
                        \${sol.commonMistakes.map(m => \`<li>\${m}</li>\`).join('')}
                    </ul>
                </div>\` : ''}
                \${sol.recap ? \`
                <div class="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                    <h5 class="text-green-300 font-bold mb-3 flex items-center gap-2"><span>💡</span> Mini Recap เก็บแต้ม:</h5>
                    <ul class="list-decimal pl-5 text-green-200/90 space-y-2 font-medium">
                        \${sol.recap.map(r => \`<li>\${r}</li>\`).join('')}
                    </ul>
                </div>\` : ''}
            </div>
        </details>\`;
    }

    html += '</div>';
    return html;
}

function loadProgress()`;

appJs = appJs.replace('function loadProgress()', rendererCode);

fs.writeFileSync(appJsPath, appJs);
console.log('UI update successful!');
