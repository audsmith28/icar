const Database = require('better-sqlite3');

try {
    const db = new Database('data/ICAR Collective.db', { readonly: true });

    console.log("--- Tables ---");
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();

    for (const table of tables) {
        console.log(`\nTable: ${table.name}`);
        const columns = db.prepare(`PRAGMA table_info('${table.name}')`).all();
        for (const col of columns) {
            console.log(`  - ${col.name} (${col.type})`);
        }
    }

    db.close();
} catch (err) {
    console.error("Error:", err.message);
}
