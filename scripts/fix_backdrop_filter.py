from pathlib import Path
import re
root = Path('.')
for path in root.rglob('*'):
    if path.suffix.lower() in {'.html', '.css'}:
        text = path.read_text(encoding='utf-8')
        lines = text.splitlines(True)
        out = []
        for i, line in enumerate(lines):
            if re.match(r'^[ \t]*backdrop-filter:', line):
                prev = lines[i-1] if i > 0 else ''
                if not re.match(r'^[ \t]*-webkit-backdrop-filter:', prev):
                    new_line = re.sub(r'^([ \t]*)(backdrop-filter:.*)$', r'\1-webkit-\2', line)
                    out.append(new_line)
            out.append(line)
        new_text = ''.join(out)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')
