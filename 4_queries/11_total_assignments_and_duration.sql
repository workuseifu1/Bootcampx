SELECT day, count(assignments) as number_of_assignments,sum(duration) as duration
FROM assignments
GROUP by day
ORDER BY day