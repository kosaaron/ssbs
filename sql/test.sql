SELECT tasks.TaskId AS '1',
    tasks.Name AS '2',
    task_types.Name AS '3'
FROM tasks
    INNER JOIN task_types ON TaskTypeFK = TaskTypeId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    orders.Name AS '2',
    orders.AliasId AS '3'
FROM tasks
    INNER JOIN orders ON TaskFK = TaskId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    orders.Name AS '2',
    orders.AliasId AS '3'
FROM tasks
    INNER JOIN orders ON TaskFK = TaskId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    tasks.Name AS '2'
FROM tasks
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    orders.Name AS '2',
    orders.AliasId AS '3'
FROM tasks
    INNER JOIN orders ON TaskFK = TaskId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    task_types.Name AS '2',
    tasks.Deadline AS '3'
FROM tasks
    INNER JOIN task_types ON TaskTypeFK = TaskTypeId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;
SELECT tasks.TaskId AS '1',
    orders.Name AS '2',
    orders.AliasId AS '3'
FROM tasks
    INNER JOIN orders ON TaskFK = TaskId
WHERE tasks.Name LIKE '%%' && tasks.TaskTypeFK LIKE '%%'
LIMIT 20;