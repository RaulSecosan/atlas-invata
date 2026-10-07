"""Build a portable read-only SQLite catalogue and SQL seed from site content."""
import json
import sqlite3
from pathlib import Path
root = Path(__file__).resolve().parent.parent
continents = json.loads((root / 'src/data/continents.json').read_text())
countries = json.loads((root / 'src/data/countries.json').read_text())
connection = sqlite3.connect(':memory:')
connection.executescript((root / 'database/schema.sql').read_text())
for c in continents:
    connection.execute('INSERT INTO continents VALUES (?, ?, ?, ?, ?)',
                       (c['id'], c['name'], c['short'], c['description'], c['fact']))
for c in countries:
    connection.execute('INSERT INTO countries VALUES (?, ?, ?, ?, ?)',
                       (c['code'], c['name'], c['continent'], c['note'], c['area']))
    for i, capital in enumerate(c['capital']):
        connection.execute('INSERT INTO capitals VALUES (?, ?, ?)', (c['code'], i, capital))
    path = f"flags/{c['code'].lower()}.svg"
    assert (root / 'public' / path).is_file(), path
    connection.execute('INSERT INTO assets VALUES (?, ?, ?, ?)',
                       (path, 'flag', c['code'], f"Steagul țării {c['name']}"))
connection.execute('INSERT INTO assets VALUES (?, ?, ?, ?)',
                   ('atlas-landscape.png', 'illustration', None, 'Peisaj de atlas în acuarelă'))
connection.commit()
assert connection.execute('PRAGMA foreign_key_check').fetchall() == []
assert connection.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
(root / 'database/content.sql').write_text('\n'.join(connection.iterdump()) + '\n')
with sqlite3.connect(root / 'database/atlas.sqlite') as target:
    connection.backup(target)
print(f'Exported {len(continents)} continents, {len(countries)} countries and 198 assets. SQLite integrity OK.')
