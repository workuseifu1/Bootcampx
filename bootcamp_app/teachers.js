const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});
const queryString = `
SELECT  teachers.name as teacher, cohorts.name as cohort,count(assistance_requests) as total_assistances 
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`;
const cohortName = process.argv[2] || 'JUL02'  ;
const values = [`%${cohortName}%`]
pool.query(queryString,values)
.then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort} :  ${row.teacher} `);
  })
})