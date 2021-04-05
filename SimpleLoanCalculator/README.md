# simple-loan-calc
Creating a simple loan calculator

# Quick Overview & Functional Description
Simple loan application is created based on the requirements provided.
Reqiuired validations have been added for the fields.
All the currency is converted as requested to the format 1,000.000.
Function has been added to filter out other characters from the amount input field.
Submission of form will happen only when all fields are provided with values.

# Technical details
Angular Reactive Forms feature was used to create the form.
Added validations for all the fields as specified in requirements.
Jasmine framework is used to cover basic unit testing from developers perspective.
Developers can trigger the unit tests by using npm command "ng test".

# Info Note on issue found while development
There was a minor problem submitting the form browser due to CORS issue.
To run the application locally, we need to run it by disabling browser security.
One can do that by running the below command in command prompt:
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security









