import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { LogEntry } from './types/interfaces';

const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

export const initializeDb = async () => {
    const db = await dbPromise;
    await db.exec(`CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT,
    url TEXT,
    method TEXT,
    body TEXT,
    status INTEGER,
    response TEXT,
    requestHeaders TEXT, 
    responseHeaders TEXT 
  )`);
    await migrateDb(db);
};

const migrateDb = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
    const existingColumns = await db.all(`PRAGMA table_info(logs)`);
    const columns = existingColumns.map(column => column.name);

    if (!columns.includes('requestHeaders')) {
        await db.run(`ALTER TABLE logs ADD COLUMN requestHeaders TEXT`);
    }

    if (!columns.includes('responseHeaders')) {
        await db.run(`ALTER TABLE logs ADD COLUMN responseHeaders TEXT`);
    }
};

export const addLog = async (log: LogEntry) => {
    const db = await dbPromise;
    await db.run(
        `INSERT INTO logs (timestamp, url, method, body, status, response, requestHeaders, responseHeaders) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        log.timestamp, log.url, log.method, log.body, log.status, log.response, log.requestHeaders, log.responseHeaders
    );
};

export const getLogs = async (): Promise<LogEntry[]> => {
    const db = await dbPromise;
    const logs = await db.all<LogEntry[]>(`SELECT * FROM logs`);
    return logs;
};

export const getLogById = async (id: number): Promise<LogEntry | undefined> => {
    const db = await dbPromise;
    const log = await db.get<LogEntry>(`SELECT * FROM logs WHERE id = ?`, id);
    return log;
};
