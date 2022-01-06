import pkg from "./config.json";
const { fileExts, name, _class, assignment, date, desc } = pkg;
import gen, { type IGen } from "./gen";

// TODO: config validation

const genOptions: IGen = {
  fileExts,
  name,
  _class,
  assignment,
  date:
    date.toLowerCase() === "today" ? new Date() : new Date(Date.parse(date)),
  desc,
};

await gen(genOptions);
