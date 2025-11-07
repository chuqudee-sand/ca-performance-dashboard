// src/lib/fetchData.ts
import { parse } from "csv-parse/sync";

/**
 * The CSV files live in /data at the repository root.
 * When the site is deployed (Vercel, Netlify, etc.) the files are served as static assets
 * at `/data/<file>.csv` relative to the site root.
 */
const BASE_PATH = "/data";

async function fetchCSV(file: string) {
  const url = `${BASE_PATH}/${file}.csv`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const text = await res.text();
  return parse(text, { columns: true, skip_empty_lines: true });
}

export async function getAllData() {
  const [aice, pf, va, csat] = await Promise.all([
    fetchCSV("AiCE_Data"),
    fetchCSV("PF_Data"),
    fetchCSV("VA_Data"),
    fetchCSV("CSAT_&_NPS"),
  ]);
  return { aice, pf, va, csat };
}
