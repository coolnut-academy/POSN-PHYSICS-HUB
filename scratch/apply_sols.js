const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

const { projSol, elasticEqualSol, springCollisionSol } = require('./injections.json');

// Inject projSol into topicsData
appJs = appJs.replace(
    /example: {\s*q: 'ยิงวัตถุด้วยความเร็ว.*?},\s*ans: '.*?'\s*}/s,
    `example: {
            q: 'ยิงวัตถุด้วยความเร็ว \\\\( u \\\\) ทำมุม \\\\( \\\\theta \\\\) กับแนวระดับ จงหาความสูงสูงสุด',
            solution: ${projSol}
        }`
);

// We need to carefully replace the detailedSolution of questionBank items.
// ID 1: Projectile (we can just leave it as is or update it later)
// ID 2: Elastic collision. Let's update ID 2 completely.
appJs = appJs.replace(
    /{ id: 2, topic: 'mechanics', type: 'formula',\s*prompt: 'มวล \$M\$ เคลื่อนที่ด้วยความเร็ว \$u\$.*?commonMistake: '.*?' },/s,
    `{ id: 2, topic: 'mechanics', type: 'formula',
      prompt: 'มวล $m$ เคลื่อนที่ด้วยความเร็ว $u$ เข้าชนมวล $m$ อีกก้อนที่อยู่นิ่งแบบยืดหยุ่นสมบูรณ์ ความเร็วของมวลก้อนแรกและก้อนที่สองหลังชนคือเท่าใดตามลำดับ',
      correctAnswer: '0, u', answerLatex: 'v_1 = 0, v_2 = u',
      solution: ${elasticEqualSol} },`
);

// ID 3: Spring collision
appJs = appJs.replace(
    /{ id: 3, topic: 'mechanics', type: 'numeric',\s*prompt: 'มวล \$m\$ เคลื่อนที่มาด้วยความเร็ว.*?, answerLatex: 'v\/2',\s*detailedSolution: '.*?',\s*commonMistake: '.*?' },/s,
    `{ id: 3, topic: 'mechanics', type: 'numeric',
      prompt: 'มวล $m$ เคลื่อนที่มาด้วยความเร็ว $v$ เข้าชนมวล $m$ อีกก้อนที่อยู่นิ่งซึ่งติดกับสปริง (ไม่คิดแรงเสียดทาน) ขณะที่สปริงหดตัวมากที่สุด มวลทั้งสองจะมีความเร็วเท่าใด',
      correctAnswer: 'v/2', answerLatex: 'v/2',
      solution: ${springCollisionSol} },`
);

fs.writeFileSync(appJsPath, appJs);
console.log('App.js patched with top 3 solutions');
