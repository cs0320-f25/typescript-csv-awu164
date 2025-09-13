import * as fs from "fs";
import * as readline from "readline";
import { z, ZodType } from "zod";


/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 * 
 */

// takes in a zod schema with generic output type (to be defined by user), returns either output type array, string array array, or error
export async function parseCSV<T>(path: string, schema?: ZodType<T>): Promise<T[] | string[][] | Error> {
  // This initial block of code reads from a file in Node.js. 
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  // if no schema provided, or schema undefined, return array of string arrays
  if (!schema) {   
    let result = [];
  // Loop over each line in the file.
    for await (const line of rl) {
      // Split the line by commas and trim whitespace. Values is an array of strings.
      const values = line.split(",").map((v) => v.trim());
      
      // Add the array of strings to the result array.
      result.push(values);    
    }
    return result;
  }
  else {
    // if schema provided, then zod can infer the type from the schema
    type Row = z.infer<typeof schema>;

    // return type will be array of inferred type
    let result: Row[] = [];

    // Loop over each line in the file.
    for await (const line of rl) {

      // Split the line by commas and trim whitespace. Values is an array of strings.
      const values = line.split(",").map((v) => v.trim());

      // use inputted schema to parse results and cast each row to inferred type
      const rowResult: z.ZodSafeParseResult<Row> = schema.safeParse(values)

      // if parsing is succesful (meaning the row matches the schema), add to result array
      if(rowResult.success) {
        result.push(rowResult.data);
      }
      else { // if parsing fails, return an error with the line and the parsing error message
        return Error(`Parsing error on line "${line}": ${rowResult.error.message}`);
      } 
    }
    return result;
  }
}