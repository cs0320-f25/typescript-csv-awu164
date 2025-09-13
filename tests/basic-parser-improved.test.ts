import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z, ZodType } from "zod";

const PEOPLE_NO_HEADER_CSV_PATH = path.join(__dirname, "../data/people-no-header-row.csv");
const PEOPLE_SCHEMA_2_CSV_PATH = path.join(__dirname, "../data/people-schema-2.csv");

// Define schemas. This is a Zod construct, not a TypeScript type.
export const PersonRowSchema1 = z.tuple([z.string(), z.coerce.number()]);
export const PersonRowSchema2 = z.tuple([z.string(), z.coerce.number(), z.email()]);

test("parseCSV yields array of inferred type when schema1 passed in", async () => {
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, PersonRowSchema1)

  expect(!(results instanceof Error));
  if (!(results instanceof Error)) {
    expect(results[0]).toEqual(["Alice", 23]);
    expect(results[1]).toEqual(["Bob", 30]); // Bob's age should be a number
  }
});

test("parseCSV yields array of inferred type when schema2 passed in", async () => {
  const results = await parseCSV(PEOPLE_SCHEMA_2_CSV_PATH, PersonRowSchema2)

  expect(!(results instanceof Error));
  if (!(results instanceof Error)) {
    expect(results[0]).toEqual(["Alice", 23, "alice@gmail.com"]);
    expect(results[1]).toEqual(["Bob", 30, "bob@gmail.com"]); 
  }
});

test ("parseCSV yields array of string arrays when no schema passed in", async () => {
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH)

  if (!(results instanceof Error)) {
    expect(results[1]).toEqual(["Bob", "30"]); // Bob's age should be a string
  }
});

test ("parseCSV yields Error when schema passed in but row does not match schema1", async () => {
  const results = await parseCSV(PEOPLE_NO_HEADER_CSV_PATH, PersonRowSchema2)
  expect(results instanceof Error);
});

