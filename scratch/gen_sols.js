const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '..', 'app.js');
let appJs = fs.readFileSync(appJsPath, 'utf8');

// We will inject the detailed objects.
// First, let's prepare the objects as strings.

// 1. Projectile Height (topicsData Mechanics Example)
const projSol = {
    problemReading: "โจทย์ให้หาความสูงสูงสุด (H) ของวัตถุที่ถูกยิงแบบโพรเจกไทล์จากพื้น ด้วยความเร็วต้น \\(u\\) และมุม \\(\\theta\\) กับแนวระดับ<br><br><strong>สมมติฐาน:</strong> ไม่คิดแรงต้านอากาศ การเคลื่อนที่ในแนวดิ่งมีความเร่งคงที่ \\(-g\\)",
    diagramInstruction: \`
        <svg viewBox="0 0 400 200" class="w-full max-w-sm bg-black/20 rounded">
            <path d="M 50 150 Q 200 -50 350 150" fill="none" stroke="#22d3ee" stroke-width="2" stroke-dasharray="5,5"/>
            <line x1="50" y1="150" x2="100" y2="70" stroke="#a78bfa" stroke-width="3" marker-end="url(#arrow)"/>
            <text x="60" y="60" fill="#a78bfa">u</text>
            <line x1="200" y1="150" x2="200" y2="50" stroke="#f472b6" stroke-width="2" stroke-dasharray="4,4"/>
            <text x="210" y="100" fill="#f472b6">H (สูงสุด)</text>
            <circle cx="200" cy="50" r="5" fill="#22d3ee"/>
            <text x="180" y="35" fill="#22d3ee" font-size="12">v_y = 0</text>
            <line x1="30" y1="150" x2="370" y2="150" stroke="gray" stroke-width="2"/>
            <path d="M 80 150 A 30 30 0 0 0 70 120" fill="none" stroke="gray"/>
            <text x="85" y="140" fill="gray" font-size="14">θ</text>
        </svg>
    \`,
    variables: [
        { symbol: "u", meaning: "ความเร็วต้นของวัตถุ", unit: "m/s", role: "given" },
        { symbol: "\\theta", meaning: "มุมยิงเทียบกับแนวระดับ", unit: "rad หรือ องศา", role: "given" },
        { symbol: "H", meaning: "ความสูงสูงสุดจากพื้น", unit: "m", role: "unknown" },
        { symbol: "g", meaning: "ความเร่งเนื่องจากแรงโน้มถ่วง", unit: "m/s^2", role: "constant" }
    ],
    principle: {
        name: "การเคลื่อนที่แนวดิ่งภายใต้ความเร่งคงที่ (หรือ กฎอนุรักษ์พลังงานในแนวดิ่ง)",
        reason: "โจทย์ต้องการหาการกระจัดสูงสุดในแนวดิ่ง โดยที่จุดสูงสุดเราทราบว่าความเร็วแนวดิ่งเป็นศูนย์ (วัตถุหยุดลอยขึ้นแล้วเริ่มตกลงมา) การใช้สมการการเคลื่อนที่แนวดิ่งจึงเชื่อมโยงความเร็วต้น ความเร็วปลาย และระยะทางได้โดยตรงโดยไม่ต้องสนใจเวลา"
    },
    equations: [
        { line: "\\( v_{y}^2 = u_{y}^2 + 2a_y s_y \\)", explanation: "สมการการเคลื่อนที่เส้นตรงเมื่อความเร่งคงที่และไม่ใช้เวลา" },
        { line: "\\( u_y = u\\sin\\theta \\)", explanation: "แตกเวกเตอร์ความเร็วต้นเข้าสู่แนวดิ่ง (ห่างมุมใช้ sin)" }
    ],
    derivationSteps: [
        { line: "\\( 0 = (u\\sin\\theta)^2 + 2(-g)H \\)", explanation: "แทนค่าตัวแปร: ที่จุดสูงสุด \\(v_y = 0\\), ความเร่งดึงลง \\(a_y = -g\\), และระยะทาง \\(s_y = H\\)" },
        { line: "\\( 0 = u^2\\sin^2\\theta - 2gH \\)", explanation: "กระจายกำลังสองและจัดรูปเครื่องหมายลบ" },
        { line: "\\( 2gH = u^2\\sin^2\\theta \\)", explanation: "ย้ายพจน์ \\(2gH\\) ไปอีกฝั่งเพื่อให้เป็นบวก" },
        { line: "\\( H = \\frac{u^2\\sin^2\\theta}{2g} \\)", explanation: "ย้าย \\(2g\\) ไปหารเพื่อหาค่า \\(H\\)" }
    ],
    finalAnswer: "H = \\frac{u^2\\sin^2\\theta}{2g}",
    answerCheck: "เมื่อยิงด้วยความเร็ว \\(u\\) มากขึ้น ความสูงจะมากขึ้นเป็นกำลังสอง และเมื่อยิงทำมุม \\(90^\\circ\\) (ยิงขึ้นตรงๆ) จะได้ \\(\\sin 90^\\circ = 1\\) ทำให้ได้ความสูง \\(u^2/2g\\) ซึ่งตรงกับสมการตกอิสระ",
    commonMistakes: [
        "จำสับสนกับสมการระยะตกไกลสุด (\\(R = u^2\\sin(2\\theta)/g\\))",
        "ใช้มุมผิด โดยเอามุมกับแนวดิ่งมาแทนค่าโดยตรง",
        "ลืมยกกำลังสองตรงฟังก์ชัน \\(\\sin\\)"
    ],
    recap: [
        "การหาค่าในแกน y ต้องแตกความเร็วด้วย \\(\\sin\\)",
        "ที่จุดสูงสุด ความเร็วแนวดิ่งเป็นศูนย์เสมอ (\\(v_y = 0\\))",
        "ใช้สมการ \\(v^2 = u^2 + 2as\\) เพื่อหลีกเลี่ยงการหาเวลา"
    ]
};

// 2. Elastic collision of equal spheres (We will replace Mock #2 with this)
const elasticEqualSol = {
    problemReading: "มวล \\(m\\) วิ่งด้วยความเร็ว \\(u\\) เข้าชนมวล \\(m\\) อีกก้อนที่อยู่นิ่งบนพื้นลื่นแบบยืดหยุ่นสมบูรณ์ ต้องการหาความเร็วของมวลก้อนที่ 1 และ 2 หลังการชน<br><br><strong>สมมติฐาน:</strong> พื้นไม่มีแรงเสียดทาน (ระบบอนุรักษ์โมเมนตัม) การชนยืดหยุ่นสมบูรณ์ (อนุรักษ์พลังงานจลน์)",
    diagramInstruction: \`
        <svg viewBox="0 0 400 150" class="w-full max-w-sm bg-black/20 rounded">
            <!-- ก่อนชน -->
            <text x="20" y="30" fill="gray" font-size="12">ก่อนชน</text>
            <circle cx="80" cy="60" r="20" fill="#a78bfa"/>
            <text x="75" y="65" fill="black" font-weight="bold">m</text>
            <line x1="110" y1="60" x2="150" y2="60" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="120" y="50" fill="#a78bfa">u</text>
            
            <circle cx="250" cy="60" r="20" fill="#22d3ee"/>
            <text x="245" y="65" fill="black" font-weight="bold">m</text>
            <text x="240" y="30" fill="#22d3ee">v=0</text>
            
            <!-- หลังชน -->
            <text x="20" y="110" fill="gray" font-size="12">หลังชน</text>
            <circle cx="80" cy="130" r="20" fill="#a78bfa" stroke="#a78bfa" stroke-width="2" fill-opacity="0.2"/>
            <text x="65" y="100" fill="#a78bfa">v1=0</text>
            
            <circle cx="250" cy="130" r="20" fill="#22d3ee"/>
            <line x1="280" y1="130" x2="320" y2="130" stroke="#22d3ee" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="290" y="120" fill="#22d3ee">v2=u</text>
        </svg>
    \`,
    variables: [
        { symbol: "m", meaning: "มวลของวัตถุทั้งสองก้อน", unit: "kg", role: "given" },
        { symbol: "u", meaning: "ความเร็วต้นของก้อนแรก", unit: "m/s", role: "given" },
        { symbol: "v_1, v_2", meaning: "ความเร็วหลังชนของก้อนแรกและก้อนที่สอง", unit: "m/s", role: "unknown" }
    ],
    principle: {
        name: "การอนุรักษ์โมเมนตัม และ การอนุรักษ์พลังงานจลน์ (การชนแบบยืดหยุ่น)",
        reason: "เมื่อไม่มีแรงภายนอกมากระทำ โมเมนตัมรวมจะคงที่ และเนื่องจากโจทย์ระบุว่า 'ยืดหยุ่นสมบูรณ์' พลังงานจลน์รวมของระบบจะไม่สูญหายไปเป็นความร้อนหรือเสียงเลย"
    },
    equations: [
        { line: "\\( m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2 \\)", explanation: "สมการอนุรักษ์โมเมนตัม (Momentum Conservation)" },
        { line: "\\( u_1 + v_1 = u_2 + v_2 \\)", explanation: "สมการความเร็วสัมพัทธ์ (ลัดจากการอนุรักษ์พลังงานจลน์ในการชนยืดหยุ่น 1 มิติ)" }
    ],
    derivationSteps: [
        { line: "\\( mu + m(0) = mv_1 + mv_2 \\)", explanation: "แทนค่าในสมการโมเมนตัม: ก้อนที่สองอยู่นิ่ง \\(u_2 = 0\\), มวลเท่ากันคือ \\(m\\)" },
        { line: "\\( u = v_1 + v_2 \\)", explanation: "นำมวล \\(m\\) หารตลอดทั้งสมการ (เก็บเป็นสมการที่ 1)" },
        { line: "\\( u + v_1 = 0 + v_2 \\)", explanation: "แทนค่าในสมการความเร็วสัมพัทธ์: \\(u_1 = u\\) และ \\(u_2 = 0\\) (เก็บเป็นสมการที่ 2)" },
        { line: "\\( u = v_1 + (u + v_1) \\)", explanation: "นำ \\(v_2\\) จากสมการที่ 2 มาแทนในสมการที่ 1" },
        { line: "\\( u = u + 2v_1 \\Rightarrow 2v_1 = 0 \\)", explanation: "แก้สมการหา \\(v_1\\)" },
        { line: "\\( v_1 = 0 \\)", explanation: "แปลว่ามวลก้อนแรกหยุดนิ่งหลังชน" },
        { line: "\\( v_2 = u + 0 = u \\)", explanation: "นำ \\(v_1 = 0\\) ไปแทนกลับในสมการที่ 2 จะได้ว่าก้อนที่สองได้ความเร็วทั้งหมดไป" }
    ],
    finalAnswer: "v_1 = 0, \\; v_2 = u \\; \\text{(แลกเปลี่ยนความเร็วกัน)}",
    answerCheck: "โมเมนตัมก่อนชน \\(mu\\) เท่ากับโมเมนตัมหลังชน \\(mu\\) พลังงานจลน์ก็เท่าเดิม ปรากฏการณ์นี้เห็นได้ชัดเจนจากลูกตุ้มของนิวตัน (Newton's Cradle)",
    commonMistakes: [
        "จำสมการความเร็วสัมพัทธ์ผิดเป็น \\(u_1 - v_1 = u_2 - v_2\\)",
        "คิดว่ามวลก้อนแรกจะกระดอนกลับ ซึ่งจะเกิดขึ้นได้ก็ต่อเมื่อก้อนที่สองมีมวลมากกว่ามากๆ เท่านั้น"
    ],
    recap: [
        "จำกฏเหล็ก: มวลเท่ากัน ชนยืดหยุ่นตรงๆ = แลกเปลี่ยนความเร็วกัน 100%",
        "สมการอนุรักษ์พลังงานจลน์ สามารถลดรูปเป็นสมการความเร็วสัมพัทธ์ \\(u_1 + v_1 = u_2 + v_2\\) ได้เสมอในการชน 1 มิติ"
    ]
};

// 3. Spring collision / common velocity (Mock ID 3)
const springCollisionSol = {
    problemReading: "มวล \\(m\\) เคลื่อนที่ด้วยความเร็ว \\(v\\) เข้าชนมวล \\(m\\) อีกก้อนที่ติดสปริงและอยู่นิ่ง ต้องการหาความเร็วของมวลทั้งสองในจังหวะที่สปริงหดตัวมากที่สุด<br><br><strong>สมมติฐาน:</strong> พื้นลื่น (ไม่มีแรงเสียดทานภายนอก) สปริงเบา (ไม่มีมวล)",
    diagramInstruction: \`
        <svg viewBox="0 0 400 120" class="w-full max-w-sm bg-black/20 rounded">
            <rect x="250" y="50" width="30" height="30" fill="#22d3ee"/>
            <path d="M 220 65 Q 230 45, 235 65 T 250 65" fill="none" stroke="#f472b6" stroke-width="2"/>
            <rect x="50" y="50" width="30" height="30" fill="#a78bfa"/>
            <line x1="90" y1="65" x2="130" y2="65" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrow)"/>
            <text x="100" y="55" fill="#a78bfa">v</text>
            <text x="260" y="95" fill="gray" font-size="12">V_common</text>
        </svg>
    \`,
    variables: [
        { symbol: "m", meaning: "มวลของวัตถุแต่ละก้อน", unit: "kg", role: "given" },
        { symbol: "v", meaning: "ความเร็วต้นของก้อนที่วิ่งเข้าชน", unit: "m/s", role: "given" },
        { symbol: "V", meaning: "ความเร็วของระบบขณะสปริงหดสุด", unit: "m/s", role: "unknown" }
    ],
    principle: {
        name: "การอนุรักษ์โมเมนตัม และ จลนศาสตร์การชน",
        reason: "จังหวะที่สปริงหดตัว 'มากที่สุด' หมายความว่าระยะห่างระหว่างมวลทั้งสองก้อนจะไม่ลดลงและไม่เพิ่มขึ้นอีกแล้วในเสี้ยววินาทีนั้น ซึ่งจะเกิดขึ้นได้ก็ต่อเมื่อมวลทั้งสองก้อนมีความเร็วเท่ากันพอดี (ถ้าก้อนหลังเร็วกว่าสปริงจะหดอีก ถ้าก้อนหน้าเร็วกว่าสปริงจะยืด) ดังนั้นที่จุดนี้ เสมือนเป็นการชนแบบไม่ยืดหยุ่นที่มวลติดกันไปชั่วขณะ"
    },
    equations: [
        { line: "\\( P_{initial} = P_{final} \\)", explanation: "กฎอนุรักษ์โมเมนตัม" },
        { line: "\\( m_1 u_1 + m_2 u_2 = (m_1 + m_2)V \\)", explanation: "รูปแบบสมการเมื่อมวลทั้งสองมีความเร็ว \\(V\\) เท่ากัน" }
    ],
    derivationSteps: [
        { line: "\\( mv + m(0) = (m + m)V \\)", explanation: "แทนค่า: มวลแรกวิ่งมาด้วย \\(v\\), มวลที่สองอยู่นิ่ง \\(0\\)" },
        { line: "\\( mv = 2mV \\)", explanation: "รวมมวลทางขวา" },
        { line: "\\( V = \\frac{mv}{2m} \\)", explanation: "ย้าย \\(2m\\) ไปหาร" },
        { line: "\\( V = \\frac{v}{2} \\)", explanation: "มวล \\(m\\) ตัดกัน" }
    ],
    finalAnswer: "V = \\frac{v}{2}",
    answerCheck: "เมื่อมวลรวมเพิ่มขึ้นเป็น 2 เท่า ความเร็วต้องลดลงเหลือครึ่งหนึ่งเพื่อรักษาโมเมนตัมให้คงที่ ซึ่งสมเหตุสมผลทางฟิสิกส์",
    commonMistakes: [
        "เข้าใจผิดว่าเมื่อสปริงหดมากที่สุด พลังงานจลน์จะหายไปหมดและระบบหยุดนิ่ง (ตอบ 0)",
        "จำสลับกับคำตอบของการชนยืดหยุ่น (ตอบว่าแลกเปลี่ยนความเร็ว)"
    ],
    recap: [
        "คีย์เวิร์ด 'สปริงหดสุด', 'เข้าใกล้กันมากสุด' = ความเร็วของมวลทั้งสองต้องเท่ากัน",
        "ในจังหวะนี้ โมเมนตัมยังคงอนุรักษ์ แต่พลังงานจลน์บางส่วนถูกเปลี่ยนไปเป็นพลังงานศักย์ยืดหยุ่นในสปริง"
    ]
};

// We will inject these solutions using node string replacement.
// Let's create an object containing the keys and the json strings.
const injections = {
    projSol: JSON.stringify(projSol),
    elasticEqualSol: JSON.stringify(elasticEqualSol),
    springCollisionSol: JSON.stringify(springCollisionSol)
};

fs.writeFileSync(path.join(__dirname, 'injections.json'), JSON.stringify(injections));
console.log('Script ran. Injections generated.');
