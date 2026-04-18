const fs = require('fs');

const mdContent = fs.readFileSync('KUCC_Complete_Content.md', 'utf8');

global.window = {};
require('./data.js'); 
const tmpStore = window.store;

const extractContent = (titleFragment) => {
    const lines = mdContent.split('\n');
    let inSection = false;
    let extractedLines = [];
    
    for (const line of lines) {
        if (line.trim().startsWith('## ') && line.toLowerCase().includes(titleFragment.toLowerCase())) {
            inSection = true;
            continue; // Skip the heading line itself
        }
        
        if (inSection) {
            if (line.trim().startsWith('## ') || line.trim().startsWith('# ')) {
                break; // Stop at next heading
            }
            extractedLines.push(line);
        }
    }
    
    if (extractedLines.length === 0) return '';
    
    let content = extractedLines.join('\n').trim();

    // Basic markdown to HTML
    let html = content
        .replace(/### (.*?)\n/g, '<h4>$1</h4>\n')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n- (.*?)(?=\n)/g, '<li>$1</li>')
        .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
        .replace(/<\/ul>\s*<ul>/g, '\n')
        .replace(/\n\n/g, '<br><br>');

    // Basic table
    if (html.includes('|')) {
        let hlines = html.split('\n');
        let inTable = false;
        let newLines = [];
        for (let line of hlines) {
            if (line.trim().startsWith('|')) {
                if (!inTable) {
                    inTable = true;
                    newLines.push('<div style="overflow-x:auto;"><table class="table" style="width:100%; text-align:left; border-collapse:collapse; margin:15px 0;">');
                }
                if (line.includes('|-')) continue;
                const cells = line.split('|').filter(c => c).map(c => c.trim());
                newLines.push('<tr>' + cells.map(c => `<td style="border:1px solid #ddd; padding:8px;">${c}</td>`).join('') + '</tr>');
            } else {
                if (inTable) {
                    inTable = false;
                    newLines.push('</table></div>');
                }
                newLines.push(line);
            }
        }
        if (inTable) newLines.push('</table></div>');
        html = newLines.join('\n');
    }

    return html.replace(/`/g, "'"); 
};

for (let c of tmpStore.committees) {
    const cContent = extractContent(c.name);
    if(cContent) { c.content = cContent; } else { delete c.content; }
}
for (let s of tmpStore.sccs) {
    const sContent = extractContent(s.name);
    if(sContent) { s.content = sContent; } else { delete s.content; }
}
for (let g of tmpStore.groups) {
    const name = g.name.replace('Dance 4 Christ', 'Dance Troupe').replace('Legion of Mary', 'Legion of Mary (Mystical Rose Praesidium)');
    const gContent = extractContent(name);
    if(gContent) { g.content = gContent; } else { delete g.content; }
}

const newJsData = 'const store = ' + JSON.stringify(tmpStore, null, 4) + ';\n\nwindow.store = store;\n';
fs.writeFileSync('data.js', newJsData, 'utf8');
console.log('Update successful');
