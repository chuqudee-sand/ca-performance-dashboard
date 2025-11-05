export async function fetchCSV(url: string) {
  const res = await fetch(url);
  const text = await res.text();

  const rows = text.split("\n").map(r => r.split(","));
  const headers = rows.shift()!;

  return rows.map(row => {
    const obj: any = {};
    row.forEach((value, i) => {
      obj[headers[i]] = value?.replace(/"/g, "").trim();
    });
    return obj;
  });
}

export const dataSources = {
  AiCE: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=0&single=true&output=csv",
  PF: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2116544785&single=true&output=csv",
  VA: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=751297644&single=true&output=csv",
  CSAT_NPS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQToP7xztZLuErZiGb6Rvsw3S631YYVJXUj-D46gVbFWYLLlsQIUKnMFHgnceTa1aqUjyj0H09MtYCb/pub?gid=2121041094&single=true&output=csv",
};
