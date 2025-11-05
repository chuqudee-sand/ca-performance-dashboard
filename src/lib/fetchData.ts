// src/lib/fetchData.ts
export type Program = "AiCE" | "PF" | "VA";
export type Row = {
  Program: Program;
  Sprint: string;
  Cohort: string;
  Country: string;
  Enrolled: number;
  Activated: number;
  Graduated: number;
  "Activation Rate": number;
  "Graduation Rate": number;
  "Completion Rate": number;
};

export type CSATRow = {
  Program: Program;
  Sprint: string;
  Cohort: string;
  CSAT: number;
  NPS: number;
};

const urls = {
  AiCE: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=0&single=true&output=csv",
  PF:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2116544785&single=true&output=csv",
  VA:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=751297644&single=true&output=csv",
  CSAT: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2121041094&single=true&output=csv",
};

async function csvToJson<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.replace(/"/g, "").trim());
  return lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.replace(/"/g, "").trim());
    const obj = {} as any;
    headers.forEach((h, i) => {
      obj[h] = isNaN(+values[i]) ? values[i] : +values[i];
    });
    return obj as T;
  });
}

export async function getAllData() {
  const [aice, pf, va, csat] = await Promise.all([
    csvToJson<Row>(urls.AiCE),
    csvToJson<Row>(urls.PF),
    csvToJson<Row>(urls.VA),
    csvToJson<CSATRow>(urls.CSAT),
  ]);
  return { aice, pf, va, csat };
}
