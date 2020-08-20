<?php
require_once('Modules/Connect.php');
$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;

$projects = $pdo->query('SELECT * FROM projects')->fetchAll(PDO::FETCH_ASSOC);

foreach ($projects as $p_key => $p_value) {
    $lvl = 0;

    if ($p_value['ParentFK'] !== null) {
        continue;
    }

    foreach ($p_value as $column => $value) {
        $new_prjct_arr[getProjectColumnId($column)] = $value;
    }

    $projectId = $p_value['ProjectId'];
    unset($projects[$p_key]);

    $new_prjct_arr['Level'] = $lvl;
    $new_prjct_arr['Children'] = childProjects($projects, $projectId, $lvl, $pdo);

    $n_projects[$p_value['ProjectId']] = $new_prjct_arr;
}

print_r(json_encode($n_projects));

/** Functions */
function childProjects(&$data, $parentFK, $lvl, $pdo)
{
    $lvl++;
    //without any child
    $n_projects_s = [];
    //with children
    $n_projects_ch = [];
    //all projects and tasks
    $n_projects = [];

    foreach ($data as $entry_key => $entry) {
        if ($parentFK !== $entry['ParentFK']) {
            continue;
        }

        foreach ($entry as $column => $value) {
            $new_entry_arr[getProjectColumnId($column)] = $value;
        }

        $projectId = $entry['ProjectId'];
        unset($data[$entry_key]);

        $new_entry_arr['Level'] = $lvl;
        $new_entry_arr['Children'] = childProjects($data, $projectId, $lvl, $pdo);

        if (empty($new_entry_arr['Children'])) {
            $n_projects_s[$projectId] = $new_entry_arr;
        } else {
            $n_projects_ch[$projectId] = $new_entry_arr;
        }
    }

    $n_projects = $n_projects_ch;
    foreach ($n_projects_s as $entryId => $entry) {
        $n_projects[$entryId] = $n_projects_s[$entryId];
    }

    $stmt = $pdo->prepare("SELECT * FROM tasks WHERE ProjectFK=:ProjectFK");
    $stmt->execute(['ProjectFK' => $parentFK]);
    while ($task = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $i = 0;
        foreach ($task as $column => $value) {
            $columnId = getTaskColumnId($column);

            if ($column === 'TaskId') {
                $new_tsk_arr[$columnId] = 't_' . $value;
            } else if ($columnId === 'g')
                $new_tsk_arr['g' . $i] = $value;
            else
                $new_tsk_arr[$columnId] = $value;

            $i++;
        }
        $new_tsk_arr['Level'] = $lvl;

        $n_projects['t_' . $task['TaskId']] = $new_tsk_arr;
    }

    return $n_projects;
}

function getProjectColumnId($column)
{
    switch ($column) {
        case 'ProjectId':
            return '0';
        case 'ParentFK':
            return '1';
        case 'Name':
            return '2';
        case 'StartDate':
            return '3';
        case 'FinishDate':
            return '4';
        case 'Deadline':
            return '5';
        default:
            return 'g';
    }
}
function getTaskColumnId($column)
{
    switch ($column) {
        case 'TaskId':
            return '0';
        case 'ProjectFK':
            return '1';
        case 'Name':
            return '2';
        case 'CreatedDate':
            return '3';
        case 'FinishDate':
            return '4';
        case 'Deadline':
            return '5';
        default:
            return 'g';
    }
}
