import fs from 'fs';

const kbPath = 'KNOWLEDGE BASE.txt';
const dataPath = 'src/data/cranumData.ts';

const kbRaw = fs.readFileSync(kbPath, 'utf8');
const dataRaw = fs.readFileSync(dataPath, 'utf8');

const lines = kbRaw.split(/\r?\n/);
const rows = [];
let currentRow = null;

for (const line of lines) {
    if (/^[A-Z]\d{3}\t/.test(line)) {
        if (currentRow) rows.push(currentRow);
        currentRow = line;
    } else if (currentRow) {
        currentRow += '\n' + line;
    }
}
if (currentRow) rows.push(currentRow);

const blueprints = {};

for (const row of rows) {
    const cols = row.split('\t');
    if (cols.length > 2) {
        const id = cols[0].trim();
        if (!/^[A-Z]\d{3}$/.test(id)) continue;

        let howTo = [];
        let why = '';
        let mistakes = '';

        // Combine all relevant text columns for marker-based parsing
        const blob = cols.slice(2, 5).join('\n');

        if (blob.toLowerCase().includes('why it matters:') || blob.toLowerCase().includes('how to do it:')) {
            const guideLines = blob.split('\n').map(l => l.trim()).filter(l => l);
            let section = 'why';
            for (const line of guideLines) {
                const lower = line.toLowerCase();
                if (lower.includes('why it matters:') || lower.includes('why this matters:')) {
                    section = 'why';
                    why += line.replace(/why i?t?h?i?s? matters:/i, '').trim() + ' ';
                } else if (lower.match(/^(common mistakes|safety|note|pro tips|pro tip|avoid|caution|important|don't):/i)) {
                    section = 'mistakes';
                    mistakes += line + ' ';
                } else if (lower.includes('how to do it:') || lower.includes('what to do:') || lower.includes('instruction:')) {
                    section = 'how';
                } else {
                    if (section === 'how') {
                        howTo.push(line.replace(/^(\d+\.|-)\s+/, '').trim());
                    } else if (section === 'why') {
                        why += line + ' ';
                    } else if (section === 'mistakes') {
                        mistakes += line + ' ';
                    }
                }
            }
        } else {
            // Robust fallback to columns
            why = cols[2].trim();
            howTo = cols[3].split('\n').map(l => l.trim()).filter(l => l).map(l => l.replace(/^(\d+\.|-)\s+/, ''));
            mistakes = cols[4].split('\n').map(l => l.trim()).filter(l => l).join(' ');
        }

        blueprints[id] = {
            howTo: howTo.filter(h => h.length > 0 && !h.toLowerCase().includes('how to do it')),
            whyItMatters: why.trim().replace(/'/g, "\\'").replace(/\r?\n/g, '\\n'),
            commonMistakes: mistakes.trim().replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')
        };
    }
}

let out = dataRaw;
let count = 0;
for (const [id, bp] of Object.entries(blueprints)) {
    if (bp.howTo.length === 0 && !bp.whyItMatters) continue;

    const re = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)(priority:\\s*\\d+)`, 'm');

    if (re.test(out)) {
        const hArrStr = bp.howTo.map(h => `'${h.replace(/'/g, "\\'").replace(/\r?\n/g, '\\n')}'`).join(',\n                ');
        const bpCode = `blueprint: {
            howTo: [
                ${hArrStr}
            ],
            whyItMatters: '${bp.whyItMatters}',
            ${bp.commonMistakes ? `commonMistakes: '${bp.commonMistakes}'` : ''}
        },\n        `;

        out = out.replace(new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)blueprint:\\s*\\{[\\s\\S]*?\\},?\\s*`, 'm'), '$1');
        out = out.replace(re, `$1${bpCode}$2`);
        count++;
    }
}

fs.writeFileSync(dataPath, out);
console.log(`Successfully updated ${count} blueprints with smart combined logic.`);
