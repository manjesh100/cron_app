#Cron parser - using node js 
A simple CLI tool that expands a standard 5-field cron expression into explicit values,

This implementation no need the any  using external cron parsing libraries and handles:
 Asterisk (`*`)
 Step values (`*/step`)
 Ranges (`1-5`)
 Lists (`1,3,7`)
 Mixed expressions
 Standard 5 cron fields

 Example :- 
 input  same input format pass in index.js file 
 */15 0 1,15 * 1-5 /usr/bin/find

OutPut Line :- 
minute        0 15 30 45
hour          0
day of month  1 15
month         1 2 3 4 5 6 7 8 9 10 11 12
day of week   1 2 3 4 5
command       /usr/bin/find

Run enverment
unzip the project
Install Node.js 
run the npm update
Run:
