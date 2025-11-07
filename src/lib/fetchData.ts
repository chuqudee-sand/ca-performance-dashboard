// src/lib/fetchData.ts
import { parse } from "csv-parse/sync";

export type Row = {
  Program: string;
  Sprint: string;
  Cohort: string;
  Country: string;
  Enrolled: number;
  Activated: number;
  Graduated: number;
  "Activation Rate"?: number;
  "Graduation Rate"?: number;
  "Completion Rate"?: number;
  CSAT?: number;
  NPS?: number;
};

const BASE_PATH = "/data";

async function fetchCSV(file: string): Promise<Row[]> {
  const url = `${BASE_PATH}/${file}.csv`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  const text = await res.text();
  const parsed = parse(text, { columns: true, skip_empty_lines: true });
  return parsed.map((r: any) => ({
    ...r,
    Enrolled: Number(r.Enrolled) || 0,
    Activated: Number(r.Activated) || 0,
    Graduated: Number(r.Graduated) || 0,
    "Activation Rate": Number(r["Activation Rate"]) || 0,
    "Graduation Rate": Number(r["Graduation Rate"]) || 0,
    "Completion Rate": Number(r["Completion Rate"]) || 0,
    CSAT: Number(r.CSAT) || 0,
    NPS: Number(r.NPS) || 0,
  }));
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
