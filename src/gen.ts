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
}

export default async function gen(options: IGen) {
	const { fileExts, name, section, assignment, date, desc } = options;

	const files = readdirp(join(process.cwd(), 'input'), {
		fileFilter: fileExts,
	});

	// TODO: recursive iteration to handle folders

	for await (const entry of files) {
		const { fullPath } = entry;

		const data = readFileSync(fullPath).toString().split('\n');

		data.splice(
			0, // beginning of file
			0, // don't delete anything
			`/****************************************\n - Name: ${name}\n - Section: ${section}\n - Assignment: ${assignment}\n - Date: ${date.toLocaleDateString()}\n - Description: ${desc}\n****************************************/\n`,
		);

		const text = data.join('\n');
		writeFileSync(fullPath, text);
	}
}
