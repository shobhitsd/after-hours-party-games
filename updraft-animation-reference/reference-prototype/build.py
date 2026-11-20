"""Build a self-contained offline Updraft HTML — no npm, bundler, CDN or server."""
from pathlib import Path
root=Path(__file__).resolve().parent
html=(root/'index.html').read_text()
css=(root/'src/styles.css').read_text()
html=html.replace('<link rel="stylesheet" href="./src/styles.css" />','<style>\n'+css+'\n</style>')
bundle=[]
for script in ['config.js','game.js','soundscore.js','audio.js','acting.js','postcard.js','logbook.js','skycinema.js','app.js']:
    tag=f'<script defer src="./src/{script}"></script>'
    source=(root/'src'/script).read_text()
    html=html.replace(tag,'')
    bundle.append('<script>\n'+source+'\n</script>')
html=html.replace('</body>','\n'.join(bundle)+'\n</body>')
out=root/'updraft-play.html'
out.write_text(html,encoding='utf-8')
print(f'Wrote {out} ({out.stat().st_size:,} bytes)')
