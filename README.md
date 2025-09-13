# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- Parser does not check if the comma is within a quotation. If it is, then the string should not be split along that comma.
- Parser does not accept user input as to whether the first line of the CSV is a header row. 
- Parser does not allow the user to decide which format, string[][] or T[], they want to store their results in.
- Parser does not validate whether the data in the CSV is in the desired format (eg. “30” instead of “thirty”).

- #### Step 2 and 3: Use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format — see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    - Making sure that blank space in the CSV file is reflected in the resulting array (so it’s not ignored)
        - From LLM
        - functionality
    - Checking for commas within quotations
        - From LLM and me
        - functionality
    - Checking the length of each row to make sure it’s consistent with the header row
        - From LLM
        - functionality
    - Parser checking if user wants to include first line in resulting data
        - From Me
        - Extensibility

    User Story
    - “As a user, I can parse data from a CSV file so I can easily extract parts of this data to use in my research project, while being certain that this data is formatted correctly”
    - Acceptance Criteria:
        - Whenever the CSV file includes blank space/rows, that blank space is reflected in the output data so as to show where data may be missing
        - Whenever there are commas within quotations, those commas should be treated as a part of the data.
        - Each row of the CSV file should be the same length as the header row
        - The user should decide whether the header row (which contains the column labels) should be included in the parsed data.


    My initial observations on the current parser’s shortcomings were these: 1. Parser does not check if the comma is within a quotation, 2. Parser does not accept user input as to whether the first line of the CSV is the column headers, 3. Parser does not allow the user to decide which format, string[][] or T[], they want to store their results in, 4. Parser does not validate whether the data in the CSV is in the desired format (eg. “30” instead of “thirty”).

    The LLM suggested some more niche edge cases I hadn’t thought of, including to check for residual line ending notation (/n), different delineation techniques that use semicolons instead of commas, consistency in the length of each row, and blank rows/spaces.

    The results differed by prompt, depending on what I emphasized. In one prompt where I emphasized that the parser should be flexible to accommodate various user cases, it suggested the parser method should take in arguments that allowed the user to specify the delimiter type, whether to include the header row, whether to trim whitespace, and whether to convert numbers in string form to a numerical data type.
    
    What resonated with me the most were the suggestions on making the parser flexible for various user cases through adding additional arguments. What didn’t resonate as much were the more niche suggestions, such as checking new lines in the data, precisely because these situations did not impact the usability or the core functionality of the parser.


### Design Choices
- My Primary design choice was choosing how to communicate to the caller that their CSV data was not able to be parsed according to the schema they chose. I chose to return an error as opposed to posting a message to the console, and the error message would include the line in the CSV file in which the error was detected, in addition to supplying the caller with the error message from zod's safeParse method. I thought this method of communicating to the caller would ensure that the caller would 1. recieve notice of the error directly and 2. supply them with sufficient information to fix what was causing the error.

#### REFLECTION
#### 1. Correctness
Here are the criteria that would make a CSV parser correct
- identifies format inconsistencies in the CSV data, including missing data fields, inconsistent row sizes, data type inconsistencies
- clearly communicates these inconsistencies in the data to the caller, and details where the error occurred and why
- can receive user input on what would make the parser "correct" for the user's purposes. This includes allowing the user to pass in a particular schema, or allowing them tailor whether a comma or a semicolon is used to demarcate separate data fields, for example. The point is that a "correct CSV parser" is different for each caller because everyone has different purposes for the parser.

#### 2. Random, On-Demand Generation
- Perhaps generating this data randomly would allow me to see just how many kinds of data types a CSV file can store, and make me aware of all the ways my parser, and zod, should accomodate these possibilities. This means that I should make sure my parser should just as easily a parse a number as it would a hex code, for example.
- I would potentially encounter more formatting inconsistencies that are commonly present in CSV files. By exposing myself to these inconsistencies, I can formulate how to make my Parser more impervious to these kinds of CSV file quirks.

#### 3. Overall experience, Bugs encountered and resolved
- This assignment differed from other programming assignments because it was not really focused on building code, but imagining how a user would interact with this code. The focus was on user functionality, not on efficiency or runtime (though those criteria should be considered regardless).
- The bugs I faced were primarily related to type intricacies. Particularly, I had trouble realizing that the return type of my parsing method also had to include Error, and not just string[][] and T[]. I fixed these kinds of bugs by hovering over the error line and seeing what was confusing TypeScript.

#### Errors/Bugs:
- None, other than the bugs/uncertainties that I will address in the next sprint (commas within quotations, whether to include header row, other relevant CSV criteria that I talked about earlier in this README).

#### Tests:
I created a new testing file (basic-parser-improved.test.ts) for testing the improved CSVParser. I renamed the original testing file so that VSCode skips running it when I run "npm run test" in the terminal.

#### How To…
I have 3 CSV files. 
- The people.csv is the original csv file that includes the header row and the original data, plus an additional row to test that the original implementation of the CSVParser cannot correctly parse commas within quotation marks.
- The people-no-header csv file doesn't have the header row (since the parser cannot handle that yet). I used this file to test the parser's ability to utilize the schema in the new testing file.
- the people-schema-2 csv file doesn't have the header row and is capatible with the second schema I defined in the new testing file.


#### Team members and contributions (include cs logins): 
- n/a

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): 
- Jack de Haan (jdehaan)

#### Total estimated time it took to complete project: 
- 5 hrs

#### Link to GitHub Repo:
- https://github.com/cs0320-f25/typescript-csv-awu164
