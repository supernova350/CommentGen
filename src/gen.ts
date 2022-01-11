import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import readdirp from 'readdirp';

export interface IGen {
	fileExts: string[];
	name: string;
	section: string;
	assignment: string;
	date: Date;
	desc: string;
	overwrite: boolean;
}

export default async function gen(options: IGen) {
	const { fileExts, name, section, assignment, date, desc, overwrite } = options;

	const files = readdirp(join(process.cwd(), 'input'), {
		fileFilter: fileExts,
	});

	for await (const entry of files) {
		const { fullPath } = entry;

		const data = readFileSync(fullPath).toString().split('\n');

		if (data[0] === '/****************************************') {
			// comment has already been generated for file

			if (!overwrite) {
				continue;
			}

			data.splice(
				0, // beginning of file
				8, // delete 8 lines
				`/****************************************\n - Name: ${name}\n - Section: ${section}\n - Assignment: ${assignment}\n - Date: ${date.toLocaleDateString()}\n - Description: ${desc}\n****************************************/\n`,
			);
		} else {
			data.splice(
				0, // beginning of file
				0, // don't delete anything
				`/****************************************\n - Name: ${name}\n - Section: ${section}\n - Assignment: ${assignment}\n - Date: ${date.toLocaleDateString()}\n - Description: ${desc}\n****************************************/\n`,
			);
		}

		const text = data.join('\n');
		writeFileSync(fullPath, text);
	}
}
