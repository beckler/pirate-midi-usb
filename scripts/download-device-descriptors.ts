import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const url =
	'https://raw.githubusercontent.com/Pirate-MIDI/device-descriptors-api/main/device-descriptors/bridge-descriptors.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, '../src/data');
const outputPath = path.join(outDir, 'deviceDescriptors.ts');

const banner = `
/**
 * NOTE: this is downloaded and built from source on install, DO NOT modify.
 * https://github.com/Pirate-MIDI/device-descriptors-api/blob/main/device-descriptors/bridge-descriptors.json
 */
`.trim();

void (async () => {
	const response = await fetch(url);
	const data = await response.text();

	const content = `${banner}\n     export const deviceDescriptors = ${data}`;

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir);
	}
	fs.writeFileSync(outputPath, content);

	execSync('npm run format');

	console.info(`Device descriptors downloaded to ${outputPath}`);
})();
