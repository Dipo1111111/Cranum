const fs = require('fs');
const path = require('path');

const kbPath = path.resolve(__dirname, '../KNOWLEDGE BASE.txt');
const dataPath = path.resolve(__dirname, '../src/data/cranumData.ts');

const kbRaw = fs.readFileSync(kbPath, 'utf8');
const dataRaw = fs.readFileSync(dataPath, 'utf8');

const rows = kbRaw.split('\n');

const blueprints = {};

// Parse KB
for (const row of rows) {
    const cols = row.split('\t');
    if (cols.length > 2) {
        let id = cols[0].trim();
        // C001, L001, A001 etc
        if (!/^[A-Z]\d{3}$/.test(id)) continue;

        const detailedGuide = cols[2].trim();

        // Parse the guide
        const howToMatch = detailedGuide.match(/How to [a-zA-Z\s]+:(.*?)(Why this matters:|Why it matters:|$)/s);
        const whyMatch = detailedGuide.match(/Why (?:it|this) matters:(.*?)(Common mistakes:|Safety:|Note:|Pro tips:|Pro tip:|Timing:|Avoid:|Consistency:|Key point:|Sensation:|Practice:|Transition:|Caution:|Where to do it:|Combination:|Frequency:|What to do:|Science:|Form:|Combine:|Reminder:|$)/si);

        let mistakesMatch = null;
        const remainingMatch = detailedGuide.match(/(Common mistakes:|Safety:|Note:|Pro tips:|Pro tip:|Timing:|Avoid:|Consistency:|Key point:|Sensation:|Practice:|Transition:|Caution:|Where to do it:|Combination:|Frequency:|What to do:|Science:|Form:|Combine:|Reminder:)(.*)/si);

        if (remainingMatch) {
            mistakesMatch = remainingMatch[0].trim();
        }

        let howToArr = [];
        if (howToMatch && howToMatch[1]) {
            howToArr = howToMatch[1].split('\n')
                .map(l => l.trim())
                .filter(l => l && l.match(/^\d+\./))
                .map(l => l.replace(/^\d+\.\s*/, '').trim());

            if (howToArr.length === 0) {
                howToArr = howToMatch[1].split('\n').map(l => l.trim()).filter(l => l);
            }
        }

        let whyStr = whyMatch && whyMatch[1] ? whyMatch[1].trim().replace(/\n/g, ' ') : '';
        let mistakesStr = mistakesMatch ? mistakesMatch.trim().replace(/\n/g, ' ') : '';

        // If 'What to do:' is present for lifestyle items
        if (detailedGuide.includes('What to do:')) {
            const whatMatch = detailedGuide.match(/What to do:(.*?)$/s);
            if (whatMatch && whatMatch[1]) {
                howToArr = whatMatch[1].split('\n')
                    .map(l => l.trim())
                    .filter(l => l && (l.match(/^\d+\./) || l.startsWith('- ')))
                    .map(l => l.replace(/^(\d+\.|-)\s*/, '').trim());

                if (howToArr.length === 0) {
                    howToArr = whatMatch[1].split('\n').map(l => l.trim()).filter(l => l);
                }
            }
        }

        blueprints[id] = {
            howTo: howToArr,
            whyItMatters: whyStr.replace(/"/g, '\\"').replace(/'/g, "\\'"),
            commonMistakes: mistakesStr.replace(/"/g, '\\"').replace(/'/g, "\\'")
        };
    }
}

// Inject into cranumData.ts
let currentData = dataRaw;

for (const [id, bp] of Object.entries(blueprints)) {
    if (bp.howTo.length === 0 && !bp.whyItMatters) continue;

    const regex = new RegExp(`id:\\s*'${id}'(.*?)(?=\\}|phase:|fatigueCost:|recoveryTimeHours:|muscleGroup:|category:)`, 's');

    currentData = currentData.replace(regex, (match) => {
        // Prevent duplicate injection
        if (match.includes('blueprint:')) return match;

        const howToStr = bp.howTo.map(h => `'${h.replace(/'/g, "\\'")}'`).join(', ');

        const blueprintCode = `
        blueprint: {
            howTo: [${howToStr}],
            whyItMatters: '${bp.whyItMatters}',
            ${bp.commonMistakes ? `commonMistakes: '${bp.commonMistakes}'` : ''}
        },`;

        // insert blueprint right before the match ends (usually right after tips or priority)
        // Let's insert it before priority
        return match.replace(/priority:/, blueprintCode.trim() + '\n        priority:');
    });
}

// Fallback regex if first didn't match perfectly, attach at end of object
for (const [id, bp] of Object.entries(blueprints)) {
    if (currentData.includes(`id: '${id}'`) && !currentData.includes(`blueprint:`)) {
        // Something missed, can improve
    }
}

fs.writeFileSync(dataPath, currentData);
console.log('Blueprints injected successfully.');
