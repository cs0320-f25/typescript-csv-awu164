# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

- Parser does not check if the comma is within a quotation. If it is, then the string should not be split along that comma.
- Parser does not accept user input as to whether the first line of the CSV is the column headers. 
- Parser does not allow the user to decide which format, string[][] or Person[], they want to store their results in.
- Parser does not validate whether the data in the CSV is in the desired format (eg. “30” instead of “thirty”).

- #### Step 2 and 3: Use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition. 

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

    Making sure that blank space in the CSV file is reflected in the resulting array (so it’s not ignored)
    - From LLM
    - functionality
    Checking for commas within quotations
    - From LLM and me
    - functionality
    Checking the length of each row to make sure it’s consistent with the header row
    - From LLM
    - functionality
    Parser checking if user wants to include first line in resulting data
    - From Me
    - Extensibility

    User Story
    - “As a user, I can parse data from a CSV file so I can easily extract parts of this data to use in my research project.”
    - Acceptance Criteria:
        - Whenever the CSV file includes blank space/rows, that blank space is reflected in the output data so as to show where data may be missing
        - Whenever there are commas within quotations, those commas should be treated as a part of the data.
        - Each row of the CSV file should be the same length as the header row
        - The user should decide whether the header row (which contains the column labels) should be included in the parsed data.


    My initial observations on the current parser’s shortcomings were these: 1. Parser does not check if the comma is within a quotation, 2. Parser does not accept user input as to whether the first line of the CSV is the column headers, 3. Parser does not allow the user to decide which format, string[][] or Person[], they want to store their results in, 4. Parser does not validate whether the data in the CSV is in the desired format (eg. “30” instead of “thirty”).

    The LLM suggested some more niche edge cases I hadn’t thought of, including to check for residual line ending notation (/n), different delineation techniques that use semicolons instead of commas, consistency in the length of each row, and blank rows/spaces.

    The results differed by prompt, depending on what I emphasized. In one prompt where I emphasized that the parser should be flexible to accommodate various user cases, it suggested the parser method should take in arguments that allowed the user to specify the delimiter type, whether to include the header row, whether to trim whitespace, and whether to convert numbers in string form to a numerical data type.
    
    What resonated with me the most were the suggestions on making the parser flexible for various user cases through adding additional arguments. What didn’t resonate as much were the more niche suggestions, such as checking new lines in the data, precisely because these situations did not impact the usability or the core functionality of the parser.


### Design Choices
- 

#### REFLECTION
#### 1. Correctness
- 

#### 2. Random, On-Demand Generation
- 

#### 3. Overall experience, Bugs encountered and resolved
- 

#### Errors/Bugs:
- I encountered some bugs related to correctly defining the output type of the Parser. I had to remember that Error is a valid output type, and I also had to remember that this error would be thrown right when the parser encounters a row that doesn't fit the schema, not when it's done parsing through all the CSV rows.

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
- 
