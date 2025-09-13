import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z, ZodType } from "zod";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("commas inside quotations are not split ", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }

  expect(results[5]).toEqual(["Wu, Alicia", "19"]);
});

test("column headers not included in results", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }

  expect(results[0]).toEqual(["Alice", "23"]);
});

