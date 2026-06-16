import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parse/sync';

export function loadTestData(filename: string) {
    const filepath = path.join(__dirname, '../data', filename);
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    return csv.parse(fileContent, {columns: true});
}