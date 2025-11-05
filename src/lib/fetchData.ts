// src/lib/fetchData.ts
export async function fetchCSV(url: string) {
  const res = await fetch(url);
  const text = await res.text();
  const rows = text.trim().split("\n").map((r) => {
    // simple CSV parsing (works for our clean CSVs)
    const parts = r.split(",").map((p) => p.replace(/^"|"$/g, "").trim());
    return parts;
  });
  const [header, ...data] = rows;
  const headerKeys = header;
  return data.map((row) => {
    const obj: any = {};
    headerKeys.forEach((k: string, i: number) => {
      obj[k] = row[i] ?? "";
    });
    return obj;
  });
}

export const dataSources = {
  AiCE: process.env.NEXT_PUBLIC_CSV_AICE ?? "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=0&single=true&output=csv",
  PF: process.env.NEXT_PUBLIC_CSV_PF ?? "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2116544785&single=true&output=csv",
  VA: process.env.NEXT_PUBLIC_CSV_VA ?? "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=751297644&single=true&output=csv",
  CSAT_NPS: process.env.NEXT_PUBLIC_CSV_CSN ?? "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2121041094&single=true&output=csv",
};
