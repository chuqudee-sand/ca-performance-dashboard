// src/lib/fetchData.ts
import { parse } from "csv-parse/sync";

async function fetchCSV(url: string) {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  const text = await res.text();
  return parse(text, { columns: true, skip_empty_lines: true });
}

export async function getAllData() {
  const base = "https://raw.githubusercontent.com/your-repo/data/main";
  const aice = await fetchCSV(`${base}/aice.csv`);
  const pf = await fetchCSV(`${base}/pf.csv`);
  const va = await fetchCSV(`${base}/va.csv`);
  const csat = await fetchCSV(`${base}/csat.csv`);
  return { aice, pf, va, csat };
}
