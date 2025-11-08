// src/lib/fetchData.ts
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

// Import JSON directly — works in build, dev, prod
import aiceData from "../../data/aice.json";
import pfData from "../../data/pf.json";
import vaData from "../../data/va.json";
import csatData from "../../data/csat.json";

const normalize = (rows: any[]): Row[] => 
  rows.map(r => ({
    Program: String(r.Program ?? ""),
    Sprint: String(r.Sprint ?? ""),
    Cohort: String(r.Cohort ?? ""),
    Country: String(r.Country ?? ""),
    Enrolled: Number(r.Enrolled) || 0,
    Activated: Number(r.Activated) || 0,
    Graduated: Number(r.Graduated) || 0,
    "Activation Rate": Number(r["Activation Rate"]) || 0,
    "Graduation Rate": Number(r["Graduation Rate"]) || 0,
    "Completion Rate": Number(r["Completion Rate"]) || 0,
    CSAT: Number(r.CSAT) || 0,
    NPS: Number(r.NPS) || 0,
  }));

export async function getAllData() {
  return {
    aice: normalize(aiceData),
    pf: normalize(pfData),
    va: normalize(vaData),
    csat: normalize(csatData),
  };
}
