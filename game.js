/**
 * Гостевой дом «ЛЕС» — Woodo 3D (Полное фотографическое соответствие всем 5 фото)
 * 
 * Фото 1 и 2 (Экстерьер):
 * - Классический баварский/альпийский фасад: 1-й этаж — клинкерный кирпич с белой расшивкой,
 *   цоколь — бутовый камень (брекчия), 2-й этаж — фахверк со светлой штукатуркой.
 * - Фронтонный деревянный балкон с X-перилами и 4 мощными подкосами на торце здания.
 * - Двускатная черепичная кровля с выносами, стропильными кобылками и водостоками.
 * - Входное крыльцо с двускатным козырьком на резных столбах.
 * - Фирменный металлический логотип «ЛЕС ГОСТЕВОЙ ДОМ» цвета глубокой хвои.
 * - Ландшафт: стройные конические туи Смарагд, клумбы с широколистными хостами,
 *   брусчатая дорожка и зона патио с белым зонтом.
 * 
 * Фото 3 (Гостиная Woodo):
 * - Акцентная стена: состаренный лофт-кирпич с белой расшивкой, обожженными и терракотовыми кирпичами.
 * - 3 круглых зеркала в тонких черных рамах на кожаных ремнях с латунными пряжками.
 * - Сдвижная амбарная дверь из горизонтальных досок на черном рельсе с чугунными роликами.
 * - Угловой диван из королевского сапфирового велюра (оттоманка строго слева),
 *   горчичные и узорчатые подушки, тонкие конические ножки.
 * - Круглый кофейный столик из черного полированного мрамора Nero Marquina на тонких ножках с треногой.
 * - Натуральный дубовый паркет «французская ёлочка» и винтажный восточный ковер.
 * - Золотая каскадная хрустальная люстра-водопад, дающая теплое сияние.
 * - Левая стена: окно в пол с бежевыми портьерами и тюлем, современное абстрактное панно, черный столик.
 * - На мраморном столике — аккуратная деревянная диорама Woodo с фигурками (Бен, Фокси, котик и чайный набор).
 * 
 * Фото 4 и 5 (Холл и Ресепшен):
 * - Оливковые стены, светящееся табло «ВЫХОД», входная стеклянная дверь.
 * - Ступенчатая стойка ресепшена из бруса с кашпо суккулентов.
 * - Лестница на 2-й этаж с вертикальной реечной перегородкой.
 * - Зона ожидания: белый простенок с картиной Кинцуги (золотая жила на мраморе),
 *   золотая геометрическая консоль с черным стеклом, золотая лампа и 2 желтых кресла с павлиньими подушками.
 * - Интерьерная сосна в стильном кашпо.
 */

// ============================================================================
// 1. ВЫСОКОДЕТАЛИЗИРОВАННЫЕ ПРОЦЕДУРНЫЕ ТЕКСТУРЫ
// ============================================================================

// 1.1 Клинкерный кирпич фасада (Фото 1 и 2)
function createClinkerBrickTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#beb7ab';
    ctx.fillRect(0, 0, 1024, 1024);

    const rows = 36;
    const cols = 14;
    const h = 1024 / rows;
    const w = 1024 / cols;
    const pad = 2.6;

    for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * (w / 2);
        for (let c = -1; c < cols + 1; c++) {
            const x = c * w + offset + pad / 2;
            const y = r * h + pad / 2;
            const bw = w - pad;
            const bh = h - pad;

            const rnd = Math.random();
            let rCol, gCol, bCol;
            if (rnd < 0.20) {
                // Тёмный обожжённый шоколадно-бордовый клинкер
                rCol = 82 + Math.random() * 22;
                gCol = 26 + Math.random() * 10;
                bCol = 18 + Math.random() * 8;
            } else if (rnd < 0.82) {
                // Насыщенный благородный терракотово-красный клинкер (Фото 1 и 2)
                rCol = 148 + Math.random() * 24;
                gCol = 42 + Math.random() * 14;
                bCol = 28 + Math.random() * 10;
            } else {
                // Тёплый подпаленный охристо-терракотовый акцент
                rCol = 172 + Math.random() * 20;
                gCol = 58 + Math.random() * 12;
                bCol = 32 + Math.random() * 8;
            }

            ctx.fillStyle = `rgb(${Math.floor(rCol)}, ${Math.floor(gCol)}, ${Math.floor(bCol)})`;
            ctx.fillRect(x, y, bw, bh);

            ctx.fillStyle = 'rgba(0,0,0,0.12)';
            for (let i = 0; i < 16; i++) {
                ctx.fillRect(x + Math.random() * bw, y + Math.random() * bh, 3, 2);
            }
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 2);
    return tex;
}

// 1.2 Полигональная бутовая кладка цоколя (Фото 1 и 2)
function createStonePlinthTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#484642';
    ctx.fillRect(0, 0, 512, 512);

    const stoneColors = ['#7c7a74', '#8e8c85', '#6e6c66', '#858178', '#63615c'];
    for (let py = 0; py < 512; py += 55) {
        for (let px = 0; px < 512; px += 85) {
            const ox = (Math.random() - 0.5) * 14;
            const oy = (Math.random() - 0.5) * 10;
            const col = stoneColors[Math.floor(Math.random() * stoneColors.length)];
            ctx.fillStyle = col;

            ctx.beginPath();
            ctx.moveTo(px + ox + 6, py + oy + 6);
            ctx.lineTo(px + ox + 76, py + oy + 4);
            ctx.lineTo(px + ox + 80, py + oy + 46);
            ctx.lineTo(px + ox + 8, py + oy + 48);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = 'rgba(0,0,0,0.08)';
            ctx.fillRect(px + ox + 15, py + oy + 15, 45, 20);
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 1.5);
    return tex;
}

// 1.3 Состаренный лофт-кирпич с белой расшивкой (Фото 3)
function createLoftBrickTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Белый фактурный известковый шов (Фото 3)
    ctx.fillStyle = '#f0ece1';
    ctx.fillRect(0, 0, 1024, 1024);

    const rows = 26;
    const cols = 11;
    const h = 1024 / rows;
    const w = 1024 / cols;
    const pad = 5.5;

    for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * (w / 2);
        for (let c = -1; c < cols + 1; c++) {
            const x = c * w + offset + pad / 2;
            const y = r * h + pad / 2;
            const bw = w - pad;
            const bh = h - pad;

            const rnd = Math.random();
            let rCol, gCol, bCol;
            if (rnd < 0.24) {
                // Глубокий обожженный угольно-черный кирпич (Фото 3)
                rCol = 38 + Math.random() * 22;
                gCol = 24 + Math.random() * 14;
                bCol = 20 + Math.random() * 10;
            } else if (rnd < 0.70) {
                // Насыщенный благородный терракотово-бордовый клинкер (Фото 3)
                rCol = 148 + Math.random() * 26;
                gCol = 44 + Math.random() * 16;
                bCol = 32 + Math.random() * 12;
            } else if (rnd < 0.88) {
                // Тёплый подпаленный охристо-ржавый кирпич
                rCol = 168 + Math.random() * 22;
                gCol = 68 + Math.random() * 18;
                bCol = 36 + Math.random() * 14;
            } else {
                // Состаренный кирпич с белёсым известковым налётом
                rCol = 162 + Math.random() * 20;
                gCol = 105 + Math.random() * 18;
                bCol = 84 + Math.random() * 14;
            }

            ctx.fillStyle = `rgb(${Math.floor(rCol)}, ${Math.floor(gCol)}, ${Math.floor(bCol)})`;
            ctx.fillRect(x, y, bw, bh);

            // Пористая шероховатость
            ctx.fillStyle = 'rgba(0,0,0,0.18)';
            for (let i = 0; i < 24; i++) {
                ctx.fillRect(x + Math.random() * bw, y + Math.random() * bh, 3, 2);
            }

            // Белые высолы и следы раствора (характерная черта баварской кладки на Фото 3)
            if (rnd > 0.78) {
                ctx.fillStyle = 'rgba(244, 240, 232, 0.32)';
                ctx.fillRect(x + bw * 0.1, y + bh * 0.15, bw * 0.8, bh * 0.6);
            }
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.8, 1.4);
    return tex;
}

// 1.4 Безупречный французский дубовый паркет «ёлочка» (Фото 3, 4, 5)
function createHerringboneTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Глубокий темный цвет микро-фасок
    ctx.fillStyle = '#26180d';
    ctx.fillRect(0, 0, 1024, 1024);

    const colWidth = 96; // Ширина шевронной полосы
    const slatH = 34;    // Высота плашки
    const numCols = Math.ceil(1024 / colWidth) + 1;

    for (let c = 0; c < numCols; c++) {
        const x0 = c * colWidth;
        const x1 = x0 + colWidth;
        const isUp = (c % 2 === 0);
        const slope = isUp ? colWidth : -colWidth;

        for (let y = -colWidth * 2; y < 1024 + colWidth * 2; y += slatH) {
            const yA0 = y;
            const yA1 = y + slope;
            const yB0 = y + slatH - 2.5;
            const yB1 = y + slatH - 2.5 + slope;

            ctx.beginPath();
            ctx.moveTo(x0 + 1, yA0);
            ctx.lineTo(x1 - 1, yA1);
            ctx.lineTo(x1 - 1, yB1);
            ctx.lineTo(x0 + 1, yB0);
            ctx.closePath();

            // Оттенок натурального дуба с красивыми нюансами
            const rnd = Math.random();
            let r, g, b;
            if (rnd < 0.25) {
                // Светлый медовый дуб
                r = 196 + Math.random() * 20;
                g = 148 + Math.random() * 16;
                b = 96 + Math.random() * 12;
            } else if (rnd < 0.70) {
                // Теплый карамельный дуб
                r = 175 + Math.random() * 20;
                g = 126 + Math.random() * 16;
                b = 78 + Math.random() * 12;
            } else {
                // Золотисто-коричневый дуб
                r = 152 + Math.random() * 20;
                g = 105 + Math.random() * 16;
                b = 64 + Math.random() * 12;
            }

            ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
            ctx.fill();

            // Тонкие продольные волокна древесины
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x0 + 4, yA0 + slatH * 0.35);
            ctx.lineTo(x1 - 4, yA1 + slatH * 0.35);
            ctx.moveTo(x0 + 4, yA0 + slatH * 0.7);
            ctx.lineTo(x1 - 4, yA1 + slatH * 0.7);
            ctx.stroke();

            // Фаска плашки
            ctx.strokeStyle = 'rgba(38, 24, 13, 0.55)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3.5, 3.5);
    return tex;
}

// 1.5 Черный полированный мрамор Nero Marquina (Фото 3)
function createMarbleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0b0e'; // Глубокий черный цвет
    ctx.fillRect(0, 0, 1024, 1024);
    ctx.lineCap = 'round';

    function drawVein(x0, y0, x1, y1, width, alpha) {
        ctx.strokeStyle = `rgba(246, 248, 252, ${alpha})`;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        let cx = x0, cy = y0;
        while (Math.hypot(x1 - cx, y1 - cy) > 20) {
            cx += (x1 - cx) * 0.12 + (Math.random() - 0.5) * 30;
            cy += (y1 - cy) * 0.12 + (Math.random() - 0.5) * 30;
            ctx.lineTo(cx, cy);
        }
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }

    // Главные выразительные белые прожилки
    drawVein(40, 80, 960, 930, 3.2, 0.70);
    drawVein(100, 970, 920, 120, 2.6, 0.60);
    drawVein(460, 20, 740, 990, 2.0, 0.50);
    drawVein(60, 440, 540, 800, 1.6, 0.45);
    drawVein(520, 480, 890, 680, 1.4, 0.40);

    for (let k = 0; k < 12; k++) {
        const sx = Math.random() * 1024;
        const sy = Math.random() * 1024;
        drawVein(sx, sy, sx + (Math.random() - 0.5) * 240, sy + (Math.random() - 0.5) * 240, 0.9, 0.28);
    }

    return new THREE.CanvasTexture(canvas);
}

// 1.6 Отражающее полотно круглых настенных зеркал над диваном (Фото 3)
function createMirrorReflectionTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const cx = 256, cy = 256, r = 240;

    // Глубокий зеркальный градиент с отражением мягкого света интерьера и люстры
    const grad = ctx.createRadialGradient(cx - 50, cy - 60, 20, cx, cy, r);
    grad.addColorStop(0.0, '#ffffff');
    grad.addColorStop(0.25, '#eae6dc');
    grad.addColorStop(0.60, '#c8c2b5');
    grad.addColorStop(0.88, '#9e9688');
    grad.addColorStop(1.0, '#756d60');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // Мягкий золотистый блик люстры в верхней левой части
    const flare = ctx.createRadialGradient(cx - 70, cy - 80, 5, cx - 70, cy - 80, 120);
    flare.addColorStop(0, 'rgba(255, 235, 170, 0.65)');
    flare.addColorStop(0.5, 'rgba(240, 210, 140, 0.25)');
    flare.addColorStop(1, 'rgba(220, 190, 120, 0)');
    ctx.fillStyle = flare;
    ctx.beginPath();
    ctx.arc(cx - 70, cy - 80, 120, 0, Math.PI * 2);
    ctx.fill();

    // Тонкая фацетная кайма по периметру
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 6, 0, Math.PI * 2);
    ctx.stroke();

    return new THREE.CanvasTexture(canvas);
}

// 1.6.1 Реалистичный купол альпийского летнего неба с перьевыми облаками и солнцем (Фото 1 и 2)
function createSkyDomeTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 2048; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Высотный градиент: от сочной летней лазури в зените к теплой дымке горизонта
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    skyGrad.addColorStop(0.00, '#2e75b8'); // Зенит: глубокая альпийская синева
    skyGrad.addColorStop(0.28, '#4f94cf');
    skyGrad.addColorStop(0.58, '#7cb6e3');
    skyGrad.addColorStop(0.82, '#b2d9f4');
    skyGrad.addColorStop(0.96, '#d8eefc'); // Теплая атмосферная дымка у горизонта
    skyGrad.addColorStop(1.00, '#eaf4fa');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 2048, 1024);

    // Сияющее солнце с ореолом (Фото 1 и 2)
    const sunX = 1480, sunY = 320;
    const sunHalo = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 320);
    sunHalo.addColorStop(0.0, 'rgba(255, 255, 245, 1.0)');
    sunHalo.addColorStop(0.12, 'rgba(255, 250, 215, 0.75)');
    sunHalo.addColorStop(0.35, 'rgba(255, 238, 190, 0.32)');
    sunHalo.addColorStop(0.70, 'rgba(255, 230, 175, 0.10)');
    sunHalo.addColorStop(1.0, 'rgba(255, 220, 160, 0.0)');
    ctx.fillStyle = sunHalo;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 320, 0, Math.PI * 2);
    ctx.fill();

    // Нежные перистые и кучевые облака (Фото 1 и 2)
    function drawCloudCluster(cx, cy, w, h, baseOp) {
        ctx.save();
        ctx.globalAlpha = baseOp;
        const puffs = 9;
        for (let i = 0; i < puffs; i++) {
            const px = cx + (Math.random() - 0.5) * w;
            const py = cy + (Math.random() - 0.5) * h * 0.45;
            const pr = (w * 0.22) + Math.random() * (w * 0.18);
            const cg = ctx.createRadialGradient(px, py, pr * 0.15, px, py, pr);
            cg.addColorStop(0.0, 'rgba(255, 255, 255, 0.90)');
            cg.addColorStop(0.45, 'rgba(255, 255, 255, 0.55)');
            cg.addColorStop(0.80, 'rgba(245, 250, 255, 0.18)');
            cg.addColorStop(1.0, 'rgba(240, 248, 255, 0.0)');
            ctx.fillStyle = cg;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    const clouds = [
        { x: 260, y: 310, w: 320, h: 75, op: 0.52 },
        { x: 620, y: 240, w: 280, h: 65, op: 0.45 },
        { x: 920, y: 380, w: 380, h: 85, op: 0.48 },
        { x: 1250, y: 220, w: 290, h: 70, op: 0.40 },
        { x: 1720, y: 340, w: 350, h: 80, op: 0.50 },
        { x: 1980, y: 260, w: 260, h: 60, op: 0.42 },
        { x: 440, y: 440, w: 420, h: 90, op: 0.38 },
        { x: 1450, y: 450, w: 360, h: 80, op: 0.35 }
    ];
    clouds.forEach(c => drawCloudCluster(c.x, c.y, c.w, c.h, c.op));

    return new THREE.CanvasTexture(canvas);
}

// 1.6.2 Металлочерепица кровли цвета темный шоколад с рельефными ребрами (Фото 1 и 2)
function createRoofTileTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Базовый глубокий цвет обожженной черепицы/металла (темный шоколад)
    ctx.fillStyle = '#2c221c';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 16;
    const rowH = 512 / rows;
    for (let r = 0; r < rows; r++) {
        const y = r * rowH;
        // Верхний теневой стык ряда
        ctx.fillStyle = 'rgba(12, 8, 6, 0.75)';
        ctx.fillRect(0, y, 512, 4);

        // Градиент волны ряда
        const rowGrad = ctx.createLinearGradient(0, y + 4, 0, y + rowH);
        rowGrad.addColorStop(0, '#42342b');
        rowGrad.addColorStop(0.35, '#352922');
        rowGrad.addColorStop(0.85, '#261c17');
        rowGrad.addColorStop(1, '#1a130f');
        ctx.fillStyle = rowGrad;
        ctx.fillRect(0, y + 4, 512, rowH - 4);

        // Вертикальные теневые ребра волны металлочерепицы
        const waveStep = 32;
        for (let x = 0; x < 512; x += waveStep) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.fillRect(x + 2, y + 5, 4, rowH - 6);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            ctx.fillRect(x + waveStep - 5, y + 5, 5, rowH - 6);
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 4);
    return tex;
}

// 1.6.3 Отражение летнего неба в стеклах окон отеля (Фото 1 и 2)
function createWindowReflectionTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#4a8bc4');
    grad.addColorStop(0.6, '#86bee8');
    grad.addColorStop(1, '#cde6f7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Очертание легкого облачка
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.arc(160, 90, 45, 0, Math.PI * 2);
    ctx.arc(200, 95, 35, 0, Math.PI * 2);
    ctx.arc(130, 105, 30, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

// 1.6.4 Текстура акцентной подушки с ботаническим / павлиньим узором (Фото 3)
function createCushionPatternTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f4eee1';
    ctx.fillRect(0, 0, 512, 512);

    // Растительные мотивы и павлиньи перья (изумруд, охра, лазурь)
    const colors = ['#235347', '#0f3c4c', '#c28b2e', '#886226', '#3b7a57'];
    for (let i = 0; i < 28; i++) {
        const cx = Math.random() * 512;
        const cy = Math.random() * 512;
        const r = 25 + Math.random() * 35;
        const col = colors[i % colors.length];

        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.45, (Math.random() - 0.5) * Math.PI, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#d4af37';
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.2, 0, Math.PI * 2);
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}


// 1.7 Амбарная дверь из горизонтальных досок (Фото 3)
function createBarnDoorTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Тёмный глубокий шов между досками
    ctx.fillStyle = '#1c1008';
    ctx.fillRect(0, 0, 512, 1024);

    const plankCount = 14;
    const plankH = 1024 / plankCount;

    for (let i = 0; i < plankCount; i++) {
        const y = i * plankH;
        // Благородный теплый золотисто-коричневый дуб/тик (Фото 3)
        const rnd = Math.random();
        const baseR = 142 + rnd * 28;
        const baseG = 84 + rnd * 18;
        const baseB = 42 + rnd * 12;

        ctx.fillStyle = `rgb(${Math.floor(baseR)}, ${Math.floor(baseG)}, ${Math.floor(baseB)})`;
        ctx.fillRect(0, y + 2, 512, plankH - 4);

        // Продольные волокна древесины с естественными переливами
        for (let f = 5; f < plankH - 5; f += 6) {
            const alpha = 0.05 + Math.random() * 0.08;
            ctx.fillStyle = Math.random() > 0.5 ? `rgba(40, 20, 10, ${alpha})` : `rgba(200, 140, 80, ${alpha * 0.7})`;
            ctx.fillRect(0, y + f, 512, 1.8);
        }

        // Тонкая светотень на верхней и нижней фаске каждой доски
        ctx.fillStyle = 'rgba(255, 230, 180, 0.12)';
        ctx.fillRect(0, y + 2, 512, 2.5);
        ctx.fillStyle = 'rgba(20, 10, 5, 0.35)';
        ctx.fillRect(0, y + plankH - 3, 512, 2.0);
    }

    return new THREE.CanvasTexture(canvas);
}

// 1.8 Фирменная вывеска «ЛЕС ГОСТЕВОЙ ДОМ» (Фото 1 и 2)
function createLogoSignTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 1024, 512);

    const primaryColor = '#123932'; // Глубокий хвойный темно-бирюзовый
    ctx.fillStyle = primaryColor;
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Контур домика
    ctx.save();
    ctx.translate(135, 250);
    ctx.beginPath();
    ctx.moveTo(-80, 90);
    ctx.lineTo(-80, -22);
    ctx.lineTo(0, -100);
    ctx.lineTo(80, -22);
    ctx.lineTo(80, 90);
    ctx.closePath();
    ctx.stroke();

    // Ель
    ctx.beginPath();
    ctx.moveTo(0, -72);
    ctx.lineTo(-34, -28); ctx.lineTo(-18, -28);
    ctx.lineTo(-44, 18); ctx.lineTo(-24, 18);
    ctx.lineTo(-50, 62); ctx.lineTo(50, 62);
    ctx.lineTo(24, 18); ctx.lineTo(44, 18);
    ctx.lineTo(18, -28); ctx.lineTo(34, -28);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(-10, 62, 20, 28);
    ctx.restore();

    // «ЛЕС»
    ctx.font = '900 156px "Segoe UI", sans-serif';
    ctx.fillStyle = primaryColor;
    ctx.fillText('ЛЕС', 260, 275);

    // «ГОСТИНИЦА»
    ctx.font = '700 48px "Segoe UI", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('ГОСТИНИЦА', 265, 340);

    return new THREE.CanvasTexture(canvas);
}

// 1.9 Восточный винтажный ковер (Фото 3)
function createCarpetTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#e8dfd0';
    ctx.fillRect(0, 0, 1024, 1024);

    ctx.strokeStyle = '#9e4e32';
    ctx.lineWidth = 36;
    ctx.strokeRect(36, 36, 952, 952);

    ctx.strokeStyle = '#2b4155';
    ctx.lineWidth = 24;
    ctx.strokeRect(76, 76, 872, 872);

    ctx.strokeStyle = '#d8ba82';
    ctx.lineWidth = 6;
    ctx.strokeRect(104, 104, 816, 816);

    ctx.fillStyle = '#324a5f';
    ctx.fillRect(110, 110, 804, 804);

    ctx.save();
    ctx.translate(512, 512);

    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI * 2) / 16;
        const r = (i % 2 === 0) ? 260 : 210;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = '#9e4e32';
    ctx.fill();
    ctx.strokeStyle = '#e8dfd0';
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI * 2) / 16;
        const r = (i % 2 === 0) ? 140 : 95;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = '#e8dfd0';
    ctx.fill();
    ctx.strokeStyle = '#2b4155';
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = 'rgba(232, 223, 208, 0.22)';
    for (let i = 0; i < 200; i++) {
        ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 25 + Math.random() * 45, 6);
    }

    return new THREE.CanvasTexture(canvas);
}

// 1.10 Текстура стриженого изумрудного газона (Фото 1 и 2)
function createLawnGrassTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Базовый сочный изумрудный цвет
    ctx.fillStyle = '#3c722a';
    ctx.fillRect(0, 0, 1024, 1024);

    // Чередующиеся полосы газонокосилки
    const stripes = 16;
    const sw = 1024 / stripes;
    for (let s = 0; s < stripes; s++) {
        ctx.fillStyle = s % 2 === 0 ? 'rgba(28, 62, 18, 0.18)' : 'rgba(85, 155, 42, 0.18)';
        ctx.fillRect(s * sw, 0, sw, 1024);
    }

    // Тонкий микрорельеф травинок
    for (let i = 0; i < 28000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 1024;
        const rnd = Math.random();
        if (rnd < 0.38) ctx.fillStyle = 'rgba(70, 138, 35, 0.50)';
        else if (rnd < 0.72) ctx.fillStyle = 'rgba(38, 78, 22, 0.45)';
        else ctx.fillStyle = 'rgba(110, 178, 48, 0.38)';
        ctx.fillRect(x, y, 1.5 + Math.random() * 2, 4 + Math.random() * 5);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(16, 16);
    return tex;
}

// 1.10.1 Органическая мульча для клумб и приствольных кругов (Фото 1)
function createMulchTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#22150f';
    ctx.fillRect(0, 0, 512, 512);

    for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        const w = 4 + Math.random() * 14;
        const h = 2 + Math.random() * 6;
        const rnd = Math.random();
        const r = 45 + rnd * 35;
        const g = 28 + rnd * 20;
        const b = 16 + rnd * 14;
        ctx.fillStyle = `rgb(${Math.floor(r)}, ${Math.floor(g)}, ${Math.floor(b)})`;
        ctx.fillRect(x, y, w, h);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 8);
    return tex;
}

// 1.10.2 Каменная брусчатка дорожек (Фото 1 и 2)
function createStonePathTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Тёмный песочно-серый шов
    ctx.fillStyle = '#5c5750';
    ctx.fillRect(0, 0, 1024, 1024);

    const rows = 32;
    const cols = 12;
    const h = 1024 / rows;
    const w = 1024 / cols;
    const pad = 3.5;

    for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * (w / 2);
        for (let c = -1; c < cols + 2; c++) {
            const x = c * w + offset + pad / 2;
            const y = r * h + pad / 2;
            const bw = w - pad;
            const bh = h - pad;

            // Натуральные оттенки серого, песчаного и гранитного камня
            const rnd = Math.random();
            let cr, cg, cb;
            if (rnd < 0.40) {
                cr = 168 + Math.random() * 20;
                cg = 162 + Math.random() * 18;
                cb = 152 + Math.random() * 16;
            } else if (rnd < 0.75) {
                cr = 188 + Math.random() * 18;
                cg = 180 + Math.random() * 16;
                cb = 168 + Math.random() * 14;
            } else {
                cr = 145 + Math.random() * 18;
                cg = 140 + Math.random() * 16;
                cb = 132 + Math.random() * 14;
            }

            ctx.fillStyle = `rgb(${Math.floor(cr)}, ${Math.floor(cg)}, ${Math.floor(cb)})`;
            ctx.fillRect(x, y, bw, bh);

            // Фаска плитки
            ctx.fillStyle = 'rgba(255,255,255,0.14)';
            ctx.fillRect(x, y, bw, 2);
            ctx.fillRect(x, y, 2, bh);
            ctx.fillStyle = 'rgba(0,0,0,0.18)';
            ctx.fillRect(x, y + bh - 2, bw, 2);
            ctx.fillRect(x + bw - 2, y, 2, bh);
        }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 10);
    return tex;
}

// 1.11 Картина с золотой жилой Кинцуги (Фото 5)
function createKintsugiArtTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f5f3ee';
    ctx.fillRect(0, 0, 512, 1024);

    const g = ctx.createLinearGradient(0, 0, 512, 1024);
    g.addColorStop(0, 'rgba(235, 230, 222, 0.8)');
    g.addColorStop(0.5, 'rgba(215, 210, 200, 0.4)');
    g.addColorStop(1, 'rgba(240, 236, 228, 0.8)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 1024);

    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(256, 60);
    let x = 256;
    for (let y = 90; y < 960; y += 45) {
        x += (Math.random() - 0.5) * 38;
        ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#f5d76e';
    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(256 + (Math.random() - 0.5) * 90, 100 + Math.random() * 820, Math.random() * 6 + 2, 0, Math.PI * 2);
        ctx.fill();
    }
    return new THREE.CanvasTexture(canvas);
}

// 1.12 Абстрактное панно в гостиной (Фото 3)
function createAbstractArtTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Фактурный штукатурный холст с рельефными мазками мастихина
    ctx.fillStyle = '#f5f0e6';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 40; i++) {
        ctx.fillRect(Math.random() * 480, Math.random() * 480, 40 + Math.random() * 80, 4 + Math.random() * 8);
    }
    ctx.fillStyle = 'rgba(220, 212, 200, 0.35)';
    for (let i = 0; i < 30; i++) {
        ctx.fillRect(Math.random() * 480, Math.random() * 480, 50 + Math.random() * 60, 3 + Math.random() * 6);
    }

    // Тонкие черные графичные контуры (Фото 3)
    ctx.strokeStyle = '#3a3a3a';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 150, 200, 180);
    ctx.strokeRect(180, 230, 150, 160);

    // Теплый песочно-бежевый прямоугольник (Фото 3)
    ctx.fillStyle = '#a68f76';
    ctx.fillRect(165, 130, 140, 210);

    // Накладывающийся угольно-графитовый вертикальный блок (Фото 3)
    ctx.fillStyle = '#2c2e32';
    ctx.fillRect(225, 200, 85, 195);

    // Светлый рельефный акцент
    ctx.fillStyle = '#e8dfd0';
    ctx.fillRect(135, 175, 45, 110);

    // Тонкая темная окантовка холста
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 508, 508);

    return new THREE.CanvasTexture(canvas);
}

// 1.13 Табло «ВЫХОД» (Фото 4)
function createExitSignTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#1e8e47';
    ctx.fillRect(0, 0, 256, 64);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ВЫХОД', 128, 32);

    return new THREE.CanvasTexture(canvas);
}

// 1.14 Запеченная радиальная мягкая контактная тень (Ambient Occlusion)
function createRadialShadowTexture(innerRadius = 0.2, maxAlpha = 0.85) {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(128, 128, 128 * innerRadius, 128, 128, 128);
    grad.addColorStop(0, `rgba(12, 10, 8, ${maxAlpha})`);
    grad.addColorStop(0.3, `rgba(15, 12, 9, ${maxAlpha * 0.72})`);
    grad.addColorStop(0.65, `rgba(20, 16, 12, ${maxAlpha * 0.25})`);
    grad.addColorStop(1, 'rgba(24, 20, 16, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
}

// 1.15 Запеченная прямоугольная мягкая контактная тень (Ambient Occlusion)
function createRectShadowTexture(maxAlpha = 0.80) {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(256, 256, 130, 256, 256, 256);
    grad.addColorStop(0, `rgba(10, 8, 6, ${maxAlpha})`);
    grad.addColorStop(0.4, `rgba(14, 11, 8, ${maxAlpha * 0.68})`);
    grad.addColorStop(0.75, `rgba(18, 14, 10, ${maxAlpha * 0.20})`);
    grad.addColorStop(1, 'rgba(22, 18, 14, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
}


// ============================================================================
// 2. ЗВУКОВОЙ ДВИЖОК
// ============================================================================
class SoundController {
    constructor() {
        this.ctx = null;
        this.bgm = document.getElementById('bgm-audio');
        this.isMusicPlaying = false;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
    }

    playWoodClick(pitch = 280, decay = 0.08) {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch * 1.2, now);
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.6, now + decay);

        gain.gain.setValueAtTime(0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + decay);
    }

    playDoorOpen() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(115, now);
        osc.frequency.linearRampToValueAtTime(220, now + 0.55);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
    }

    playSnap() {
        this.playWoodClick(360, 0.12);
        setTimeout(() => this.playWoodClick(520, 0.06), 25);
    }

    playVictory() {
        this.init();
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.5);
            }, idx * 110);
        });
    }

    toggleMusic() {
        this.init();
        if (this.isMusicPlaying) {
            this.bgm.pause();
            this.isMusicPlaying = false;
            document.getElementById('music-icon').textContent = '🔇';
            document.getElementById('music-label').textContent = 'Саундтрек';
        } else {
            this.bgm.play().then(() => {
                this.isMusicPlaying = true;
                document.getElementById('music-icon').textContent = '🎵';
                document.getElementById('music-label').textContent = '«A Place For Always»';
            }).catch(() => {
                showNotification('Нажмите на экран для включения звука');
            });
        }
    }
}

const sound = new SoundController();


// ============================================================================
// 3. THREE.JS НАСТРОЙКА СЦЕНЫ
// ============================================================================
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaed2ea);
scene.fog = new THREE.FogExp2(0xaed2ea, 0.008);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 250);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;

// Свет
const ambientLight = new THREE.AmbientLight(0xfff6ec, 0.65);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xfff9e6, 1.45);
sunLight.position.set(24, 35, 26);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 1;
sunLight.shadow.camera.far = 90;
const d = 34;
sunLight.shadow.camera.left = -d;
sunLight.shadow.camera.right = d;
sunLight.shadow.camera.top = d;
sunLight.shadow.camera.bottom = -d;
sunLight.shadow.bias = -0.0003;
scene.add(sunLight);

const skyFill = new THREE.DirectionalLight(0xb0d4ec, 0.35);
skyFill.position.set(-22, 16, -20);
scene.add(skyFill);

// Тёплое сияние люстры в гостиной (Фото 3)
const loungeLight = new THREE.PointLight(0xffcf80, 1.8, 7.0, 2.0);
loungeLight.position.set(-0.85, 1.88, -2.25);

// Теплые точечные потолочные споты гостиной (Фото 3)
// Мягкий рассеянный акцентный свет на кирпичную стену с зеркалами
const spotWall = new THREE.SpotLight(0xffecd4, 1.5, 9, Math.PI / 4.0, 0.85, 1.6);
spotWall.position.set(1.10, 3.25, -2.2);
spotWall.target.position.set(1.10, 1.8, -4.5);
scene.add(spotWall);
scene.add(spotWall.target);

// Основной направленный галерейный спот на столик с диорамой Woodo с мягким рассеиванием
const spotTable = new THREE.SpotLight(0xfff5ea, 3.2, 7.5, Math.PI / 4.6, 0.88, 1.5);
spotTable.position.set(0.65, 3.25, -1.15);
spotTable.target.position.set(0.65, 0.50, -1.65);
spotTable.castShadow = true;
spotTable.shadow.mapSize.width = 1024;
spotTable.shadow.mapSize.height = 1024;
spotTable.shadow.bias = -0.0004;
scene.add(spotTable);
scene.add(spotTable.target);

// Изначально интерьерные споты выключены для экстерьера
spotWall.intensity = 0.0;
spotTable.intensity = 0.0;
loungeLight.intensity = 0.0;

// Теплый свет в холле (Фото 4)
const foyerLight = new THREE.PointLight(0xffedd2, 1.2, 10);
foyerLight.position.set(1.5, 2.7, 2.5);
foyerLight.intensity = 0.0;

// Загрузчики
const objLoader = new THREE.OBJLoader();
const textureLoader = new THREE.TextureLoader();
const textureCache = {};
function getTexture(path) {
    if (!textureCache[path]) textureCache[path] = textureLoader.load(path);
    return textureCache[path];
}


// ============================================================================
// 4. ДВЕ СЦЕНЫ: ЭКСТЕРЬЕР И АРХИТЕКТУРНО ЗОНИРОВАННЫЙ ИНТЕРЬЕР
// ============================================================================
const exteriorGroup = new THREE.Group();
const interiorGroup = new THREE.Group();
scene.add(exteriorGroup);
scene.add(interiorGroup);

interiorGroup.visible = false;

// ----------------------------------------------------------------------------
// 4.1 ЭКСТЕРЬЕР ГОСТЕВОГО ДОМА «ЛЕС» (ФОТО 1 И 2)
// ----------------------------------------------------------------------------
const BW = 22.0;    // Длина фасада по X
const BD = 9.6;     // Глубина здания по Z
const H1 = 3.5;     // Высота 1-го этажа (кирпич)
const H2 = 3.2;     // Высота 2-го этажа (фахверк)
const ridgeH = 2.55; // Высота конька кровли

const extBrickMat = new THREE.MeshStandardMaterial({ map: createClinkerBrickTexture(), roughness: 0.8 });
const stuccoMat = new THREE.MeshStandardMaterial({ color: 0xeddcba, roughness: 0.75 });
const darkTimberMat = new THREE.MeshStandardMaterial({ color: 0x24160f, roughness: 0.65 });
const roofMat = new THREE.MeshStandardMaterial({ map: createRoofTileTexture(), roughness: 0.55, metalness: 0.15 });
const stonePlinthMat = new THREE.MeshStandardMaterial({ map: createStonePlinthTexture(), roughness: 0.92 });
const winGlassTex = createWindowReflectionTexture();
const glassMat = new THREE.MeshStandardMaterial({
    map: winGlassTex,
    color: 0xffffff,
    roughness: 0.12,
    metalness: 0.35
});

// 1. Бархатистый изумрудный газон с полосами стрижки (Фото 1 и 2)
const lawnMat = new THREE.MeshStandardMaterial({
    map: createLawnGrassTexture(),
    roughness: 0.85,
    metalness: 0.02
});
const lawn = new THREE.Mesh(new THREE.PlaneGeometry(220, 220), lawnMat);
lawn.rotation.x = -Math.PI / 2;
lawn.position.y = -0.04;
lawn.receiveShadow = true;
exteriorGroup.add(lawn);

// Купол летнего неба с облаками и солнцем (Фото 1 и 2)
const skyDomeMat = new THREE.MeshBasicMaterial({
    map: createSkyDomeTexture(),
    side: THREE.BackSide,
    fog: false
});
const skyDome = new THREE.Mesh(new THREE.SphereGeometry(240, 48, 24), skyDomeMat);
skyDome.position.set(0, 0, 0);
exteriorGroup.add(skyDome);

// Дальняя гряда хвойных холмов на горизонте (устраняет плоский срез)
const distantForestGroup = new THREE.Group();
const hillMat = new THREE.MeshStandardMaterial({ color: 0x243e2d, roughness: 0.95 });
for (let h = 0; h < 24; h++) {
    const ang = (h * Math.PI * 2) / 24;
    const dist = 140 + (h % 3) * 15;
    const rad = 22 + (h % 4) * 8;
    const hill = new THREE.Mesh(new THREE.SphereGeometry(rad, 12, 10), hillMat);
    hill.scale.set(1.8, 0.45, 1.2);
    hill.position.set(Math.cos(ang) * dist, rad * 0.35, Math.sin(ang) * dist);
    distantForestGroup.add(hill);
}
exteriorGroup.add(distantForestGroup);


// 2. Брусчатая каменная дорожка (Фото 1 и 2)
const pathMat = new THREE.MeshStandardMaterial({
    map: createStonePathTexture(),
    roughness: 0.78,
    metalness: 0.04
});
const curbMat = new THREE.MeshStandardMaterial({ color: 0x625d57, roughness: 0.9 });

// Главная подъездная аллея к крыльцу
const mainPath = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 28), pathMat);
mainPath.rotation.x = -Math.PI / 2;
mainPath.position.set(1.5, 0.01, 16);
mainPath.receiveShadow = true;
exteriorGroup.add(mainPath);

// Гранитные бордюры вдоль главной аллеи
[-1.85, 1.85].forEach(ox => {
    const curb = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.09, 28), curbMat);
    curb.position.set(1.5 + ox, 0.045, 16);
    curb.castShadow = true;
    curb.receiveShadow = true;
    exteriorGroup.add(curb);
});

// Плавное ответвление к зоне патио
const branchPath = new THREE.Mesh(new THREE.PlaneGeometry(9.5, 2.6), pathMat);
branchPath.rotation.x = -Math.PI / 2;
branchPath.position.set(8.0, 0.01, 10.2);
branchPath.receiveShadow = true;
exteriorGroup.add(branchPath);

// Садовая дорожка к левому фасаду и балкону
const sidePath = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 16), pathMat);
sidePath.rotation.x = -Math.PI / 2;
sidePath.position.set(-8.5, 0.01, 8.5);
sidePath.receiveShadow = true;
exteriorGroup.add(sidePath);

// Ландшафтные светильники-столбики (боларды) вдоль дорожек (Фото 1 и 2)
function createGardenBollard() {
    const bollard = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.35, metalness: 0.85 });
    const lampMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xfffae8,
        emissiveIntensity: 0.75,
        roughness: 0.2
    });

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.42, 16), postMat);
    body.position.y = 0.21;
    const glassTop = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.14, 16), lampMat);
    glassTop.position.y = 0.49;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.03, 16), postMat);
    cap.position.y = 0.57;

    bollard.add(body, glassTop, cap);
    return bollard;
}

// Расстановка столбиков вдоль аллеи и дорожек по Фото 1 и 2
[
    { x: -0.6, z: 6.0 }, { x: 3.6, z: 6.0 },
    { x: -0.6, z: 12.0 }, { x: 3.6, z: 12.0 },
    { x: -0.6, z: 18.0 }, { x: 3.6, z: 18.0 },
    { x: 7.2, z: 9.0 }, { x: 12.5, z: 9.0 }
].forEach(bp => {
    const b = createGardenBollard();
    b.position.set(bp.x, 0, bp.z);
    exteriorGroup.add(b);
});


// 3. Каменный цоколь (Фото 1 и 2)
const plinth = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.35, 0.65, BD + 0.35), stonePlinthMat);
plinth.position.set(0, 0.32, 0);
plinth.receiveShadow = true;
exteriorGroup.add(plinth);

const plinthDrip = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.42, 0.06, BD + 0.42), darkTimberMat);
plinthDrip.position.set(0, 0.65, 0);
exteriorGroup.add(plinthDrip);

// 4. Первый этаж (Красный клинкерный кирпич)
const firstFloor = new THREE.Mesh(new THREE.BoxGeometry(BW, H1 - 0.65, BD), extBrickMat);
firstFloor.position.set(0, (H1 - 0.65) / 2 + 0.65, 0);
firstFloor.castShadow = true;
firstFloor.receiveShadow = true;
exteriorGroup.add(firstFloor);

// Ступенчатый клинкерный карниз под поясом (Фото 1 и 2)
const brickCornice = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.16, 0.28, BD + 0.16), extBrickMat);
brickCornice.position.set(0, H1 - 0.14, 0);
exteriorGroup.add(brickCornice);

// Межэтажный пояс
const belt = new THREE.Mesh(new THREE.BoxGeometry(BW + 0.28, 0.22, BD + 0.28), darkTimberMat);
belt.position.set(0, H1 + 0.02, 0);
belt.castShadow = true;
exteriorGroup.add(belt);

// 5. Второй этаж (Штукатурка)
const secondFloor = new THREE.Mesh(new THREE.BoxGeometry(BW, H2, BD), stuccoMat);
secondFloor.position.set(0, H1 + H2 / 2, 0);
secondFloor.castShadow = true;
secondFloor.receiveShadow = true;
exteriorGroup.add(secondFloor);

// 6. Каркас фахверка и окон 2-го этажа (Фото 1 и 2)
const fachwerkFront = new THREE.Group();
fachwerkFront.position.set(0, H1, BD / 2 + 0.06);

const beamTop = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.18, 0.08), darkTimberMat);
beamTop.position.set(0, H2 - 0.09, 0);
const beamBot = new THREE.Mesh(new THREE.BoxGeometry(BW, 0.18, 0.08), darkTimberMat);
beamBot.position.set(0, 0.09, 0);
fachwerkFront.add(beamTop, beamBot);

const bayCount = 8;
const postW = 0.18;
const postSpacing = BW / bayCount;

for (let i = 0; i <= bayCount; i++) {
    const x = -BW / 2 + i * postSpacing;
    const post = new THREE.Mesh(new THREE.BoxGeometry(postW, H2, 0.08), darkTimberMat);
    post.position.set(x, H2 / 2, 0);
    fachwerkFront.add(post);
}

const windowBays = [1, 2, 3, 4, 5, 6];
windowBays.forEach(b => {
    const bayCenter = -BW / 2 + b * postSpacing + postSpacing / 2;

    const sillBeam = new THREE.Mesh(new THREE.BoxGeometry(postSpacing - 0.18, 0.14, 0.06), darkTimberMat);
    sillBeam.position.set(bayCenter, 0.95, 0);
    fachwerkFront.add(sillBeam);

    const subBraceL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 0.04), darkTimberMat);
    subBraceL.position.set(bayCenter - 0.45, 0.48, 0);
    subBraceL.rotation.z = 0.35;
    const subBraceR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.0, 0.04), darkTimberMat);
    subBraceR.position.set(bayCenter + 0.45, 0.48, 0);
    subBraceR.rotation.z = -0.35;
    fachwerkFront.add(subBraceL, subBraceR);

    const win = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.75, 0.12), darkTimberMat);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 1.55), glassMat);
    glass.position.z = 0.07;
    const mullion2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.55, 0.03), darkTimberMat);
    mullion2.position.z = 0.08;
    const sill2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 0.14), stuccoMat);
    sill2.position.set(0, -0.88, 0.06);
    win.add(frame, glass, mullion2, sill2);
    win.position.set(bayCenter, 1.95, 0.05);
    fachwerkFront.add(win);
});

[0, 7].forEach(b => {
    const bayCenter = -BW / 2 + b * postSpacing + postSpacing / 2;
    const braceLen = Math.hypot(postSpacing * 0.92, H2 * 0.92);
    const braceAng = Math.atan2(H2, postSpacing);

    const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, braceLen, 0.05), darkTimberMat);
    b1.position.set(bayCenter, H2 / 2, 0);
    b1.rotation.z = braceAng;

    const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, braceLen, 0.05), darkTimberMat);
    b2.position.set(bayCenter, H2 / 2, 0);
    b2.rotation.z = -braceAng;

    fachwerkFront.add(b1, b2);
});

exteriorGroup.add(fachwerkFront);

// 7. Двускатная крыша с правильными выносами (Фото 1 и 2)
const roofGroup = new THREE.Group();
const roofOverhangFront = 0.88;
const roofRun = (BD / 2) + roofOverhangFront;
const slopeLen = Math.sqrt(roofRun * roofRun + ridgeH * ridgeH);
const pitchAngle = Math.atan2(ridgeH, roofRun);
const roofLength = BW + 2.8;

const slopeFront = new THREE.Mesh(new THREE.BoxGeometry(roofLength, 0.22, slopeLen), roofMat);
slopeFront.position.set(0, H1 + H2 + ridgeH / 2, roofRun / 2);
slopeFront.rotation.x = pitchAngle;
slopeFront.castShadow = true;
roofGroup.add(slopeFront);

const slopeBack = new THREE.Mesh(new THREE.BoxGeometry(roofLength, 0.22, slopeLen), roofMat);
slopeBack.position.set(0, H1 + H2 + ridgeH / 2, -roofRun / 2);
slopeBack.rotation.x = -pitchAngle;
slopeBack.castShadow = true;
roofGroup.add(slopeBack);

// Ребра фальцевой кровли (Фото 1 и 2)
for (let sx = -roofLength / 2 + 0.4; sx <= roofLength / 2 - 0.4; sx += 0.9) {
    const seamF = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, slopeLen), darkTimberMat);
    seamF.position.set(sx, H1 + H2 + ridgeH / 2 + 0.12, roofRun / 2);
    seamF.rotation.x = pitchAngle;
    const seamB = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, slopeLen), darkTimberMat);
    seamB.position.set(sx, H1 + H2 + ridgeH / 2 + 0.12, -roofRun / 2);
    seamB.rotation.x = -pitchAngle;
    roofGroup.add(seamF, seamB);
}

const ridgeCap = new THREE.Mesh(new THREE.BoxGeometry(roofLength + 0.1, 0.16, 0.4), darkTimberMat);
ridgeCap.position.set(0, H1 + H2 + ridgeH + 0.08, 0);
roofGroup.add(ridgeCap);

for (let rx = -BW / 2 - 0.4; rx <= BW / 2 + 0.4; rx += 0.8) {
    const rafterTail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.75), darkTimberMat);
    rafterTail.position.set(rx, H1 + H2 - 0.08, BD / 2 + 0.38);
    rafterTail.rotation.x = pitchAngle;
    roofGroup.add(rafterTail);
}

const gutterMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.85, roughness: 0.3 });
const gutter = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, roofLength, 16), gutterMat);
gutter.rotation.z = Math.PI / 2;
gutter.position.set(0, H1 + H2 - 0.04, roofRun);
roofGroup.add(gutter);

const downpipeGroup = new THREE.Group();
const elbow = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6), gutterMat);
elbow.rotation.x = 0.45;
elbow.position.set(-BW / 2 + 0.18, H1 + H2 - 0.25, BD / 2 + 0.55);
downpipeGroup.add(elbow);

const downpipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, H1 + H2 - 0.4, 16), gutterMat);
downpipe.position.set(-BW / 2 + 0.18, (H1 + H2 - 0.4) / 2, BD / 2 + 0.22);
downpipeGroup.add(downpipe);
exteriorGroup.add(downpipeGroup);

// Фронтоны здания
function createGable(isLeft) {
    const gGroup = new THREE.Group();
    const gableShape = new THREE.Shape();
    gableShape.moveTo(-BD / 2, 0);
    gableShape.lineTo(BD / 2, 0);
    gableShape.lineTo(0, ridgeH);
    gableShape.closePath();

    const extrudeSettings = { depth: 0.12, bevelEnabled: false };
    const gableCore = new THREE.Mesh(new THREE.ExtrudeGeometry(gableShape, extrudeSettings), stuccoMat);
    gableCore.rotation.y = isLeft ? -Math.PI / 2 : Math.PI / 2;
    gableCore.position.set(isLeft ? -BW / 2 + 0.12 : BW / 2 - 0.12, H1 + H2, 0);
    gGroup.add(gableCore);

    const bargeX = isLeft ? -BW / 2 - 0.12 : BW / 2 + 0.12;
    const bargeboardFront = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, slopeLen), darkTimberMat);
    bargeboardFront.rotation.x = pitchAngle;
    bargeboardFront.position.set(bargeX, H1 + H2 + ridgeH / 2, roofRun / 2);

    const bargeboardBack = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, slopeLen), darkTimberMat);
    bargeboardBack.rotation.x = -pitchAngle;
    bargeboardBack.position.set(bargeX, H1 + H2 + ridgeH / 2, -roofRun / 2);
    gGroup.add(bargeboardFront, bargeboardBack);

    if (isLeft) {
        const xPos = -BW / 2 - 0.04;
        // Нижняя обвязочная балка фронтона
        const gBot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, BD), darkTimberMat);
        gBot.position.set(xPos, H1 + H2 + 0.08, 0);
        gGroup.add(gBot);

        // Центральная стойка конька
        const kingPost = new THREE.Mesh(new THREE.BoxGeometry(0.08, ridgeH, 0.18), darkTimberMat);
        kingPost.position.set(xPos, H1 + H2 + ridgeH / 2, 0);
        gGroup.add(kingPost);

        // Средняя затяжка фронтона
        const gMid = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, BD * 0.65), darkTimberMat);
        gMid.position.set(xPos, H1 + H2 + ridgeH * 0.45, 0);
        gGroup.add(gMid);

        // Боковые вертикальные стойки
        [-1.8, 1.8].forEach(z => {
            const sidePost = new THREE.Mesh(new THREE.BoxGeometry(0.08, ridgeH * 0.65, 0.14), darkTimberMat);
            sidePost.position.set(xPos, H1 + H2 + ridgeH * 0.32, z);
            gGroup.add(sidePost);
        });

        // Диагональные альпийские раскосы (Фото 2)
        [-2.4, -0.9, 0.9, 2.4].forEach(z => {
            const diag = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.9, 0.12), darkTimberMat);
            diag.position.set(xPos, H1 + H2 + 1.1, z);
            diag.rotation.x = (z > 0 ? -1 : 1) * 0.62;
            gGroup.add(diag);
        });

        // Фахверк 2-го этажа на левой торцевой стене
        const leftWallMid = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.16, BD), darkTimberMat);
        leftWallMid.position.set(xPos, H1 + H2 * 0.5, 0);
        gGroup.add(leftWallMid);

        [-2.2, -1.2, 1.2, 2.2].forEach(z => {
            const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, H2, 0.14), darkTimberMat);
            post.position.set(xPos, H1 + H2 / 2, z);
            gGroup.add(post);
        });
    }

    return gGroup;
}
roofGroup.add(createGable(true));
roofGroup.add(createGable(false));
exteriorGroup.add(roofGroup);

// 8. Балкон на левом торце здания с X-перилами и 4 подкосами (Фото 1 и 2)
const balconyGroup = new THREE.Group();
const balcW = 1.45;
const balcD = 6.6;

const balcFloor = new THREE.Mesh(new THREE.BoxGeometry(balcW, 0.22, balcD), darkTimberMat);
balcFloor.position.set(-balcW / 2, 0.11, 0);
balconyGroup.add(balcFloor);

function createXBalconyRailSection(width, depth, isSide) {
    const sec = new THREE.Group();
    const railH = 1.05;

    const topRail = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), darkTimberMat);
    topRail.position.y = railH;
    const botRail = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), darkTimberMat);
    botRail.position.y = 0.12;
    sec.add(topRail, botRail);

    const len = Math.hypot(isSide ? depth : width, railH - 0.2);
    const ang = Math.atan2(railH - 0.2, isSide ? depth : width);

    const bar1 = new THREE.Mesh(new THREE.BoxGeometry(isSide ? 0.05 : len, isSide ? len : 0.05, 0.04), darkTimberMat);
    bar1.position.y = railH / 2 + 0.06;
    bar1.rotation.z = isSide ? 0 : ang;
    bar1.rotation.x = isSide ? ang : 0;

    const bar2 = new THREE.Mesh(new THREE.BoxGeometry(isSide ? 0.05 : len, isSide ? len : 0.05, 0.04), darkTimberMat);
    bar2.position.y = railH / 2 + 0.06;
    bar2.rotation.z = isSide ? 0 : -ang;
    bar2.rotation.x = isSide ? -ang : 0;

    sec.add(bar1, bar2);
    return sec;
}

const balcBayCount = 4;
const balcBayLen = balcD / balcBayCount;
for (let b = 0; b < balcBayCount; b++) {
    const z = -balcD / 2 + b * balcBayLen + balcBayLen / 2;
    const bay = createXBalconyRailSection(0.08, balcBayLen - 0.1, true);
    bay.position.set(-balcW + 0.05, 0, z);
    balconyGroup.add(bay);

    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.15, 0.12), darkTimberMat);
    post.position.set(-balcW + 0.05, 0.58, -balcD / 2 + b * balcBayLen);
    balconyGroup.add(post);
}
const lastBalcPost = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.15, 0.12), darkTimberMat);
lastBalcPost.position.set(-balcW + 0.05, 0.58, balcD / 2);
balconyGroup.add(lastBalcPost);

[-balcD / 2 + 0.05, balcD / 2 - 0.05].forEach(z => {
    const sideBay = createXBalconyRailSection(balcW - 0.1, 0.08, false);
    sideBay.position.set(-balcW / 2, 0, z);
    balconyGroup.add(sideBay);
});

// 4 массивных деревянных кронштейна под балконом (Фото 1 и 2)
[-2.2, -0.7, 0.7, 2.2].forEach(z => {
    const bracket = new THREE.Group();

    // Горизонтальный ригель под балконным настилом (от стены x=0 до края x=-balcW)
    const horizBeam = new THREE.Mesh(new THREE.BoxGeometry(balcW, 0.16, 0.14), darkTimberMat);
    horizBeam.position.set(-balcW / 2, -0.08, 0);

    // Вертикальная настенная балка, примыкающая к кирпичному фасаду
    const vertBeam = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.25, 0.14), darkTimberMat);
    vertBeam.position.set(-0.06, -0.625, 0);

    // 45-градусный диагональный подкос, жестко связывающий низ вертикальной балки и край горизонтальной
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.62, 0.14), darkTimberMat);
    strut.position.set(-0.69, -0.62, 0);
    strut.rotation.z = -0.86;

    // Резной опорный башмак (corbel) внизу на стене
    const corbel = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.18), darkTimberMat);
    corbel.position.set(-0.08, -1.25, 0);

    bracket.add(horizBeam, vertBeam, strut, corbel);
    bracket.position.set(0, 0, z);
    balconyGroup.add(bracket);
});

const balcDoor = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.3, 1.4), darkTimberMat);
balcDoor.position.set(-0.02, 1.2, 0);
balconyGroup.add(balcDoor);

balconyGroup.position.set(-BW / 2, H1 + 0.05, 0);
exteriorGroup.add(balconyGroup);

// 9. Окна 1-го этажа со шпросами и цветущими ящиками (Фото 1 и 2)
function createGroundWindow(w = 1.3, h = 1.85) {
    const g = new THREE.Group();
    // Наружная темная коробка
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.16), darkTimberMat);
    
    // Светлый внутренний притвор
    const innerBead = new THREE.Mesh(new THREE.BoxGeometry(w - 0.12, h - 0.12, 0.14), stuccoMat);
    
    // Отражающее стекло с небом
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.20, h - 0.20), glassMat);
    glass.position.z = 0.085;

    // Оконный переплет (шпросы: крест)
    const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.045, h - 0.20, 0.03), darkTimberMat);
    mullionV.position.z = 0.095;
    const mullionH = new THREE.Mesh(new THREE.BoxGeometry(w - 0.20, 0.045, 0.03), darkTimberMat);
    mullionH.position.set(0, 0.15, 0.095);

    // Белый подоконный отлив
    const sill = new THREE.Mesh(new THREE.BoxGeometry(w + 0.18, 0.07, 0.24), stuccoMat);
    sill.position.set(0, -h / 2 - 0.03, 0.10);
    sill.rotation.x = 0.12;

    // Деревянный ящик с цветами под окном (Фото 1 и 2)
    const boxGroup = new THREE.Group();
    const planter = new THREE.Mesh(
        new THREE.BoxGeometry(w - 0.05, 0.22, 0.24),
        new THREE.MeshStandardMaterial({ color: 0x2e1c12, roughness: 0.85 })
    );
    planter.position.set(0, -h / 2 - 0.22, 0.14);
    boxGroup.add(planter);

    // Пышная листва петуний и яркие цветы
    const flowerCols = [0xd62828, 0xe05780, 0xffffff, 0xf77f00, 0xd62828];
    for (let f = 0; f < 14; f++) {
        const fx = -w / 2 + 0.12 + (f / 13) * (w - 0.24) + (Math.random() - 0.5) * 0.06;
        const leaf = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 6, 6),
            new THREE.MeshStandardMaterial({ color: 0x2e7d32, roughness: 0.7 })
        );
        leaf.position.set(fx, -h / 2 - 0.12, 0.15 + (Math.random() - 0.5) * 0.08);
        leaf.scale.set(1.1, 0.6, 1.0);
        boxGroup.add(leaf);

        const flower = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 6, 6),
            new THREE.MeshStandardMaterial({ color: flowerCols[f % flowerCols.length], roughness: 0.5 })
        );
        flower.position.set(fx + (Math.random() - 0.5) * 0.04, -h / 2 - 0.08, 0.18 + (Math.random() - 0.5) * 0.06);
        boxGroup.add(flower);
    }

    g.add(frame, innerBead, glass, mullionV, mullionH, sill, boxGroup);
    return g;
}

[-8.2, -5.6, 4.4, 7.0, 9.4].forEach(x => {
    const win = createGroundWindow(1.3, 1.85);
    win.position.set(x, 2.1, BD / 2 + 0.08);
    exteriorGroup.add(win);
});

// 10. Входное крыльцо с двускатным козырьком и дверью (Фото 1 и 2)
const entranceGroup = new THREE.Group();
entranceGroup.position.set(1.5, 0, BD / 2);

const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.65, 0.3), darkTimberMat);
doorFrame.position.set(0, 1.32, 0.05);
entranceGroup.add(doorFrame);

const doorGroup = new THREE.Group();
doorGroup.position.set(-0.8, 1.3, 0.12);
const doorLeaf = new THREE.Mesh(new THREE.BoxGeometry(1.55, 2.5, 0.08), new THREE.MeshStandardMaterial({
    color: 0x321f14, roughness: 0.5
}));
doorLeaf.position.set(0.77, 0, 0);

const doorGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.9), new THREE.MeshStandardMaterial({
    color: 0xffe9b3, transparent: true, opacity: 0.45, roughness: 0.2
}));
doorGlass.position.set(0.77, 0, 0.05);
doorGroup.add(doorLeaf, doorGlass);
entranceGroup.add(doorGroup);

const canopy = new THREE.Group();
const canopyW = 2.8;
const canopyD = 1.7;
const canopyPitch = 0.35;

const canopyL = new THREE.Mesh(new THREE.BoxGeometry(canopyW / 2 + 0.2, 0.08, canopyD), darkTimberMat);
canopyL.position.set(-canopyW / 4, 0.22, canopyD / 2);
canopyL.rotation.z = canopyPitch;
const canopyR = new THREE.Mesh(new THREE.BoxGeometry(canopyW / 2 + 0.2, 0.08, canopyD), darkTimberMat);
canopyR.position.set(canopyW / 4, 0.22, canopyD / 2);
canopyR.rotation.z = -canopyPitch;
canopy.add(canopyL, canopyR);

const canopyGable = new THREE.Mesh(new THREE.BoxGeometry(canopyW, 0.12, 0.06), darkTimberMat);
canopyGable.position.set(0, 0.06, canopyD);
canopy.add(canopyGable);

canopy.position.set(0, 2.85, 0.1);
entranceGroup.add(canopy);

[-1.15, 1.15].forEach(x => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.85, 0.18), darkTimberMat);
    col.position.set(x, 1.42, 1.55);
    col.castShadow = true;

    const cStrut = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), darkTimberMat);
    cStrut.position.set(x * 0.85, 2.55, 1.35);
    cStrut.rotation.z = x > 0 ? 0.65 : -0.65;

    entranceGroup.add(col, cStrut);
});

exteriorGroup.add(entranceGroup);

// 11. Фирменная вывеска «ЛЕС ГОСТЕВОЙ ДОМ» (Фото 1 и 2)
const signMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 1.8),
    new THREE.MeshStandardMaterial({
        map: createLogoSignTexture(),
        transparent: true,
        alphaTest: 0.08,
        depthWrite: false,
        roughness: 0.35
    })
);
signMesh.position.set(-2.0, 2.45, BD / 2 + 0.08);
exteriorGroup.add(signMesh);

const addressSign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.38, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.35 })
);
addressSign.position.set(-3.7, 2.75, BD / 2 + 0.08);
exteriorGroup.add(addressSign);

// 12. Стройные изумрудные туи Смарагд (Фото 1 и 2)
function createThujaTree(h = 3.8, r = 0.52) {
    const tree = new THREE.Group();
    const thujaMats = [
        new THREE.MeshStandardMaterial({ color: 0x1f5927, roughness: 0.82 }),
        new THREE.MeshStandardMaterial({ color: 0x184820, roughness: 0.85 }),
        new THREE.MeshStandardMaterial({ color: 0x276e31, roughness: 0.80 }),
        new THREE.MeshStandardMaterial({ color: 0x143c1a, roughness: 0.86 })
    ];

    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.06, 0.12, 0.45, 8),
        new THREE.MeshStandardMaterial({ color: 0x3a2618, roughness: 0.9 })
    );
    trunk.position.y = 0.22;
    tree.add(trunk);

    // Пышные многоярусные мутовки плотной изумрудной хвои (Фото 1 и 2)
    const tiers = 5;
    for (let i = 0; i < tiers; i++) {
        const t = i / (tiers - 1);
        const tierR = r * (1.0 - t * 0.72);
        const tierH = (h * 0.92) / tiers * 1.45;
        const tierY = 0.25 + (h * 0.85) * (i / tiers) + tierH * 0.35;
        const mat = thujaMats[i % thujaMats.length];

        const tierMesh = new THREE.Mesh(new THREE.ConeGeometry(tierR, tierH, 14), mat);
        tierMesh.position.y = tierY;
        tierMesh.rotation.y = (i * Math.PI) / 3;
        tierMesh.castShadow = true;
        tierMesh.receiveShadow = true;
        tree.add(tierMesh);
    }

    // Тонкий заостренный верхушечный шпиль
    const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.24, h * 0.22, 10), thujaMats[2]);
    tip.position.y = h * 0.92;
    tip.castShadow = true;
    tree.add(tip);

    return tree;
}

// 12. Пышные хвойные деревья и кустарники у фасада (Фото 1 и 2)
const mulchBedMat = new THREE.MeshStandardMaterial({
    map: createMulchTexture(),
    roughness: 0.92
});

// 12.1 Приподнятая клумба с органической мульчей вдоль всего фасада
const frontMulchBed = new THREE.Mesh(new THREE.BoxGeometry(20.5, 0.10, 2.4), mulchBedMat);
frontMulchBed.position.set(-0.2, 0.05, BD / 2 + 1.2);
frontMulchBed.receiveShadow = true;
exteriorGroup.add(frontMulchBed);

// Гранитный бордюр клумбы
const mulchCurb1 = new THREE.Mesh(new THREE.BoxGeometry(20.7, 0.12, 0.12), curbMat);
mulchCurb1.position.set(-0.2, 0.06, BD / 2 + 2.4);
mulchCurb1.castShadow = true;
exteriorGroup.add(mulchCurb1);

// Стройные конические туи Смарагд вдоль фасада
const thujaCoords = [
    [-9.4, 0, BD / 2 + 1.2],
    [-7.6, 0, BD / 2 + 1.2],
    [-5.8, 0, BD / 2 + 1.2],
    [-4.0, 0, BD / 2 + 1.2],
    [4.2, 0, BD / 2 + 1.2],
    [6.0, 0, BD / 2 + 1.2],
    [7.8, 0, BD / 2 + 1.2],
    [9.5, 0, BD / 2 + 1.2],
    [-0.5, 0, 11.5],
    [3.5, 0, 12.0],
    [-0.8, 0, 17.5],
    [3.8, 0, 18.0]
];

thujaCoords.forEach(pos => {
    const t = createThujaTree(3.5 + Math.random() * 0.5, 0.52);
    t.position.set(...pos);
    exteriorGroup.add(t);
});

// 13. Пестролистные хосты (Variegated Hostas) с кремовой каймой (Фото 1)
function createVariegatedHosta(x, z, scale = 1.0) {
    const hosta = new THREE.Group();
    const hostaCenterMat = new THREE.MeshStandardMaterial({ color: 0x1f5424, roughness: 0.6 });
    const hostaMarginMat = new THREE.MeshStandardMaterial({ color: 0xc8d890, roughness: 0.65 });

    // Приствольная подушка из органической мульчи под кустом
    const soilMound = new THREE.Mesh(new THREE.CylinderGeometry(0.38 * scale, 0.58 * scale, 0.06, 12), mulchBedMat);
    soilMound.position.y = 0.03;
    soilMound.receiveShadow = true;
    hosta.add(soilMound);

    const numLeaves = 18;
    for (let i = 0; i < numLeaves; i++) {
        const a = (i * Math.PI * 2) / numLeaves + (i % 3) * 0.12;
        const tier = Math.floor(i / 6); // 0 (внешний), 1 (средний), 2 (внутренний)
        const rad = (0.24 + (2 - tier) * 0.12) * scale;
        const pitch = 0.38 + (2 - tier) * 0.18;

        const leafGroup = new THREE.Group();
        const margin = new THREE.Mesh(new THREE.ConeGeometry(0.22 * scale, 0.52 * scale, 6), hostaMarginMat);
        margin.scale.set(1.0, 0.14, 1.0);
        margin.rotation.x = Math.PI / 2;

        const center = new THREE.Mesh(new THREE.ConeGeometry(0.16 * scale, 0.46 * scale, 6), hostaCenterMat);
        center.scale.set(1.0, 0.16, 1.0);
        center.position.set(0, 0.006, 0.015);
        center.rotation.x = Math.PI / 2;

        leafGroup.add(margin, center);
        leafGroup.position.set(Math.cos(a) * rad, 0.07 + tier * 0.06, Math.sin(a) * rad);
        leafGroup.rotation.y = a + Math.PI / 2;
        leafGroup.rotation.x = pitch;
        leafGroup.castShadow = true;
        hosta.add(leafGroup);
    }
    hosta.position.set(x, 0, z);
    return hosta;
}

// Посадки хост вдоль фасадной клумбы и дорожки
const hostaCoords = [
    [-8.5, BD / 2 + 1.4], [-6.7, BD / 2 + 1.4], [-4.9, BD / 2 + 1.4],
    [5.1, BD / 2 + 1.4], [6.9, BD / 2 + 1.4], [8.7, BD / 2 + 1.4],
    [-0.3, 13.5], [3.3, 14.0], [-0.5, 19.5], [3.5, 20.0]
];
hostaCoords.forEach(([hx, hz]) => {
    exteriorGroup.add(createVariegatedHosta(hx, hz, 1.1));
});

// Цветущие гортензии и кустарники в клумбе
function createFloweringShrub(x, z, flowerCol = 0xf5eedb) {
    const shrub = new THREE.Group();
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e6634, roughness: 0.7 });
    const flowerMat = new THREE.MeshStandardMaterial({ color: flowerCol, roughness: 0.55 });

    const base = new THREE.Mesh(new THREE.SphereGeometry(0.65, 8, 8), leafMat);
    base.scale.set(1.2, 0.75, 1.1);
    base.position.y = 0.45;
    base.castShadow = true;
    shrub.add(base);

    for (let f = 0; f < 10; f++) {
        const fa = (f * Math.PI * 2) / 10;
        const fl = new THREE.Mesh(new THREE.SphereGeometry(0.18, 6, 6), flowerMat);
        fl.position.set(Math.cos(fa) * 0.55, 0.52 + Math.sin(f * 2) * 0.15, Math.sin(fa) * 0.55);
        shrub.add(fl);
    }
    shrub.position.set(x, 0, z);
    return shrub;
}
exteriorGroup.add(createFloweringShrub(-3.0, BD / 2 + 1.4, 0xf6efe2));
exteriorGroup.add(createFloweringShrub(3.2, BD / 2 + 1.4, 0xf6efe2));
exteriorGroup.add(createFloweringShrub(10.5, BD / 2 + 1.3, 0xecd2cf));

// 14. Могучие шотландские сосны и горные ели — настоящий хвойный бор «ЛЕС» (Фото 1 и 2)
function createPineTree(h = 13.0, r = 0.35) {
    const tree = new THREE.Group();
    const pineTrunkMat = new THREE.MeshStandardMaterial({ color: 0x543522, roughness: 0.92 });
    const pineNeedleMat1 = new THREE.MeshStandardMaterial({ color: 0x183a1d, roughness: 0.82 });
    const pineNeedleMat2 = new THREE.MeshStandardMaterial({ color: 0x224c26, roughness: 0.85 });

    const trunkSegs = 4;
    const segH = (h * 0.70) / trunkSegs;
    let currY = 0;
    for (let i = 0; i < trunkSegs; i++) {
        const tr1 = r * (1 - i * 0.15);
        const tr2 = r * (1 - (i + 1) * 0.15);
        const seg = new THREE.Mesh(new THREE.CylinderGeometry(tr2, tr1, segH, 8), pineTrunkMat);
        seg.position.set(Math.sin(i * 0.4) * 0.12, currY + segH / 2, Math.cos(i * 0.3) * 0.1);
        seg.castShadow = true;
        tree.add(seg);
        currY += segH;
    }

    const puffCount = 10;
    for (let p = 0; p < puffCount; p++) {
        const pa = p * 2.4;
        const py = currY - segH * 0.7 + (p / puffCount) * (h * 0.35);
        const pr = 1.35 + Math.sin(p * 1.5) * 0.45;
        const puff = new THREE.Mesh(
            new THREE.SphereGeometry(pr, 7, 6),
            p % 2 === 0 ? pineNeedleMat1 : pineNeedleMat2
        );
        puff.scale.set(1.4, 0.55, 1.3);
        puff.position.set(Math.cos(pa) * (0.6 + p * 0.1), py, Math.sin(pa) * (0.6 + p * 0.1));
        puff.castShadow = true;
        puff.receiveShadow = true;
        tree.add(puff);
    }
    return tree;
}

function createSpruceTree(h = 10.0, r = 2.4) {
    const tree = new THREE.Group();
    const spruceTrunkMat = new THREE.MeshStandardMaterial({ color: 0x3d281a, roughness: 0.95 });
    const spruceMat1 = new THREE.MeshStandardMaterial({ color: 0x14351d, roughness: 0.86 });
    const spruceMat2 = new THREE.MeshStandardMaterial({ color: 0x1c4427, roughness: 0.82 });

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.28, h * 0.3, 8), spruceTrunkMat);
    trunk.position.y = (h * 0.3) / 2;
    trunk.castShadow = true;
    tree.add(trunk);

    const tiers = 7;
    for (let i = 0; i < tiers; i++) {
        const frac = i / (tiers - 1);
        const tierR = r * (1.0 - frac * 0.75);
        const tierH = (h * 0.85) / tiers * 1.5;
        const tierY = h * 0.15 + frac * (h * 0.72);
        const cone = new THREE.Mesh(
            new THREE.ConeGeometry(tierR, tierH, 8),
            i % 2 === 0 ? spruceMat1 : spruceMat2
        );
        cone.position.y = tierY;
        cone.rotation.y = (i * Math.PI) / 4;
        cone.castShadow = true;
        cone.receiveShadow = true;
        tree.add(cone);
    }
    return tree;
}

// Плотное лесное окружение: более 50 деревьев, создающих аутентичный фон (Фото 1 и 2)
const forestCoords = [
    // Задний план (густой бор за зданием гостиницы)
    [-36, -20], [-29, -24], [-23, -18], [-16, -22], [-9, -19], [-1, -23], [7, -19], [15, -23], [23, -18], [31, -24], [37, -19],
    [-33, -14], [-26, -15], [-19, -13], [-11, -14], [-3, -15], [5, -14], [13, -13], [21, -15], [29, -13], [35, -14],
    [-30, -7], [-25, -8], [-20, -7], [20, -7], [26, -8], [32, -7],
    // Левый массив (обрамление торца с балконом)
    [-18, -2], [-22, 2], [-17, 6], [-23, 10], [-18, 14], [-24, 18], [-19, 22], [-25, 26], [-18, 30],
    [-28, 1], [-27, 9], [-28, 17], [-29, 25],
    // Правый массив (за зоной патио и вглубь участка)
    [18, -2], [23, 1], [19, 5], [24, 8], [20, 13], [25, 17], [19, 21], [24, 25], [19, 29],
    [28, 2], [29, 10], [28, 18], [29, 26],
    // Передний план (живописное обрамление въезда)
    [-14, 26], [-10, 30], [13, 28], [17, 30]
];

forestCoords.forEach(([fx, fz], idx) => {
    const isPine = (idx % 3 !== 0);
    if (isPine) {
        const p = createPineTree(11 + Math.random() * 5, 0.30 + Math.random() * 0.1);
        p.position.set(fx + (Math.random() - 0.5) * 1.8, 0, fz + (Math.random() - 0.5) * 1.8);
        exteriorGroup.add(p);
    } else {
        const s = createSpruceTree(8.5 + Math.random() * 4.5, 2.2 + Math.random() * 0.6);
        s.position.set(fx + (Math.random() - 0.5) * 1.8, 0, fz + (Math.random() - 0.5) * 1.8);
        exteriorGroup.add(s);
    }
});

// 15. Альпийский деревянный забор по периметру
function createRusticFence(x1, z1, x2, z2) {
    const len = Math.hypot(x2 - x1, z2 - z1);
    const angle = Math.atan2(x2 - x1, z2 - z1);
    const step = 3.2;
    const posts = Math.floor(len / step);

    for (let i = 0; i <= posts; i++) {
        const t = (i * step) / len;
        const px = x1 + (x2 - x1) * t;
        const pz = z1 + (z2 - z1) * t;
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.15, 0.14), darkTimberMat);
        post.position.set(px, 0.55, pz);
        post.castShadow = true;
        exteriorGroup.add(post);

        if (i < posts) {
            [0.42, 0.88].forEach(ry => {
                const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.09, step), darkTimberMat);
                rail.position.set(px + Math.sin(angle) * (step / 2), ry, pz + Math.cos(angle) * (step / 2));
                rail.rotation.y = angle;
                rail.castShadow = true;
                exteriorGroup.add(rail);
            });
        }
    }
}
createRusticFence(-15, 25, -0.8, 25);
createRusticFence(3.8, 25, 16, 25);
createRusticFence(-15, -10, -15, 25);
createRusticFence(16, -10, 16, 25);

// 16. Садовые фонари-столбики вдоль дорожки
function createGardenLantern(x, z) {
    const l = new THREE.Group();
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.75), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
    post.position.y = 0.38;
    const bulb = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.18), new THREE.MeshStandardMaterial({
        color: 0xfff0c4, emissive: 0xffe28a, emissiveIntensity: 0.7
    }));
    bulb.position.y = 0.82;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.04), new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
    cap.position.y = 0.93;
    l.add(post, bulb, cap);
    l.position.set(x, 0, z);
    return l;
}
exteriorGroup.add(createGardenLantern(-0.2, 9.5));
exteriorGroup.add(createGardenLantern(3.2, 9.5));
exteriorGroup.add(createGardenLantern(-0.2, 14.5));
exteriorGroup.add(createGardenLantern(3.2, 14.5));

// 17. Садовое патио с белым 8-угольным зонтом и креслами цвета шалфея (Фото 1)
const patioGroup = new THREE.Group();

// Мощеная каменная площадка с бордюром
const patioSlab = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.12, 7.4), pathMat);
patioSlab.position.set(0, 0.06, 0);
patioSlab.receiveShadow = true;
patioGroup.add(patioSlab);

// Большой 8-угольный белый садовый зонт
const umbrellaGroup = new THREE.Group();
const umbrellaPole = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 3.4, 16), darkTimberMat);
umbrellaPole.position.y = 1.7;
umbrellaPole.castShadow = true;

const umbrellaCanopy = new THREE.Mesh(
    new THREE.ConeGeometry(2.7, 0.95, 8),
    new THREE.MeshStandardMaterial({ color: 0xf6f1e8, roughness: 0.75 })
);
umbrellaCanopy.position.y = 3.25;
umbrellaCanopy.castShadow = true;

const umbrellaFinial = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.06, 0.22, 12), darkTimberMat);
umbrellaFinial.position.y = 3.75;

umbrellaGroup.add(umbrellaPole, umbrellaCanopy, umbrellaFinial);
patioGroup.add(umbrellaGroup);

// Круглый столик с основанием
const patioTable = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.06, 24), darkTimberMat);
patioTable.position.set(0, 0.74, 0);
patioTable.castShadow = true;
const patioTableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.18, 0.72, 16), darkTimberMat);
patioTableBase.position.set(0, 0.36, 0);
patioTableBase.castShadow = true;
patioGroup.add(patioTable, patioTableBase);

// Чайный сервиз
const teapot = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
);
teapot.position.set(0, 0.84, 0);
teapot.scale.set(1.0, 0.8, 1.0);
patioGroup.add(teapot);

// 4 комфортных садовых кресла цвета шалфея с деревянными подлокотниками
function createPatioChair() {
    const chair = new THREE.Group();
    const fabricMat = new THREE.MeshStandardMaterial({ color: 0x4e6b48, roughness: 0.75 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.12, 0.54), fabricMat);
    seat.position.set(0, 0.44, 0);
    seat.castShadow = true;

    const back = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.55, 0.10), fabricMat);
    back.position.set(0, 0.74, -0.24);
    back.rotation.x = -0.16;
    back.castShadow = true;

    [-0.31, 0.31].forEach(ax => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.04, 0.52), darkTimberMat);
        arm.position.set(ax, 0.62, -0.02);
        const fLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.018, 0.44, 8), darkTimberMat);
        fLeg.position.set(ax, 0.22, 0.22);
        const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.018, 0.44, 8), darkTimberMat);
        rLeg.position.set(ax, 0.22, -0.22);
        chair.add(arm, fLeg, rLeg);
    });
    chair.add(seat, back);
    return chair;
}

for (let c = 0; c < 4; c++) {
    const ca = (c * Math.PI * 2) / 4 + 0.35;
    const chair = createPatioChair();
    chair.position.set(Math.cos(ca) * 1.35, 0.06, Math.sin(ca) * 1.35);
    chair.rotation.y = -ca - Math.PI / 2;
    patioGroup.add(chair);
}

patioGroup.position.set(9.5, 0, 9.5);
exteriorGroup.add(patioGroup);

// Подвесной фонарь под козырьком крыльца (Фото 1 и 2)
const porchLantern = new THREE.Group();
const pChain = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.45, 8), darkTimberMat);
pChain.position.y = 2.65;
const pLamp = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.32, 0.22), new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.4 }));
pLamp.position.y = 2.38;
const pGlow = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.16), new THREE.MeshStandardMaterial({ color: 0xffedd0, emissive: 0xffd27d, emissiveIntensity: 1.2 }));
pGlow.position.y = 2.38;
porchLantern.add(pChain, pLamp, pGlow);
porchLantern.position.set(1.5, 0, 4.3);
exteriorGroup.add(porchLantern);


// ----------------------------------------------------------------------------
// 4.2 ИНТЕРЬЕР: АРХИТЕКТУРНО ЗОНИРОВАННЫЙ (ГОСТИНАЯ И ХОЛЛ РЕСЕПШЕНА)
// ----------------------------------------------------------------------------
const IW = 10.0;
const ID = 9.0;
const IH = 3.35;

// Паркет «французская ёлочка»
const intFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(IW, ID),
    new THREE.MeshStandardMaterial({ map: createHerringboneTexture(), roughness: 0.36, metalness: 0.04 })
);
intFloor.rotation.x = -Math.PI / 2;
intFloor.position.set(0, 0.04, 0);
intFloor.receiveShadow = true;
interiorGroup.add(intFloor);

// Белый потолок (DoubleSide исключает просветы неба)
const intCeil = new THREE.Mesh(
    new THREE.PlaneGeometry(IW + 6, ID + 6),
    new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.9, side: THREE.DoubleSide })
);
intCeil.rotation.x = Math.PI / 2;
intCeil.position.set(0, IH, 0);
interiorGroup.add(intCeil);


// ============================================================================
// [ЗОНА 1: ГОСТИНАЯ — ФОТО 3] (Z от -4.5 до 0.5)
// ============================================================================
const loungeGroup = new THREE.Group();
interiorGroup.add(loungeGroup);

// 1. Задняя стена гостиной (Z = -ID / 2 = -4.5, Фото 3):
// 1.1 Левая часть: белая оштукатуренная стена с абстрактной картиной и столиком
const plasterBackLounge = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, IH),
    new THREE.MeshStandardMaterial({ color: 0xf5eee4, roughness: 0.85 })
);
plasterBackLounge.position.set(-2.85, IH / 2, -ID / 2);
plasterBackLounge.receiveShadow = true;
loungeGroup.add(plasterBackLounge);

// Современное текстурное абстрактное панно в тонкой темной раме (Фото 3)
const paintingFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.26, 1.26, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.5 })
);
paintingFrame.position.set(-2.85, 2.05, -ID / 2 + 0.015);

const paintingLounge = new THREE.Mesh(
    new THREE.PlaneGeometry(1.22, 1.22),
    new THREE.MeshStandardMaterial({ map: createAbstractArtTexture(), roughness: 0.72 })
);
paintingLounge.position.set(-2.85, 2.05, -ID / 2 + 0.03);
loungeGroup.add(paintingFrame, paintingLounge);

// Придиванный столик в углу под картиной с двумя желтыми вазами (Фото 3)
const sideTableGroup = new THREE.Group();
const sTop = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.025, 24), new THREE.MeshStandardMaterial({ color: 0x121212 }));
sTop.position.y = 0.52;
const sLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.52), new THREE.MeshStandardMaterial({ color: 0x121212 }));
sLeg.position.y = 0.26;
const sBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 24), new THREE.MeshStandardMaterial({ color: 0x121212 }));
sBase.position.y = 0.01;

// 1-я ваза: ребристая/спиральная горчично-желтая с сухими веточками (Фото 3)
const yellowVase1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 0.20, 16), new THREE.MeshStandardMaterial({ color: 0xf2b522, roughness: 0.25 }));
yellowVase1.position.set(-0.06, 0.62, 0);

const twigMat = new THREE.MeshStandardMaterial({ color: 0x3d3024, roughness: 0.9 });
for (let tw = 0; tw < 3; tw++) {
    const twig = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.005, 0.32, 6), twigMat);
    twig.position.set(-0.06 + (tw - 1) * 0.018, 0.76, (tw - 1) * 0.012);
    twig.rotation.z = (tw - 1) * 0.15;
    sideTableGroup.add(twig);
}

// 2-я ваза: шарообразная керамическая горчично-желтая (Фото 3)
const yellowVase2 = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), new THREE.MeshStandardMaterial({ color: 0xf2b522, roughness: 0.25 }));
yellowVase2.position.set(0.06, 0.575, 0);

// Двойной выключатель на стене (Фото 3)
const switchPlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.08, 0.015),
    new THREE.MeshStandardMaterial({ color: 0x181818, roughness: 0.4 })
);
switchPlate.position.set(0.40, 1.05, -0.32);
sideTableGroup.add(sTop, sLeg, sBase, yellowVase1, yellowVase2, switchPlate);

sideTableGroup.position.set(-2.85, 0, -4.15);
loungeGroup.add(sideTableGroup);

// 1.2 Окно в пол с мягким светом, бежевыми портьерами и полупрозрачным тюлем (Фото 3)
const windowOpening = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 2.75),
    new THREE.MeshStandardMaterial({
        color: 0xfffaee,
        emissive: 0xfff6dd,
        emissiveIntensity: 0.35,
        roughness: 0.3
    })
);
windowOpening.position.set(-1.15, 1.6, -ID / 2 + 0.01);
loungeGroup.add(windowOpening);

const windowTulle = new THREE.Mesh(
    new THREE.PlaneGeometry(1.30, 2.70),
    new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.70, roughness: 0.9 })
);
windowTulle.position.set(-1.15, 1.6, -ID / 2 + 0.03);
loungeGroup.add(windowTulle);

const drapeMat = new THREE.MeshStandardMaterial({ color: 0xc4b7a2, roughness: 0.85 });
[-1.75, -0.55].forEach((dx) => {
    const drape = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.15, 2.7, 16), drapeMat);
    drape.position.set(dx, 1.6, -ID / 2 + 0.08);
    const tie = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.02, 8, 16), new THREE.MeshStandardMaterial({ color: 0x8a7248 }));
    tie.position.set(dx, 1.35, -ID / 2 + 0.08);
    loungeGroup.add(drape, tie);
});

// Левая угловая портьера (Фото 3, видна на самом левом краю кадра)
const leftCornerDrape = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.7, 16), drapeMat);
leftCornerDrape.position.set(-3.75, 1.6, -4.30);
loungeGroup.add(leftCornerDrape);

// 1.3 Акцентная стена из состаренного лофт-кирпича с белой расшивкой (Фото 3, до правого угла)
const brickBackWall = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, IH),
    new THREE.MeshStandardMaterial({ map: createLoftBrickTexture(), roughness: 0.88 })
);
brickBackWall.position.set(2.4, IH / 2, -ID / 2);
brickBackWall.receiveShadow = true;
loungeGroup.add(brickBackWall);

// 2. Три круглых настенных зеркала в тонких черных рамах на кожаных ремнях (Фото 3)
const mirrorPositions = [0.05, 0.85, 1.65];
const mirrorFrameMat = new THREE.MeshStandardMaterial({ color: 0x1a1918, roughness: 0.35, metalness: 0.85 });
const mirrorStrapMat = new THREE.MeshStandardMaterial({ color: 0x3d271a, roughness: 0.72 });
const mirrorBrassMat = new THREE.MeshStandardMaterial({ color: 0xdfb438, metalness: 0.95, roughness: 0.18 });
const mirrorReflectionTex = createMirrorReflectionTexture();

mirrorPositions.forEach(mx => {
    const mirrorGroup = new THREE.Group();
    const mirrorRadius = 0.145; // Диаметр ~29 см над спинкой дивана — строго по Фото 3!

    // Тонкая круглая черная металлическая рамка
    const frame = new THREE.Mesh(
        new THREE.TorusGeometry(mirrorRadius, 0.009, 16, 48),
        mirrorFrameMat
    );
    frame.castShadow = true;
    mirrorGroup.add(frame);

    // Задняя пластина рамы
    const backPlate = new THREE.Mesh(
        new THREE.CylinderGeometry(mirrorRadius, mirrorRadius, 0.015, 32),
        mirrorFrameMat
    );
    backPlate.rotation.x = Math.PI / 2;
    backPlate.position.z = -0.008;
    mirrorGroup.add(backPlate);

    // Зеркальное отражающее полотно с мягким градиентом интерьера
    const mirrorDisc = new THREE.Mesh(
        new THREE.CircleGeometry(mirrorRadius - 0.005, 48),
        new THREE.MeshStandardMaterial({
            map: mirrorReflectionTex,
            roughness: 0.06,
            metalness: 0.92,
            color: 0xffffff
        })
    );
    mirrorDisc.position.z = 0.004;
    mirrorGroup.add(mirrorDisc);

    // Кожаные ремни, сходящиеся треугольником к латунному шканту
    const strapL = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.28, 0.006), mirrorStrapMat);
    strapL.position.set(-0.065, mirrorRadius + 0.11, 0.004);
    strapL.rotation.z = 0.45;

    const strapR = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.28, 0.006), mirrorStrapMat);
    strapR.position.set(0.065, mirrorRadius + 0.11, 0.004);
    strapR.rotation.z = -0.45;

    // Латунная пряжка
    const buckle = new THREE.Mesh(new THREE.TorusGeometry(0.018, 0.005, 12, 24), mirrorBrassMat);
    buckle.position.set(0, mirrorRadius + 0.23, 0.008);

    // Латунный настенный шкант-колышек
    const peg = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.014, 0.04, 16), mirrorBrassMat);
    peg.rotation.x = Math.PI / 2;
    peg.position.set(0, mirrorRadius + 0.23, -0.01);

    mirrorGroup.add(strapL, strapR, buckle, peg);
    mirrorGroup.position.set(mx, 1.34, -ID / 2 + 0.035);
    loungeGroup.add(mirrorGroup);
});

// Белый потолочный плинтус (карниз) для идеального бесшовного стыка со стеной
const crownMoulding = new THREE.Mesh(
    new THREE.BoxGeometry(IW + 0.2, 0.08, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xfbfbfb, roughness: 0.6 })
);
crownMoulding.position.set(0, IH - 0.04, -ID / 2 + 0.04);
loungeGroup.add(crownMoulding);


// 3. Амбарная дверь из горизонтальных досок на черном рельсе (Фото 3)
const barnGroup = new THREE.Group();

const barnHeaderBoard = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.16, 0.04),
    new THREE.MeshStandardMaterial({
        map: getTexture('assets/textures/Used_Brown_Teak_Wood_Base_color.png'),
        color: 0x8a5229,
        roughness: 0.65
    })
);
barnHeaderBoard.position.set(0.3, 2.76, 0.02);
barnGroup.add(barnHeaderBoard);

const barnTrack = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.06, 0.03), new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9, roughness: 0.3 }));
barnTrack.position.set(0.3, 2.76, 0.05);
barnGroup.add(barnTrack);

[-0.45, 0.45].forEach(rx => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.03, 16), new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 }));
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(rx + 0.3, 2.80, 0.07);

    const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.02), new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9 }));
    bracket.position.set(rx + 0.3, 2.62, 0.07);
    barnGroup.add(wheel, bracket);
});

const barnDoor = new THREE.Mesh(
    new THREE.BoxGeometry(1.45, 2.45, 0.06),
    new THREE.MeshStandardMaterial({
        map: createBarnDoorTexture(),
        roughness: 0.60,
        metalness: 0.05
    })
);
barnDoor.position.set(0.3, 1.25, 0.04);

const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.45, 0.04), new THREE.MeshStandardMaterial({ color: 0x151515, metalness: 0.9 }));
doorHandle.position.set(-0.35, 1.25, 0.08);

barnGroup.add(barnDoor, doorHandle);
barnGroup.position.set(2.85, 0, -ID / 2 + 0.04);
loungeGroup.add(barnGroup);

// 4. Боковые стены гостиной (Создают отдельное уютное пространство)
const loungeLeftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, IH),
    new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.8 })
);
loungeLeftWall.rotation.y = Math.PI / 2;
loungeLeftWall.position.set(-3.8, IH / 2, -2.0);
loungeLeftWall.receiveShadow = true;
loungeGroup.add(loungeLeftWall);

const loungeRightWall = new THREE.Mesh(
    new THREE.PlaneGeometry(5.0, IH),
    new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.8 })
);
loungeRightWall.rotation.y = -Math.PI / 2;
loungeRightWall.position.set(3.8, IH / 2, -2.0);
loungeRightWall.receiveShadow = true;
loungeGroup.add(loungeRightWall);

// 5. Передняя стена гостиной (Z = 0.5) с закрытой красивой межкомнатной дверью
const loungeFrontWall = new THREE.Mesh(
    new THREE.PlaneGeometry(7.6, IH),
    new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.8 })
);
loungeFrontWall.rotation.y = Math.PI;
loungeFrontWall.position.set(0, IH / 2, 0.5);
loungeFrontWall.receiveShadow = true;

const doorArchitrave = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 2.4, 0.08),
    darkTimberMat
);
doorArchitrave.position.set(0, 1.2, 0.47);

const loungeInteriorDoor = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 2.3, 0.05),
    new THREE.MeshStandardMaterial({
        map: getTexture('assets/textures/Used_Brown_Teak_Wood_Base_color.png'),
        color: 0x6e4a2c,
        roughness: 0.65
    })
);
loungeInteriorDoor.position.set(0, 1.15, 0.47);

loungeGroup.add(loungeFrontWall, doorArchitrave, loungeInteriorDoor);

// 5.1 Запечённые мягкие контактные тени (Ambient Occlusion) под мебелью в гостиной
const radialShadowTex = createRadialShadowTexture(0.2, 0.85);
const rectShadowTex = createRectShadowTexture(0.80);

// Контактная тень под основанием углового дивана
const sofaShadowMain = new THREE.Mesh(
    new THREE.PlaneGeometry(2.7, 1.35),
    new THREE.MeshBasicMaterial({ map: rectShadowTex, transparent: true, opacity: 0.85, depthWrite: false })
);
sofaShadowMain.rotation.x = -Math.PI / 2;
sofaShadowMain.position.set(1.25, 0.046, -3.78);

const sofaShadowChaise = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 2.15),
    new THREE.MeshBasicMaterial({ map: rectShadowTex, transparent: true, opacity: 0.85, depthWrite: false })
);
sofaShadowChaise.rotation.x = -Math.PI / 2;
sofaShadowChaise.position.set(-0.45, 0.046, -3.35);

loungeGroup.add(sofaShadowMain, sofaShadowChaise);

// Точечные контактные тени под всеми ножками дивана
[
    [-1.02, -2.45], [-0.05, -2.45], [-1.02, -4.2],
    [0.3, -4.2], [1.25, -4.2], [2.35, -4.2],
    [0.3, -3.3], [1.25, -3.3], [2.35, -3.3]
].forEach(([lx, lz]) => {
    const legShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(0.18, 0.18),
        new THREE.MeshBasicMaterial({ map: radialShadowTex, transparent: true, opacity: 0.88, depthWrite: false })
    );
    legShadow.rotation.x = -Math.PI / 2;
    legShadow.position.set(lx, 0.047, lz);
    loungeGroup.add(legShadow);
});

// Контактная тень под придиванным столиком в углу
const sideTableShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 0.65),
    new THREE.MeshBasicMaterial({ map: radialShadowTex, transparent: true, opacity: 0.78, depthWrite: false })
);
sideTableShadow.rotation.x = -Math.PI / 2;
sideTableShadow.position.set(-2.85, 0.046, -4.15);
loungeGroup.add(sideTableShadow);

// 6. Роскошный угловой диван из глубокого сапфирового велюра (Фото 3)
// Глубокий королевский темно-синий цвет, оттоманка строго слева, спинка вплотную к кирпичу
const sofaGroup = new THREE.Group();
const royalNavyVelvetMat = new THREE.MeshStandardMaterial({
    color: 0x18293e,
    roughness: 0.80,
    metalness: 0.02
});
const mustardCushionMat = new THREE.MeshStandardMaterial({ color: 0xd99a18, roughness: 0.60 });
const patternCushionMat = new THREE.MeshStandardMaterial({
    map: createCushionPatternTexture(),
    roughness: 0.75,
    metalness: 0.02
});

// Основание дивана и оттоманки
const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.22, 1.02), royalNavyVelvetMat);
sofaBase.position.set(1.25, 0.25, -3.78);
sofaBase.castShadow = true;

const chaiseBase = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.22, 1.88), royalNavyVelvetMat);
chaiseBase.position.set(-0.45, 0.25, -3.35);
chaiseBase.castShadow = true;

// Сиденья дивана
const seatCushion1 = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.18, 0.95), royalNavyVelvetMat);
seatCushion1.position.set(0.75, 0.42, -3.75);
const seatCushion2 = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.18, 0.95), royalNavyVelvetMat);
seatCushion2.position.set(1.75, 0.42, -3.75);

const chaiseCushion = new THREE.Mesh(new THREE.BoxGeometry(1.02, 0.18, 1.84), royalNavyVelvetMat);
chaiseCushion.position.set(-0.45, 0.42, -3.35);

// Спинка дивана (примыкает к кирпичной стене)
const sofaBackRest = new THREE.Mesh(new THREE.BoxGeometry(3.50, 0.62, 0.22), royalNavyVelvetMat);
sofaBackRest.position.set(0.75, 0.72, -4.22);

// 3 мягкие подушки спинки (строго под 3 зеркалами на кирпичной стене)
[0.05, 0.85, 1.65].forEach(bx => {
    const backPillow = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.48, 0.16), royalNavyVelvetMat);
    backPillow.position.set(bx, 0.74, -4.05);
    backPillow.rotation.x = -0.12;
    sofaGroup.add(backPillow);
});

// Подлокотники
const rightArmRest = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.55, 1.02), royalNavyVelvetMat);
rightArmRest.position.set(2.35, 0.62, -3.78);

const leftArmRest = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.55, 1.88), royalNavyVelvetMat);
leftArmRest.position.set(-1.02, 0.62, -3.35);
sofaGroup.add(rightArmRest, leftArmRest);

// Тонкие конические ножки из черного металла
const sofaLegMat = new THREE.MeshStandardMaterial({ color: 0x0f0f10, metalness: 0.95 });
[
    [-1.02, -2.45], [-0.05, -2.45], [-1.02, -4.2],
    [0.3, -4.2], [1.25, -4.2], [2.35, -4.2],
    [0.3, -3.3], [1.25, -3.3], [2.35, -3.3]
].forEach(([lx, lz]) => {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.014, 0.16), sofaLegMat);
    leg.position.set(lx, 0.08, lz);
    leg.rotation.z = 0.08;
    sofaGroup.add(leg);
});

// Акцентные подушки (Фото 3) — мягко и естественно прислонены к спинке дивана
const pYellowChaise = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.28, 0.10), mustardCushionMat);
pYellowChaise.position.set(-0.48, 0.52, -4.02);
pYellowChaise.rotation.set(-0.32, 0.14, 0.04);

const pPatternChaise = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.10), new THREE.MeshStandardMaterial({ color: 0xe6dec8, roughness: 0.9 }));
pPatternChaise.position.set(-0.22, 0.50, -3.96);
pPatternChaise.rotation.set(-0.30, -0.20, -0.06);

const pYellowRight1 = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.28, 0.10), mustardCushionMat);
pYellowRight1.position.set(1.72, 0.52, -4.02);
pYellowRight1.rotation.set(-0.30, -0.15, 0);

const pYellowRight2 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.36, 0.10), mustardCushionMat);
pYellowRight2.position.set(2.08, 0.52, -3.95);
pYellowRight2.rotation.set(-0.32, 0.22, 0);

const pNavyRight = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.10), royalNavyVelvetMat);
pNavyRight.position.set(1.92, 0.48, -3.82);
pNavyRight.rotation.set(-0.22, 0.06, 0);

sofaGroup.add(
    sofaBase, chaiseBase, seatCushion1, seatCushion2, chaiseCushion,
    sofaBackRest, pYellowChaise, pPatternChaise, pYellowRight1, pYellowRight2, pNavyRight
);
loungeGroup.add(sofaGroup);

// 7. Винтажный восточный ковер (Фото 3)
const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(3.6, 2.6),
    new THREE.MeshStandardMaterial({ map: createCarpetTexture(), roughness: 0.9 })
);
rug.rotation.x = -Math.PI / 2;
rug.position.set(0.65, 0.045, -2.45);
rug.receiveShadow = true;
loungeGroup.add(rug);

// Мягкая контактная тень под журнальным столиком на ковре
const coffeeTableShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.4, 1.4),
    new THREE.MeshBasicMaterial({ map: radialShadowTex, transparent: true, opacity: 0.78, depthWrite: false })
);
coffeeTableShadow.rotation.x = -Math.PI / 2;
coffeeTableShadow.position.set(0.65, 0.048, -1.65);
loungeGroup.add(coffeeTableShadow);

// 8. Круглый кофейный столик из черного мрамора Nero Marquina (Фото 3)
const coffeeTableGroup = new THREE.Group();

const marbleTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 0.55, 0.036, 48),
    new THREE.MeshStandardMaterial({ map: createMarbleTexture(), roughness: 0.14, metalness: 0.35 })
);
marbleTop.position.y = 0.46;
marbleTop.castShadow = true;
marbleTop.receiveShadow = true;
coffeeTableGroup.add(marbleTop);

// Тренога из черного металла
for (let i = 0; i < 3; i++) {
    const a = (i * Math.PI * 2) / 3;
    const leg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.014, 0.014, 0.46, 16),
        new THREE.MeshStandardMaterial({ color: 0x0f0f10, metalness: 0.9, roughness: 0.3 })
    );
    leg.position.set(Math.cos(a) * 0.42, 0.23, Math.sin(a) * 0.42);
    coffeeTableGroup.add(leg);

    const strut = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.016, 0.024),
        new THREE.MeshStandardMaterial({ color: 0x0f0f10, metalness: 0.9 })
    );
    strut.position.set(Math.cos(a) * 0.21, 0.06, Math.sin(a) * 0.21);
    strut.rotation.y = -a;
    coffeeTableGroup.add(strut);
}

// Декор на краю мраморного столика (Фото 3): керамическая чаша со свечой
const candleDish = new THREE.Mesh(
    new THREE.CylinderGeometry(0.038, 0.048, 0.032, 16),
    new THREE.MeshStandardMaterial({ color: 0xf6f4ed, roughness: 0.2 })
);
candleDish.position.set(0.42, 0.495, 0.18);
coffeeTableGroup.add(candleDish);

// Запеченные контактные тени под диорамой и декором на мраморе столика
const dioramaShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.96, 0.96),
    new THREE.MeshBasicMaterial({ map: createRadialShadowTexture(0.35, 0.84), transparent: true, opacity: 0.88, depthWrite: false })
);
dioramaShadow.rotation.x = -Math.PI / 2;
dioramaShadow.position.set(0, 0.481, 0);
coffeeTableGroup.add(dioramaShadow);

const candleShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.18, 0.18),
    new THREE.MeshBasicMaterial({ map: radialShadowTex, transparent: true, opacity: 0.72, depthWrite: false })
);
candleShadow.rotation.x = -Math.PI / 2;
candleShadow.position.set(0.42, 0.481, 0.18);
coffeeTableGroup.add(candleShadow);

// Свободное размещение кофейного столика: 21 см проход до дивана без наслоений
coffeeTableGroup.position.set(0.65, 0, -1.65);
loungeGroup.add(coffeeTableGroup);

// 9. Золотая каскадная хрустальная люстра-водопад (Фото 3 и 4)
function createCrystalWaterfallChandelier() {
    const ch = new THREE.Group();
    const brassMat = new THREE.MeshStandardMaterial({
        color: 0xdfb438,
        metalness: 0.92,
        roughness: 0.18,
        emissive: 0x6a4805,
        emissiveIntensity: 0.45
    });

    const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.88,
        roughness: 0.04,
        metalness: 0.20,
        emissive: 0xfff6d0,
        emissiveIntensity: 0.65
    });

    // Длинный подвес от потолка (доходит до высоты IH = 3.35)
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 1.35, 16), brassMat);
    rod.position.y = 0.68;
    ch.add(rod);

    // Золотой барабан с вертикальным рифлением
    const drumR = 0.38;
    const drumH = 0.18;
    const drumRodCount = 40;
    for (let i = 0; i < drumRodCount; i++) {
        const a = (i * Math.PI * 2) / drumRodCount;
        const drumRod = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, drumH, 8), brassMat);
        drumRod.position.set(Math.cos(a) * drumR, 0, Math.sin(a) * drumR);
        ch.add(drumRod);
    }

    const ringTop = new THREE.Mesh(new THREE.TorusGeometry(drumR, 0.015, 8, 36), brassMat);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = drumH / 2;
    const ringBot = new THREE.Mesh(new THREE.TorusGeometry(drumR, 0.015, 8, 36), brassMat);
    ringBot.rotation.x = Math.PI / 2;
    ringBot.position.y = -drumH / 2;
    ch.add(ringTop, ringBot);

    // 4 каскадных яруса призм (конический водопад по Фото 3)
    const tiers = [
        { r: 0.34, h: 0.30, y: -0.14, count: 34 },
        { r: 0.25, h: 0.26, y: -0.32, count: 24 },
        { r: 0.16, h: 0.22, y: -0.47, count: 15 },
        { r: 0.08, h: 0.16, y: -0.58, count: 8 }
    ];

    tiers.forEach(t => {
        for (let p = 0; p < t.count; p++) {
            const a = (p * Math.PI * 2) / t.count;
            const prism = new THREE.Mesh(new THREE.BoxGeometry(0.022, t.h, 0.014), crystalMat);
            prism.position.set(Math.cos(a) * t.r, t.y, Math.sin(a) * t.r);
            prism.rotation.y = a;
            ch.add(prism);
        }
    });

    return ch;
}

const chandelier = createCrystalWaterfallChandelier();
// Подвешена слева вверху кадра: перед шторами, строго по Фото 3!
chandelier.position.set(-0.85, 1.88, -2.25);
loungeGroup.add(chandelier);
loungeLight.position.set(-0.85, 1.78, -2.25);
loungeGroup.add(loungeLight);


// ============================================================================
// [ЗОНА 2: ХОЛЛ И СТОЙКА РЕСЕПШЕНА — ФОТО 4 И 5] (Z от 0.5 до 4.5)
// ============================================================================
const foyerGroup = new THREE.Group();
interiorGroup.add(foyerGroup);
foyerGroup.add(foyerLight);

// Оливковые стены холла
const oliveWallMat = new THREE.MeshStandardMaterial({ color: 0x5e7054, roughness: 0.75 });

const foyerFrontWall = new THREE.Mesh(new THREE.PlaneGeometry(IW, IH), oliveWallMat);
foyerFrontWall.rotation.y = Math.PI;
foyerFrontWall.position.set(0, IH / 2, ID / 2);
foyerGroup.add(foyerFrontWall);

const fDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.5, 0.1), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 }));
fDoorFrame.position.set(0, 1.25, ID / 2 - 0.05);
const fDoorGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 2.2), glassMat);
fDoorGlass.rotation.y = Math.PI;
fDoorGlass.position.set(0, 1.25, ID / 2 - 0.1);
foyerGroup.add(fDoorFrame, fDoorGlass);

const exitSign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.75, 0.2),
    new THREE.MeshStandardMaterial({
        map: createExitSignTexture(),
        emissive: 0x1e8e47,
        emissiveIntensity: 0.85
    })
);
exitSign.rotation.y = Math.PI;
exitSign.position.set(0, 2.85, ID / 2 - 0.04);
foyerGroup.add(exitSign);

const foyerRightWall = new THREE.Mesh(new THREE.PlaneGeometry(4.0, IH), oliveWallMat);
foyerRightWall.rotation.y = -Math.PI / 2;
foyerRightWall.position.set(IW / 2, IH / 2, 2.5);
foyerGroup.add(foyerRightWall);
// Белый потолок холла (Фото 4 и 5)
const foyerCeil = new THREE.Mesh(
    new THREE.PlaneGeometry(IW + 2, 4.5),
    new THREE.MeshStandardMaterial({ color: 0xfdfdfd, roughness: 0.9, side: THREE.DoubleSide })
);
foyerCeil.rotation.x = Math.PI / 2;
foyerCeil.position.set(0, IH, 2.5);
foyerGroup.add(foyerCeil);


// Ступенчатая стойка ресепшена из бруса (Фото 4)
const receptionGroup = new THREE.Group();
const logMat = new THREE.MeshStandardMaterial({
    map: getTexture('assets/textures/Used_Brown_Teak_Wood_Base_color.png'),
    roughness: 0.62,
    color: 0x8a5229
});

const logTiers = [
    { len: 3.2, ox: 0.0, y: 0.16 },
    { len: 2.9, ox: -0.15, y: 0.45 },
    { len: 3.4, ox: 0.1, y: 0.74 },
    { len: 3.1, ox: -0.05, y: 1.03 }
];

logTiers.forEach(t => {
    const log = new THREE.Mesh(new THREE.BoxGeometry(t.len, 0.28, 0.65), logMat);
    log.position.set(t.ox, t.y, 0);
    log.castShadow = true;
    receptionGroup.add(log);
});

const whitePotMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
const plantMat = new THREE.MeshStandardMaterial({ color: 0x2e6f36, roughness: 0.6 });
[-0.8, -0.4, 0.0].forEach(px => {
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 0.15, 16), whitePotMat);
    pot.position.set(px, 1.25, 0);
    const succulent = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), plantMat);
    succulent.position.set(px, 1.34, 0);
    receptionGroup.add(pot, succulent);
});

receptionGroup.position.set(3.0, 0, 2.7);
foyerGroup.add(receptionGroup);

// Лестница с вертикальными рейками (Фото 4)
const stairGroup = new THREE.Group();
for (let s = 0; s < 10; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.2, 0.28), darkTimberMat);
    step.position.set(0, s * 0.2 + 0.1, s * 0.25);
    stairGroup.add(step);

    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.045, IH, 0.045), darkTimberMat);
    slat.position.set(0.65, IH / 2, s * 0.25);
    stairGroup.add(slat);
}
stairGroup.position.set(4.0, 0, 0.6);
foyerGroup.add(stairGroup);

// Дополнительная стена холла сзади и теплый свет люстры (Фото 4)
const foyerBackWall = new THREE.Mesh(new THREE.PlaneGeometry(IW, IH), oliveWallMat);
foyerBackWall.position.set(0, IH / 2, 0.5);
foyerGroup.add(foyerBackWall);

// Интерьерная люстра в холле (Фото 4)
const foyerChandelier = createCrystalWaterfallChandelier();
foyerChandelier.position.set(1.5, 2.7, 2.5);
foyerChandelier.scale.setScalar(0.75);
foyerGroup.add(foyerChandelier);


// Зона ожидания (Фото 5)
const waitingGroup = new THREE.Group();

const waitingWall = new THREE.Mesh(
    new THREE.PlaneGeometry(7.0, IH),
    new THREE.MeshStandardMaterial({ color: 0xf6f3ea, roughness: 0.8 })
);
waitingWall.rotation.y = Math.PI / 2;
waitingWall.position.set(-IW / 2, IH / 2, 2.0);
waitingGroup.add(waitingWall);

const kintsugiArt = new THREE.Mesh(
    new THREE.PlaneGeometry(1.25, 1.9),
    new THREE.MeshStandardMaterial({ map: createKintsugiArtTexture(), roughness: 0.65 })
);
kintsugiArt.rotation.y = Math.PI / 2;
kintsugiArt.position.set(-IW / 2 + 0.03, 2.15, 2.5);
waitingGroup.add(kintsugiArt);

const consoleGroup = new THREE.Group();
const goldMetalMat = new THREE.MeshStandardMaterial({ color: 0xe5ba45, metalness: 0.85, roughness: 0.25 });
const blackGlassTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.04, 0.45),
    new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.15 })
);
blackGlassTop.position.y = 0.85;

for (let k = -1; k <= 1; k += 2) {
    const l1 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.92, 0.03), goldMetalMat);
    l1.position.set(k * 0.55, 0.42, 0);
    l1.rotation.z = k * 0.25;
    const l2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.92, 0.03), goldMetalMat);
    l2.position.set(k * 0.55, 0.42, 0);
    l2.rotation.z = -k * 0.25;
    consoleGroup.add(l1, l2);
}
consoleGroup.add(blackGlassTop);

const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.35, 16), goldMetalMat);
lampBase.position.set(-0.35, 1.05, 0);
const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.22, 0.28, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
);
lampShade.position.set(-0.35, 1.35, 0);
consoleGroup.add(lampBase, lampShade);
consoleGroup.position.set(-3.5, 0, 2.5);
waitingGroup.add(consoleGroup);

const yellowArmchairMat = new THREE.MeshStandardMaterial({ color: 0xd99e1e, roughness: 0.72 });
function createWingbackChair() {
    const chair = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.32, 0.74), yellowArmchairMat);
    seat.position.y = 0.34;

    const back = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.85, 0.18), yellowArmchairMat);
    back.position.set(0, 0.85, -0.3);
    back.rotation.x = -0.1;

    [-0.36, 0.36].forEach(wx => {
        const wing = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.28), yellowArmchairMat);
        wing.position.set(wx, 0.95, -0.2);
        chair.add(wing);

        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.35, 0.65), yellowArmchairMat);
        arm.position.set(wx * 1.1, 0.55, -0.05);
        chair.add(arm);
    });

    [-0.28, 0.28].forEach(lx => {
        [-0.25, 0.25].forEach(lz => {
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.015, 0.2), darkTimberMat);
            leg.position.set(lx, 0.1, lz);
            chair.add(leg);
        });
    });

    const peacockCushion = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.28, 0.12),
        new THREE.MeshStandardMaterial({ color: 0x2b4c52, roughness: 0.65 })
    );
    peacockCushion.position.set(0, 0.52, -0.18);
    peacockCushion.rotation.x = -0.15;
    chair.add(peacockCushion);

    chair.add(seat, back);
    return chair;
}

const chair1 = createWingbackChair();
chair1.position.set(-3.4, 0, 1.4);
chair1.rotation.y = Math.PI / 2 - 0.25;
const chair2 = createWingbackChair();
chair2.position.set(-3.4, 0, 3.6);
chair2.rotation.y = Math.PI / 2 + 0.25;
waitingGroup.add(chair1, chair2);

const pineGroup = new THREE.Group();
const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.45, 20), new THREE.MeshStandardMaterial({ color: 0x1f1f1f }));
pot.position.y = 0.22;
const pTrunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.8, 12), darkTimberMat);
pTrunk.position.set(0, 1.1, 0);
pTrunk.rotation.z = -0.15;
pineGroup.add(pot, pTrunk);

const needlesMat = new THREE.MeshStandardMaterial({ color: 0x214b24, roughness: 0.85 });
for (let b = 0; b < 12; b++) {
    const ba = (b * Math.PI * 2) / 6;
    const branch = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 8), needlesMat);
    branch.scale.set(1.4, 0.4, 0.9);
    branch.position.set(Math.cos(ba) * (0.35 + (b % 3) * 0.15), 1.2 + b * 0.12, Math.sin(ba) * 0.35);
    pineGroup.add(branch);
}
pineGroup.position.set(-4.0, 0, 4.0);
waitingGroup.add(pineGroup);

foyerGroup.add(waitingGroup);


// ============================================================================
// 5. ДЕРЕВЯННАЯ ДИОРАМА WOODO НА ЖУРНАЛЬНОМ СТОЛИКЕ
// ============================================================================
const diorama = new THREE.Group();
diorama.position.set(0.65, 0.48, -1.65);
loungeGroup.add(diorama);

const beechWoodMaterial = new THREE.MeshStandardMaterial({
    map: getTexture('assets/textures/GWC_Beech_Wood_Floor__BaseColor.png'),
    roughness: 0.65, metalness: 0.05
});

// Круглое деревянное основание Woodo (радиус 0.48м — просторно на мраморном столе 0.55м)
const dioramaBase = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.49, 0.035, 48), beechWoodMaterial);
dioramaBase.position.y = 0.018;
dioramaBase.receiveShadow = true;
diorama.add(dioramaBase);

// В центре — аккуратный чайный столик (радиус 0.15м, высота 0.14м)
const dioramaTable = new THREE.Group();
const tableWoodMat = new THREE.MeshStandardMaterial({
    map: getTexture('assets/textures/Used_Brown_Teak_Wood_Base_color.png'),
    roughness: 0.6, color: 0xb58254
});

objLoader.load('assets/models/TableLegs_1.obj', (legs) => {
    legs.traverse(c => { if (c.isMesh) { c.material = tableWoodMat; c.castShadow = true; } });
    legs.scale.set(0.08, 0.075, 0.08);
    legs.position.y = 0.035;
    dioramaTable.add(legs);
});

const dioramaTableTop = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.15, 0.012, 32),
    tableWoodMat
);
dioramaTableTop.position.y = 0.14;
dioramaTableTop.receiveShadow = true;
dioramaTable.add(dioramaTableTop);
diorama.add(dioramaTable);

// 10 фигурок Woodo — строго выверенные координаты с нулевым пересечением моделей!
const PUZZLE_ITEMS = [
    {
        id: 'chair', name: 'Деревянный стул', icon: '🪑',
        model: 'procedural_chair',
        texture: 'assets/textures/Used_Brown_Teak_Wood_Base_color.png',
        color: 0xba8250, targetPos: [-0.30, 0.035, 0.0], targetRot: [0, Math.PI / 2, 0],
        targetHeight: 0.17, snapRadius: 0.22, planeY: 0.035, hint: 'Поставьте деревянный стул у столика для Бена.'
    },
    {
        id: 'ben', name: 'Лягушонок Бен', icon: '🐸',
        model: 'assets/models/Frog.obj',
        texture: 'assets/textures/Wood_01_Green.png',
        color: 0x6ba353, targetPos: [-0.30, 0.129, 0.0], targetRot: [0, Math.PI / 2, 0],
        targetHeight: 0.10, snapRadius: 0.20, planeY: 0.129, hint: 'Посадите Бена на стульчик у чайного столика!'
    },
    {
        id: 'foxy', name: 'Лисичка Фокси', icon: '🦊',
        model: 'assets/models/Fox.obj',
        texture: 'assets/textures/Wood_01_Foxy.png',
        color: 0xd96b27, targetPos: [0.30, 0.035, 0.0], targetRot: [0, -Math.PI / 2, 0],
        targetHeight: 0.16, snapRadius: 0.25, planeY: 0.035, hint: 'Фокси спешит к чаепитию!'
    },
    {
        id: 'cat', name: 'Спящий котик', icon: '🐱',
        model: 'assets/models/S_Cat.obj',
        texture: 'assets/textures/WoodPink.png',
        color: 0xdeb887, targetPos: [0.0, 0.035, 0.30], targetRot: [0, -0.2, 0],
        targetHeight: 0.08, snapRadius: 0.22, planeY: 0.035, hint: 'Котик сладко свернулся на краю столика.'
    },
    {
        id: 'pot', name: 'Медовый горшочек', icon: '🍯',
        model: 'assets/models/S_ClayPot.obj',
        texture: 'assets/textures/Used_Brown_Teak_Wood_Base_color.png',
        color: 0xb87333, targetPos: [0.0, 0.146, -0.090], targetRot: [0, 0.2, 0],
        targetHeight: 0.045, snapRadius: 0.16, planeY: 0.146, hint: 'Поставьте медовый горшочек в центре столика.'
    },
    {
        id: 'plate', name: 'Тарелочка', icon: '🍽️',
        model: 'assets/models/S_Plate_01.obj',
        texture: 'assets/textures/Wood_01.png',
        color: 0xf4eedb, targetPos: [-0.075, 0.146, -0.010], targetRot: [0, 0, 0],
        targetHeight: 0.012, snapRadius: 0.16, planeY: 0.146, hint: 'Тарелочка для угощений на левой стороне столика.'
    },
    {
        id: 'cup', name: 'Чашка чая', icon: '☕',
        model: 'assets/models/S_Cup_01.obj',
        texture: 'assets/textures/Wood_01_Red.png',
        color: 0xd9534f, targetPos: [0.065, 0.146, -0.020], targetRot: [0, -0.5, 0],
        targetHeight: 0.034, snapRadius: 0.16, planeY: 0.146, hint: 'Ароматная чашка чая на правой стороне столика.'
    },
    {
        id: 'spoon', name: 'Чайная ложечка', icon: '🥄',
        model: 'assets/models/Teaspoon.obj',
        texture: 'assets/textures/wood03_diffuse.png',
        color: 0xecd0a8, targetPos: [0.105, 0.146, 0.055], targetRot: [0, 0.4, 0],
        targetHeight: 0.010, snapRadius: 0.14, planeY: 0.146, hint: 'Чайная ложечка рядом с чашкой.'
    },
    {
        id: 'apple', name: 'Красное яблочко', icon: '🍎',
        model: 'assets/models/Apple_02.obj',
        texture: 'assets/textures/Wood_01_Red.png',
        color: 0xcd3e3a, targetPos: [0.015, 0.146, 0.080], targetRot: [0.2, 0.8, -0.1],
        targetHeight: 0.028, snapRadius: 0.14, planeY: 0.146, hint: 'Спелое красное яблочко на столике.'
    },
    {
        id: 'muffin', name: 'Вкусный кекс', icon: '🧁',
        model: 'assets/models/Muffin_01.obj',
        texture: 'assets/textures/wood03_diffuse.png',
        color: 0xdfa063, targetPos: [-0.065, 0.146, 0.075], targetRot: [0, 0.3, 0],
        targetHeight: 0.030, snapRadius: 0.14, planeY: 0.146, hint: 'Аппетитный кекс рядом с тарелочкой.'
    }
];

const ghostMaterial = new THREE.MeshStandardMaterial({
    color: 0xd9be9b,
    transparent: true,
    opacity: 0.30,
    roughness: 0.85
});
const ghostDimmedMaterial = new THREE.MeshStandardMaterial({
    color: 0xb8a28a,
    transparent: true,
    opacity: 0.12,
    roughness: 0.95
});
const ghostActiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa22,
    transparent: true,
    opacity: 0.85,
    emissive: 0xd9822b,
    emissiveIntensity: 0.6,
    roughness: 0.4
});

const ringMatNormal = new THREE.MeshBasicMaterial({ color: 0xdfa063, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
const ringMatActive = new THREE.MeshBasicMaterial({ color: 0xffaa22, transparent: true, opacity: 0.85, side: THREE.DoubleSide });

let activePieceId = null;
let placedCount = 0;
let heldMesh = null;
const pieceObjects = {};

// Функция создания аутентичного деревянного стула Woodo (4 ножки, сиденье, резная спинка)
function createWoodoChair(isGhost) {
    const chairGroup = new THREE.Group();
    const woodMat = isGhost ? ghostMaterial : new THREE.MeshStandardMaterial({
        map: getTexture('assets/textures/Used_Brown_Teak_Wood_Base_color.png'),
        color: 0xba8250,
        roughness: 0.52,
        metalness: 0.04
    });

    // 1. Четыре деревянные ножки с естественным скандинавским уклоном
    const legGeo = new THREE.CylinderGeometry(0.0055, 0.0040, 0.082, 16);
    const legPositions = [
        [-0.038, 0.041, -0.038],
        [ 0.038, 0.041, -0.038],
        [-0.038, 0.041,  0.038],
        [ 0.038, 0.041,  0.038]
    ];
    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeo, woodMat);
        leg.position.set(...pos);
        leg.rotation.z = -pos[0] * 0.7;
        leg.rotation.x = pos[2] * 0.7;
        leg.castShadow = !isGhost;
        leg.receiveShadow = !isGhost;
        chairGroup.add(leg);
    });

    // 2. Деревянные царги (перемычки) под сиденьем
    const railXGeo = new THREE.BoxGeometry(0.072, 0.008, 0.006);
    const railZGeo = new THREE.BoxGeometry(0.006, 0.008, 0.072);
    const rx1 = new THREE.Mesh(railXGeo, woodMat);
    rx1.position.set(0, 0.075, -0.036);
    rx1.castShadow = !isGhost;
    chairGroup.add(rx1);

    const rx2 = new THREE.Mesh(railXGeo, woodMat);
    rx2.position.set(0, 0.075, 0.036);
    rx2.castShadow = !isGhost;
    chairGroup.add(rx2);

    const rz1 = new THREE.Mesh(railZGeo, woodMat);
    rz1.position.set(-0.036, 0.075, 0);
    rz1.castShadow = !isGhost;
    chairGroup.add(rz1);

    const rz2 = new THREE.Mesh(railZGeo, woodMat);
    rz2.position.set(0.036, 0.075, 0);
    rz2.castShadow = !isGhost;
    chairGroup.add(rz2);

    // 3. Круглое деревянное сиденье со скруглённой фаской (Y от 0.082 до 0.094)
    const seatGeo = new THREE.CylinderGeometry(0.054, 0.051, 0.012, 32);
    const seat = new THREE.Mesh(seatGeo, woodMat);
    seat.position.set(0, 0.088, 0);
    seat.castShadow = !isGhost;
    seat.receiveShadow = !isGhost;
    chairGroup.add(seat);

    // 4. Спинка: две вертикальные стойки сзади (Z = -0.038)
    const backPostGeo = new THREE.CylinderGeometry(0.0050, 0.0045, 0.088, 16);
    [-0.034, 0.034].forEach(x => {
        const post = new THREE.Mesh(backPostGeo, woodMat);
        post.position.set(x, 0.132, -0.038);
        post.rotation.x = -0.05; // лёгкий наклон спинки назад
        post.castShadow = !isGhost;
        chairGroup.add(post);
    });

    // 5. Поперечные планки спинки (3 эргономичные перекладины)
    const slatGeo = new THREE.BoxGeometry(0.064, 0.010, 0.006);
    [0.118, 0.142, 0.166].forEach(y => {
        const slat = new THREE.Mesh(slatGeo, woodMat);
        slat.position.set(0, y, -0.040);
        slat.rotation.x = -0.05;
        slat.castShadow = !isGhost;
        chairGroup.add(slat);
    });

    return chairGroup;
}

// Функция загрузки и нормализации моделей головоломки
function loadPuzzleModel(item, isGhost, callback) {
    if (item.id === 'chair') {
        const chair = createWoodoChair(isGhost);
        callback(chair);
        return;
    }

    const root = new THREE.Group();
    objLoader.load(item.model, (obj) => {
        root.add(obj);

        const box = new THREE.Box3().setFromObject(root);
        const rawSize = new THREE.Vector3();
        box.getSize(rawSize);
        const rawCenter = new THREE.Vector3();
        box.getCenter(rawCenter);

        const offX = -rawCenter.x;
        const offY = -box.min.y;
        const offZ = -rawCenter.z;

        root.children.forEach(child => {
            child.position.x += offX;
            child.position.y += offY;
            child.position.z += offZ;
        });

        const targetH = item.targetHeight || 0.15;
        const scaleFactor = targetH / (rawSize.y || 1);
        root.scale.setScalar(scaleFactor);

        if (isGhost) {
            root.traverse(c => {
                if (c.isMesh) {
                    c.material = ghostMaterial;
                    c.castShadow = false;
                    c.receiveShadow = false;
                }
            });
        } else {
            const isTextured = item.texture && (item.id === 'ben' || item.id === 'foxy' || item.id === 'cat');
            const mat = new THREE.MeshStandardMaterial({
                map: getTexture(item.texture),
                color: isTextured ? 0xffffff : item.color,
                roughness: 0.52,
                metalness: 0.04
            });
            root.traverse(c => {
                if (c.isMesh) {
                    c.material = mat;
                    c.castShadow = true;
                    c.receiveShadow = true;
                }
            });
        }

        callback(root);
    });
}

PUZZLE_ITEMS.forEach(item => {
    item.targetVec = new THREE.Vector3(...item.targetPos);
    item.placed = false;

    const itemContainer = { config: item, realMesh: null, ghostMesh: null, slotMarker: null };
    pieceObjects[item.id] = itemContainer;

    let ringRadius = 0.030;
    if (item.id === 'foxy' || item.id === 'chair' || item.id === 'cat') {
        ringRadius = 0.065;
    } else if (item.id === 'ben') {
        ringRadius = 0.042;
    } else if (item.id === 'spoon') {
        ringRadius = 0.018;
    }

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(ringRadius * 0.72, ringRadius * 1.28, 32),
        ringMatNormal.clone()
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.copy(item.targetVec);
    ring.position.y += 0.002;
    ring.userData = { pieceId: item.id };
    diorama.add(ring);
    itemContainer.slotMarker = ring;

    loadPuzzleModel(item, true, (ghost) => {
        ghost.position.copy(item.targetVec);
        ghost.rotation.set(...item.targetRot);
        ghost.userData = { pieceId: item.id };
        ghost.traverse(c => {
            if (c.isMesh) c.userData = { pieceId: item.id };
        });
        diorama.add(ghost);
        itemContainer.ghostMesh = ghost;

        // Если это Бен — скрываем его ореол и маркер до установки стула!
        if (item.id === 'ben') {
            ghost.visible = false;
            if (itemContainer.slotMarker) itemContainer.slotMarker.visible = false;
        }
    });

    loadPuzzleModel(item, false, (real) => {
        real.position.copy(item.targetVec);
        real.rotation.set(...item.targetRot);
        real.visible = item.placed ? true : false;
        diorama.add(real);
        itemContainer.realMesh = real;
    });
});


// ============================================================================
// 6. СИНЕМАТИК-ПЕРЕХОД И КАМЕРА
// ============================================================================
const GAME_STATE = {
    EXTERIOR: 'EXTERIOR',
    TRANSITION_IN: 'TRANSITION_IN',
    INTERIOR: 'INTERIOR',
    TRANSITION_OUT: 'TRANSITION_OUT'
};

let currentState = GAME_STATE.EXTERIOR;

// Иконический 3/4 ракурс по Фото 1 и 2
const EXTERIOR_CAM_POS = new THREE.Vector3(-14.5, 6.5, 23.5);
const EXTERIOR_CAM_TARGET = new THREE.Vector3(1.5, 2.8, 2.0);

// Идеальный ракурс гостиной по Фото 3: столик с диорамой Woodo в центре, часы и диван в фоне!
const INTERIOR_CAM_POS = new THREE.Vector3(0.60, 1.34, 0.58);
const INTERIOR_CAM_TARGET = new THREE.Vector3(0.65, 0.58, -1.65);

camera.position.copy(EXTERIOR_CAM_POS);
controls.target.copy(EXTERIOR_CAM_TARGET);
controls.maxDistance = 55.0;
controls.minDistance = 5.0;
controls.maxPolarAngle = Math.PI / 2.12;

const flightPointsIn = [
    new THREE.Vector3(-14.5, 6.5, 23.5),
    new THREE.Vector3(-5.5, 4.0, 16.0),
    new THREE.Vector3(1.5, 2.6, 9.0),
    new THREE.Vector3(1.5, 2.0, 5.0),
    new THREE.Vector3(1.5, 1.9, 3.2),
    new THREE.Vector3(0.60, 1.65, 1.3),
    new THREE.Vector3(0.60, 1.34, 0.58)
];

const flightTargetsIn = [
    new THREE.Vector3(1.5, 2.8, 2.0),
    new THREE.Vector3(1.5, 2.4, 4.0),
    new THREE.Vector3(1.5, 2.0, 3.0),
    new THREE.Vector3(1.5, 1.8, 2.0),
    new THREE.Vector3(0.65, 1.1, 0.0),
    new THREE.Vector3(0.65, 0.85, -0.7),
    new THREE.Vector3(0.65, 0.58, -1.65)
];

const camCurveIn = new THREE.CatmullRomCurve3(flightPointsIn);
const targetCurveIn = new THREE.CatmullRomCurve3(flightTargetsIn);

let transitionProgress = 0;
const transitionDuration = 4.2;

function startCinematicEnter() {
    if (currentState !== GAME_STATE.EXTERIOR) return;
    currentState = GAME_STATE.TRANSITION_IN;
    transitionProgress = 0;
    controls.enabled = false;

    interiorGroup.visible = true;
    loungeGroup.visible = true;
    foyerGroup.visible = false;

    sound.playDoorOpen();
    document.getElementById('door-prompt').style.display = 'none';
    showNotification('✨ Входим в гостиницу «ЛЕС»...');

    let openT = 0;
    const doorTimer = setInterval(() => {
        openT += 0.05;
        doorGroup.rotation.y = -Math.min(openT * 1.6, Math.PI / 2.2);
        if (openT >= 1.2) clearInterval(doorTimer);
    }, 20);
}

function startCinematicExit() {
    if (currentState !== GAME_STATE.INTERIOR) return;
    currentState = GAME_STATE.TRANSITION_OUT;
    transitionProgress = 0;
    controls.enabled = false;

    exteriorGroup.visible = true;

    document.getElementById('tray-wrapper').style.display = 'none';
    document.getElementById('progress-card').style.display = 'none';
    document.getElementById('btn-hint').style.display = 'none';
    document.getElementById('btn-reset').style.display = 'none';
    showNotification('🌳 Выходим на улицу...');
}

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

function updateOrbitTip(mode) {
    const tip = document.getElementById('orbit-tip');
    if (!tip) return;
    if (mode === 'exterior') {
        tip.innerHTML = isTouchDevice
            ? '<span>👆 Вращайте пальцем • Нажмите на дверь для входа в гостиницу</span>'
            : '<span>🖱️ Вращайте здание и сад мышью • Колёсико — зум • Нажмите на дверь</span>';
    } else if (mode === 'reception') {
        tip.innerHTML = isTouchDevice
            ? '<span>👆 Вращение и зум пальцами • Стойка ресепшена (Фото 4)</span>'
            : '<span>🖱️ Вращайте камеру мышью • Стойка ресепшена из бруса и лестница (Фото 4)</span>';
    } else if (mode === 'waiting') {
        tip.innerHTML = isTouchDevice
            ? '<span>👆 Вращение и зум пальцами • Зона отдыха и Кинцуги (Фото 5)</span>'
            : '<span>🖱️ Вращайте камеру мышью • Зона отдыха, золотая консоль и картина Кинцуги (Фото 5)</span>';
    } else if (mode === 'lounge') {
        tip.innerHTML = isTouchDevice
            ? '<span>👆 Коснитесь фигурки в лотке, затем места на столике для установки</span>'
            : '<span>🖱️ Выберите фигурку в лотке и перетащите на столик Woodo</span>';
    }
}

function completeEnterTransition() {
    currentState = GAME_STATE.INTERIOR;
    controls.enabled = true;
    camera.fov = 50;
    camera.updateProjectionMatrix();
    camera.position.copy(INTERIOR_CAM_POS);
    controls.target.copy(INTERIOR_CAM_TARGET);
    controls.minDistance = 1.0;
    controls.maxDistance = 3.2;
    controls.minPolarAngle = Math.PI / 4.8;
    controls.maxPolarAngle = Math.PI / 2.25;
    controls.minAzimuthAngle = -Math.PI / 2.4;
    controls.maxAzimuthAngle = Math.PI / 2.4;
    controls.enablePan = false;

    exteriorGroup.visible = false;
    interiorGroup.visible = true;
    loungeGroup.visible = true;
    foyerGroup.visible = false;

    // Уютное, тёплое интерьерное освещение с мягкими тенями (Фото 3)
    scene.background.setHex(0x1a1816);
    scene.fog.color.setHex(0x1a1816);
    sunLight.intensity = 0.0;
    skyFill.intensity = 0.0;
    ambientLight.intensity = 0.20;
    ambientLight.color.setHex(0xffeedb);
    loungeLight.intensity = 1.8;
    spotWall.intensity = 1.4;
    spotTable.intensity = 3.2;
    foyerLight.intensity = 0.0;
    renderer.toneMappingExposure = 0.96;

    document.getElementById('door-prompt').style.display = 'none';
    document.getElementById('header-badge').textContent = 'Гостиная';
    document.querySelectorAll('.loc-tab').forEach(t => t.classList.toggle('active', t.dataset.loc === 'lounge'));
    document.getElementById('location-icon').textContent = '🌳';
    document.getElementById('location-label').textContent = 'На улицу';
    document.getElementById('progress-card').style.display = 'flex';
    document.getElementById('btn-hint').style.display = 'flex';
    document.getElementById('btn-reset').style.display = 'flex';
    document.getElementById('tray-wrapper').style.display = 'flex';
    
    // На мобильных устройствах показываем подсказку по тапу, на ПК скрываем
    if (isTouchDevice) {
        document.getElementById('orbit-tip').style.display = 'flex';
        updateOrbitTip('lounge');
    } else {
        document.getElementById('orbit-tip').style.display = 'none';
    }

    showNotification('Добро пожаловать в гостиную! На столике стоит деревянная диорама Woodo.');
}

function completeExitTransition() {
    currentState = GAME_STATE.EXTERIOR;
    controls.enabled = true;
    camera.position.copy(EXTERIOR_CAM_POS);
    controls.target.copy(EXTERIOR_CAM_TARGET);
    controls.minDistance = 5.0;
    controls.maxDistance = 55.0;
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2.12;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle = Infinity;
    controls.enablePan = true;

    interiorGroup.visible = false;
    exteriorGroup.visible = true;
    doorGroup.rotation.y = 0;

    // Яркое дневное освещение для альпийского экстерьера (Фото 1 и 2)
    scene.background.setHex(0xaed2ea);
    scene.fog.color.setHex(0xaed2ea);
    sunLight.intensity = 1.45;
    sunLight.position.set(24, 35, 26);
    skyFill.intensity = 0.35;
    ambientLight.intensity = 0.65;
    ambientLight.color.setHex(0xfff6ec);
    loungeLight.intensity = 0.0;
    spotWall.intensity = 0.0;
    spotTable.intensity = 0.0;
    foyerLight.intensity = 0.0;
    renderer.toneMappingExposure = 1.12;

    document.getElementById('door-prompt').style.display = 'flex';
    document.getElementById('header-badge').textContent = 'Улица';
    document.querySelectorAll('.loc-tab').forEach(t => t.classList.toggle('active', t.dataset.loc === 'exterior'));
    document.getElementById('location-icon').textContent = '🚪';
    document.getElementById('location-label').textContent = 'Войти в дом';
    document.getElementById('orbit-tip').style.display = 'flex';
    updateOrbitTip('exterior');
}


// ============================================================================
// 7. ЛОТОК ДЕТАЛЕЙ И ПЕРЕТАСКИВАНИЕ
// ============================================================================
const trayContainer = document.getElementById('tray-items');

function renderTray() {
    trayContainer.innerHTML = '';
    PUZZLE_ITEMS.forEach(item => {
        const card = document.createElement('div');
        card.className = `piece-card ${item.id === activePieceId ? 'active' : ''} ${item.placed ? 'placed' : ''}`;
        card.id = `card-${item.id}`;
        card.innerHTML = `
            <div class="piece-icon">${item.icon}</div>
            <div class="piece-title">${item.name}</div>
            <div class="piece-badge">✓</div>
        `;

        card.addEventListener('click', () => {
            if (item.placed || currentState !== GAME_STATE.INTERIOR) return;
            selectPiece(item.id);
        });

        trayContainer.appendChild(card);
    });
}

function selectPiece(id) {
    sound.init();
    if (activePieceId === id) {
        deselectPiece();
        return;
    }

    // Если игрок выбрал Бена, но стул ещё не поставлен — вежливо переключаем на стул
    if (id === 'ben' && pieceObjects['chair'] && !pieceObjects['chair'].config.placed) {
        showNotification('💡 Сначала поставьте деревянный стул для Бена!');
        sound.playWoodClick(360, 0.06);
        selectPiece('chair');
        return;
    }

    if (activePieceId && pieceObjects[activePieceId]) {
        const prev = pieceObjects[activePieceId];
        if (!prev.config.placed && prev.realMesh) prev.realMesh.visible = false;
        if (prev.slotMarker) prev.slotMarker.material = ringMatNormal;
    }

    activePieceId = id;
    const current = pieceObjects[id];
    heldMesh = current.realMesh;

    if (heldMesh) {
        heldMesh.visible = true;
        heldMesh.position.copy(current.config.targetVec);
        heldMesh.position.y += 0.35;
    }

    // Подсвечиваем активный ореол золотым свечением, а остальные неразмещённые деликатно приглушаем
    Object.values(pieceObjects).forEach(p => {
        if (!p.config.placed && p.ghostMesh && p.ghostMesh.visible) {
            const isTarget = (p.config.id === id);
            p.ghostMesh.traverse(c => {
                if (c.isMesh) c.material = isTarget ? ghostActiveMaterial : ghostDimmedMaterial;
            });
        }
        if (!p.config.placed && p.slotMarker && p.slotMarker.visible) {
            p.slotMarker.material = (p.config.id === id) ? ringMatActive : ringMatNormal;
        }
    });

    sound.playWoodClick(320, 0.05);
    showNotification(`Выбрано: ${current.config.name}. ${current.config.hint}`);
    renderTray();
}

function deselectPiece() {
    if (activePieceId && pieceObjects[activePieceId]) {
        const current = pieceObjects[activePieceId];
        if (!current.config.placed && current.realMesh) current.realMesh.visible = false;
    }
    // Возвращаем всем неразмещённым ореолам стандартный спокойный материал
    Object.values(pieceObjects).forEach(p => {
        if (!p.config.placed && p.ghostMesh && p.ghostMesh.visible) {
            p.ghostMesh.traverse(c => {
                if (c.isMesh) c.material = ghostMaterial;
            });
        }
        if (!p.config.placed && p.slotMarker && p.slotMarker.visible) {
            p.slotMarker.material = ringMatNormal;
        }
    });
    activePieceId = null;
    heldMesh = null;
    renderTray();
}

function snapPiece(id) {
    const item = pieceObjects[id];
    if (!item || item.config.placed) return;

    item.config.placed = true;
    placedCount++;

    if (item.realMesh) {
        item.realMesh.position.copy(item.config.targetVec);
        item.realMesh.rotation.set(...item.config.targetRot);
        item.realMesh.visible = true;

        let startY = item.realMesh.position.y;
        let time = 0;
        const anim = setInterval(() => {
            time += 0.05;
            if (item.realMesh) {
                item.realMesh.position.y = startY + Math.sin(time * Math.PI) * 0.08 * Math.exp(-time * 3.0);
            }
            if (time >= 1.0) {
                if (item.realMesh) item.realMesh.position.y = startY;
                clearInterval(anim);
            }
        }, 16);
    }

    if (item.ghostMesh) item.ghostMesh.visible = false;
    if (item.slotMarker) item.slotMarker.visible = false;

    // Особый случай для стула: когда стул установлен, открываем ореол Бена!
    if (id === 'chair' && pieceObjects['ben']) {
        const ben = pieceObjects['ben'];
        if (!ben.config.placed) {
            if (ben.ghostMesh) {
                ben.ghostMesh.visible = true;
                ben.ghostMesh.traverse(c => { if (c.isMesh) c.material = ghostMaterial; });
            }
            if (ben.slotMarker) {
                ben.slotMarker.visible = true;
                ben.slotMarker.material = ringMatNormal;
            }
            showNotification('✨ Стул на месте! Теперь можно посадить Лягушонка Бена 🐸');
        }
    }

    sound.playSnap();

    document.getElementById('placed-count').textContent = placedCount;
    const pct = (placedCount / PUZZLE_ITEMS.length) * 100;
    document.getElementById('progress-fill').style.width = `${pct}%`;

    showNotification(`✨ ${item.config.name} встал на своё место!`);
    activePieceId = null;
    heldMesh = null;

    // Восстанавливаем спокойные материалы для оставшихся неразмещённых деталей
    Object.values(pieceObjects).forEach(p => {
        if (!p.config.placed && p.ghostMesh && p.ghostMesh.visible) {
            p.ghostMesh.traverse(c => { if (c.isMesh) c.material = ghostMaterial; });
        }
        if (!p.config.placed && p.slotMarker && p.slotMarker.visible) {
            p.slotMarker.material = ringMatNormal;
        }
    });

    renderTray();

    if (placedCount === PUZZLE_ITEMS.length) {
        triggerVictory();
    }
}

function triggerVictory() {
    sound.playVictory();
    if (window.confetti) {
        window.confetti({ particleCount: 140, spread: 85, origin: { y: 0.6 } });
    }
    if (window.location.search.includes('nomodal=1')) return;
    setTimeout(() => {
        document.getElementById('victory-modal').classList.add('show');
    }, 800);
}

const dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const planeIntersection = new THREE.Vector3();

let pointerDownTime = 0;
let pointerDownPos = { x: 0, y: 0 };
let isDraggingPiece = false;

window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('#ui-overlay') || e.target.closest('#victory-modal') || e.target.closest('.door-prompt')) {
        return;
    }

    pointerDownTime = performance.now();
    pointerDownPos = { x: e.clientX, y: e.clientY };

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Если деталь уже активна, отключаем вращение OrbitControls на время перемещения пальцем/мышью
    if (activePieceId && heldMesh && currentState === GAME_STATE.INTERIOR) {
        isDraggingPiece = true;
        controls.enabled = false;
    }
});

window.addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (activePieceId && heldMesh && currentState === GAME_STATE.INTERIOR && isDraggingPiece) {
        const item = pieceObjects[activePieceId];
        dragPlane.constant = -(diorama.position.y + item.config.planeY);
        raycaster.setFromCamera(mouse, camera);

        if (raycaster.ray.intersectPlane(dragPlane, planeIntersection)) {
            const localPos = diorama.worldToLocal(planeIntersection.clone());
            heldMesh.position.x = localPos.x;
            heldMesh.position.z = localPos.z;
            heldMesh.position.y = item.config.planeY + 0.05;

            const dist = heldMesh.position.distanceTo(item.config.targetVec);
            if (dist < item.config.snapRadius * 1.3) {
                heldMesh.position.lerp(item.config.targetVec, 0.45);
            }
        }
    }
});

window.addEventListener('pointerup', (e) => {
    // Восстанавливаем вращение камеры
    if (isDraggingPiece) {
        isDraggingPiece = false;
        controls.enabled = true;
    }

    if (e.target.closest('#ui-overlay') || e.target.closest('#victory-modal') || e.target.closest('.door-prompt')) {
        return;
    }

    const elapsed = performance.now() - pointerDownTime;
    const distMoved = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    const isTap = (elapsed < 420 && distMoved < 18);

    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (currentState === GAME_STATE.INTERIOR) {
        // 1. Если деталь удерживалась перетаскиванием — проверяем дистанцию сброса
        if (activePieceId && heldMesh) {
            const item = pieceObjects[activePieceId];
            const dist = heldMesh.position.distanceTo(item.config.targetVec);
            if (dist < item.config.snapRadius * 1.4) {
                snapPiece(activePieceId);
                return;
            }

            // 2. Механика Tap-to-Place (быстрый тап по столику или ореолу)
            if (isTap) {
                raycaster.setFromCamera(mouse, camera);

                // Попадание в плоскость диорамы около цели
                dragPlane.constant = -(diorama.position.y + item.config.planeY);
                if (raycaster.ray.intersectPlane(dragPlane, planeIntersection)) {
                    const localPos = diorama.worldToLocal(planeIntersection.clone());
                    const tapDist = localPos.distanceTo(item.config.targetVec);
                    if (tapDist < item.config.snapRadius * 2.8) {
                        snapPiece(activePieceId);
                        return;
                    }
                }

                // Прямое попадание в маркер-кольцо или призрачную модель
                const targetMeshes = [];
                if (item.slotMarker && item.slotMarker.visible) targetMeshes.push(item.slotMarker);
                if (item.ghostMesh && item.ghostMesh.visible) targetMeshes.push(item.ghostMesh);
                const hits = raycaster.intersectObjects(targetMeshes, true);
                if (hits.length > 0) {
                    snapPiece(activePieceId);
                    return;
                }
            }
        }

        // 3. Тап по любому неразмещённому ореолу на столе для быстрого выбора детали (Tap-to-Select)
        if (isTap) {
            raycaster.setFromCamera(mouse, camera);
            const haloMeshes = [];
            Object.values(pieceObjects).forEach(p => {
                if (!p.config.placed) {
                    if (p.slotMarker && p.slotMarker.visible) haloMeshes.push(p.slotMarker);
                    if (p.ghostMesh && p.ghostMesh.visible) {
                        p.ghostMesh.traverse(c => { if (c.isMesh) haloMeshes.push(c); });
                    }
                }
            });

            const hits = raycaster.intersectObjects(haloMeshes, false);
            if (hits.length > 0) {
                const hitObj = hits[0].object;
                const foundId = hitObj.userData && hitObj.userData.pieceId;
                if (foundId) {
                    if (foundId === activePieceId) {
                        snapPiece(foundId);
                    } else {
                        selectPiece(foundId);
                    }
                    return;
                }
            }
        }
    } else if (currentState === GAME_STATE.EXTERIOR && isTap) {
        // Тап по крыльцу или двери экстерьера
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(entranceGroup.children, true);
        if (hits.length > 0) startCinematicEnter();
    }
});

document.getElementById('door-prompt').addEventListener('click', () => startCinematicEnter());

document.getElementById('btn-toggle-location').addEventListener('click', () => {
    if (currentState === GAME_STATE.EXTERIOR) startCinematicEnter();
    else if (currentState === GAME_STATE.INTERIOR) startCinematicExit();
});

document.getElementById('btn-music').addEventListener('click', () => sound.toggleMusic());

document.getElementById('btn-hint').addEventListener('click', () => {
    if (!activePieceId) {
        const unplaced = PUZZLE_ITEMS.find(p => !p.placed);
        if (unplaced) selectPiece(unplaced.id);
    }
    if (activePieceId) {
        const item = pieceObjects[activePieceId];
        showNotification(`Подсказка: ${item.config.hint}`);
        sound.playWoodClick(440, 0.06);
    }
});

document.getElementById('btn-reset').addEventListener('click', () => resetDiorama());

const btnToggleTray = document.getElementById('btn-toggle-tray');
if (btnToggleTray) {
    btnToggleTray.addEventListener('click', (e) => {
        e.stopPropagation();
        const tray = document.getElementById('tray-wrapper');
        const isCollapsed = tray.classList.toggle('collapsed');
        btnToggleTray.textContent = isCollapsed ? '▲ Показать' : '▼ Скрыть';
    });
}

document.getElementById('btn-victory-restart').addEventListener('click', () => {
    document.getElementById('victory-modal').classList.remove('show');
    resetDiorama();
});
document.getElementById('btn-victory-outside').addEventListener('click', () => {
    document.getElementById('victory-modal').classList.remove('show');
    startCinematicExit();
});

function resetDiorama() {
    placedCount = 0;
    activePieceId = null;
    heldMesh = null;
    PUZZLE_ITEMS.forEach(p => p.placed = false);

    Object.values(pieceObjects).forEach(item => {
        if (item.realMesh) item.realMesh.visible = false;
        if (item.ghostMesh) {
            item.ghostMesh.visible = (item.config.id === 'ben') ? false : true;
            item.ghostMesh.traverse(c => { if (c.isMesh) c.material = ghostMaterial; });
        }
        if (item.slotMarker) {
            item.slotMarker.visible = (item.config.id === 'ben') ? false : true;
            item.slotMarker.material = ringMatNormal;
            item.slotMarker.scale.set(1, 1, 1);
        }
    });

    document.getElementById('placed-count').textContent = '0';
    document.getElementById('progress-fill').style.width = '0%';
    renderTray();
    showNotification('Диорама сброшена. Соберите её заново!');
}

function showNotification(text) {
    const el = document.getElementById('notification');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(el.timer);
    el.timer = setTimeout(() => el.classList.remove('show'), 3200);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Отладочные параметры для перехода и переключения зон
if (window.location.search.includes('view=interior') || window.location.hash === '#interior') {
    completeEnterTransition();
    if (window.location.search.includes('closeup=1')) {
        camera.position.set(0.65, 0.92, -0.92);
        controls.target.set(0.65, 0.54, -1.65);
    }
    if (window.location.search.includes('placed=all')) {
        setTimeout(() => {
            PUZZLE_ITEMS.forEach(p => snapPiece(p.id));
        }, 600);
    }
    const selMatch = window.location.search.match(/[?&]select=([a-zA-Z0-9_]+)/);
    if (selMatch && selMatch[1]) {
        setTimeout(() => {
            selectPiece(selMatch[1]);
        }, 500);
    }
} else if (window.location.search.includes('view=reception') || window.location.hash === '#reception') {
    navigateToLocation('reception');
} else if (window.location.search.includes('view=waiting') || window.location.hash === '#waiting') {
    navigateToLocation('waiting');
} else {
    updateOrbitTip('exterior');
    showNotification('Добро пожаловать в гостиницу «ЛЕС»! Нажмите на вход, чтобы зайти внутрь.');
}



// ============================================================================
// 8. ЦИКЛ АНИМАЦИИ И РЕНДЕРИНГА
// ============================================================================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    if (currentState === GAME_STATE.TRANSITION_IN) {
        transitionProgress += delta / transitionDuration;
        const t = Math.min(transitionProgress, 1.0);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const currentCamPos = camCurveIn.getPoint(ease);
        const currentCamTarget = targetCurveIn.getPoint(ease);

        camera.position.copy(currentCamPos);
        controls.target.copy(currentCamTarget);
        camera.lookAt(currentCamTarget);

        if (t >= 1.0) completeEnterTransition();
    } else if (currentState === GAME_STATE.TRANSITION_OUT) {
        transitionProgress += delta / (transitionDuration * 0.85);
        const t = Math.min(transitionProgress, 1.0);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const invEase = 1.0 - ease;

        const currentCamPos = camCurveIn.getPoint(invEase);
        const currentCamTarget = targetCurveIn.getPoint(invEase);

        camera.position.copy(currentCamPos);
        controls.target.copy(currentCamTarget);
        camera.lookAt(currentCamTarget);

        if (t >= 1.0) completeExitTransition();
    } else {
        controls.update();
    }

    if (currentState === GAME_STATE.INTERIOR) {
        Object.values(pieceObjects).forEach(item => {
            if (item.slotMarker && !item.config.placed && item.slotMarker.visible) {
                const isActive = (item.config.id === activePieceId);
                const speed = isActive ? 6.0 : 2.5;
                const amp = isActive ? 0.16 : 0.05;
                const s = 1 + Math.sin(elapsedTime * speed) * amp;
                item.slotMarker.scale.set(s, s, 1);
            }
        });

        if (pieceObjects['cat'] && pieceObjects['cat'].config.placed && pieceObjects['cat'].realMesh) {
            pieceObjects['cat'].realMesh.position.y = pieceObjects['cat'].config.targetPos[1] + Math.sin(elapsedTime * 2.2) * 0.0015;
        }
        if (pieceObjects['ben'] && pieceObjects['ben'].config.placed && pieceObjects['ben'].realMesh) {
            pieceObjects['ben'].realMesh.rotation.y = pieceObjects['ben'].config.targetRot[1] + Math.sin(elapsedTime * 1.5) * 0.03;
        }
        if (pieceObjects['foxy'] && pieceObjects['foxy'].config.placed && pieceObjects['foxy'].realMesh) {
            pieceObjects['foxy'].realMesh.rotation.y = pieceObjects['foxy'].config.targetRot[1] + Math.sin(elapsedTime * 1.8) * 0.03;
        }
    }

    renderer.render(scene, camera);
}

renderTray();
animate();


// ============================================================================
// НАВИГАЦИЯ ПО ВСЕМ 4 ЗОНАМ ОТЕЛЯ (ФОТО 1-5)
// ============================================================================
function navigateToLocation(loc) {
    document.querySelectorAll('.loc-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.loc === loc);
    });

    if (loc === 'exterior') {
        if (currentState !== GAME_STATE.EXTERIOR) {
            completeExitTransition();
        }
    } else if (loc === 'lounge') {
        completeEnterTransition();
        loungeGroup.visible = true;
        foyerGroup.visible = false;
        camera.position.copy(INTERIOR_CAM_POS);
        controls.target.copy(INTERIOR_CAM_TARGET);
        controls.minDistance = 1.0;
        controls.maxDistance = 3.2;
        controls.minPolarAngle = Math.PI / 4.8;
        controls.maxPolarAngle = Math.PI / 2.25;
        controls.minAzimuthAngle = -Math.PI / 2.4;
        controls.maxAzimuthAngle = Math.PI / 2.4;
        controls.enablePan = false;
        document.getElementById('tray-wrapper').style.display = 'flex';
        document.getElementById('progress-card').style.display = 'flex';
        document.getElementById('btn-hint').style.display = 'flex';
        document.getElementById('btn-reset').style.display = 'flex';
        document.getElementById('header-badge').textContent = 'Гостиная';
        document.getElementById('location-icon').textContent = '🌳';
        document.getElementById('location-label').textContent = 'На улицу';
        if (isTouchDevice) {
            document.getElementById('orbit-tip').style.display = 'flex';
            updateOrbitTip('lounge');
        } else {
            document.getElementById('orbit-tip').style.display = 'none';
        }
    } else if (loc === 'reception') {
        completeEnterTransition();
        loungeGroup.visible = false;
        foyerGroup.visible = true;
        foyerLight.intensity = 2.4;
        camera.position.set(0.2, 1.55, 1.0);
        controls.target.set(2.8, 1.05, 2.7);
        controls.minDistance = 1.0;
        controls.maxDistance = 7.0;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2.1;
        controls.minAzimuthAngle = -Infinity;
        controls.maxAzimuthAngle = Infinity;
        controls.enablePan = true;
        document.getElementById('tray-wrapper').style.display = 'none';
        document.getElementById('progress-card').style.display = 'none';
        document.getElementById('btn-hint').style.display = 'none';
        document.getElementById('btn-reset').style.display = 'none';
        document.getElementById('header-badge').textContent = 'Ресепшен';
        document.getElementById('location-icon').textContent = '🌳';
        document.getElementById('location-label').textContent = 'На улицу';
        document.getElementById('orbit-tip').style.display = 'flex';
        updateOrbitTip('reception');
    } else if (loc === 'waiting') {
        completeEnterTransition();
        loungeGroup.visible = false;
        foyerGroup.visible = true;
        foyerLight.intensity = 2.4;
        camera.position.set(-0.8, 1.5, 2.5);
        controls.target.set(-4.2, 1.2, 2.5);
        controls.minDistance = 1.0;
        controls.maxDistance = 7.0;
        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2.1;
        controls.minAzimuthAngle = -Infinity;
        controls.maxAzimuthAngle = Infinity;
        controls.enablePan = true;
        document.getElementById('tray-wrapper').style.display = 'none';
        document.getElementById('progress-card').style.display = 'none';
        document.getElementById('btn-hint').style.display = 'none';
        document.getElementById('btn-reset').style.display = 'none';
        document.getElementById('header-badge').textContent = 'Зона ожидания';
        document.getElementById('location-icon').textContent = '🌳';
        document.getElementById('location-label').textContent = 'На улицу';
        document.getElementById('orbit-tip').style.display = 'flex';
        updateOrbitTip('waiting');
        showNotification('🪑 Зона ожидания: золотая консоль и картина Кинцуги (Фото 5)');
    }

    if (loc === 'reception') {
        showNotification('🛎️ Ресепшен из бруса и реечная лестница (Фото 4)');
    }

    document.querySelectorAll('.loc-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.loc === loc);
    });
}

document.querySelectorAll('.loc-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const targetLoc = e.currentTarget.dataset.loc;
        navigateToLocation(targetLoc);
    });
});
