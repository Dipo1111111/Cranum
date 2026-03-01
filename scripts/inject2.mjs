import fs from 'fs';

const kbPath = 'KNOWLEDGE BASE.txt';
const dataPath = 'src/data/cranumData.ts';

const kbRaw = fs.readFileSync(kbPath, 'utf8');
const dataRaw = fs.readFileSync(dataPath, 'utf8');

const rows = kbRaw.split('\n');
const blueprints = {};

for (const row of rows) {
    const cols = row.split('\t');
    if (cols.length > 2) {
        const id = cols[0].trim();
        if (!/^[A-Z]\d{3}$/.test(id)) continue;

        const guide = cols[2].trim();
        let howTo = [];
        let why = '';
        let mistakes = '';

        const lines = guide.split('\n').map(l => l.trim()).filter(l => l);
        let section = 'how';

        for (const line of lines) {
            if (line.toLowerCase().startsWith('why it matters:') || line.toLowerCase().startsWith('why this matters:')) {
                section = 'why';
                why += line.replace(/why i?t?h?i?s? matters:/i, '').trim() + ' ';
            } else if (line.toLowerCase().match(/^(common mistakes|safety|note|pro tips|pro tip|timing|avoid|consistency|key point|sensation|practice|transition|caution|where to do it|combination|frequency|what to do|science|form|combine|reminder):/)) {
                section = 'mistakes';
                mistakes += line + ' ';
            } else if (line.toLowerCase().startsWith('how to do it:') || line.toLowerCase().startsWith('what to do:') || line.toLowerCase().startsWith('how to practice:') || line.toLowerCase().startsWith('how to remind yourself:')) {
                section = 'how';
            } else {
                if (section === 'how') {
                    if (line.match(/^(\d+\.|-)\s+/)) {
                        howTo.push(line.replace(/^(\d+\.|-)\s+/, '').trim());
                    } else if (howTo.length === 0) {
                        howTo.push(line);
                    } else {
                        howTo[howTo.length - 1] += ' ' + line;
                    }
                } else if (section === 'why') {
                    why += line + ' ';
                } else if (section === 'mistakes') {
                    mistakes += line + ' ';
                }
            }
        }

        blueprints[id] = {
            howTo: howTo,
            whyItMatters: why.trim().replace(/"/g, '\\"').replace(/'/g, "\\'"),
            commonMistakes: mistakes.trim().replace(/"/g, '\\"').replace(/'/g, "\\'")
        };
    }
}

let out = dataRaw;
for (const [id, bp] of Object.entries(blueprints)) {
    if (bp.howTo.length === 0 && !bp.whyItMatters) continue;

    const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?)(priority:\\s*\\d+,)`);
    out = out.replace(regex, (match, p1, p2) => {
        if (match.includes('blueprint:')) return match;
        const hArrStr = bp.howTo.map(h => `'${h.replace(/'/g, "\\'")}'`).join(',\n                ');
        const bpCode = `blueprint: {
            howTo: [
                ${hArrStr}
            ],
            whyItMatters: '${bp.whyItMatters}',
            ${bp.commonMistakes ? `commonMistakes: '${bp.commonMistakes}'` : ''}
        },
        ${p2}`;
        return p1 + bpCode;
    });
}

fs.writeFileSync(dataPath, out);
console.log('Successfully injected blueprints');
