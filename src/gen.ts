import { readdirSync, readFileSync, writeFileSync } from "node:fs";

export interface IGen {
  fileExts: string[];
  name: string;
  _class: string;
  assignment: string;
  date: Date;
  desc: string;
}

export default async function gen(options: IGen) {
  const { name, _class, assignment, date, desc } = options;

  const files = readdirSync(`${process.cwd()}/input`);

  for (const file of files) {
    const data = readFileSync(`${process.cwd()}/input/${file}`)
      .toString()
      .split("\n");
    data.splice(
      0,
      0,
      `/******************************
  - Name: ${name}
  - Class: ${_class}
  - Assignment: ${assignment}
  - Date: ${date.toLocaleDateString()}
  - Description: ${desc}
******************************/\n`
    );
    const text = data.join("\n");
    writeFileSync(`${process.cwd()}/input/${file}`, text);
  }
}
