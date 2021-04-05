# simple-loan-calc
Creating a simple loan calculator

# Quick Overview & Functional Description
Simple loan application is created based on the requirements provided.
Validations for the fields as specified in task.
All the currency is converted as request to the format 1,000.000.
Function is added to filter out the other characters from the amount input field.

# Info Note on issue found while development
There was a minor problem submitting the form browser due to CORS issue.
To run the application locally, we need to run it by disabling browser security.
One can do that by running the below command in command prompt:
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security

# Technical details
Angular Reactive Forms feature was used to create the application.
Added validations for all the fields as specified in requirements.
Jasmine framework is used to cover unit testing from developer perspective.
Developers can trigger the unit tests by using npm command "ng test".






