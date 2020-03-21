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

    foreach ($p_value as $key => $value) {
        $new_prjct_arr['projects.' . $key] = $value;
    }

    $projectId = $p_value['ProjectId'];
    unset($projects[$p_key]);

    $new_prjct_arr['Level'] = $lvl;
    $new_prjct_arr['Childs'] = childProjects($projects, $projectId, $lvl);

    $n_projects[$p_value['ProjectId']] = $new_prjct_arr;
}

print_r(json_encode($n_projects));

function childProjects(&$data, $parentFK, $lvl)
{
    $lvl++;
    $n_projects = [];

    foreach ($data as $d_key => $d_value) {
        if ($parentFK !== $d_value['ParentFK']) {
            continue;
        }

        foreach ($d_value as $key => $value) {
            $new_entry_arr['projects.' . $key] = $value;
        }

        $projectId = $d_value['ProjectId'];
        unset($data[$d_key]);

        $new_entry_arr['Level'] = $lvl;
        $new_entry_arr['Childs'] = childProjects($data, $projectId, $lvl);

        $n_projects[$d_value['ProjectId']] = $new_entry_arr;
    }

    return $n_projects;
}
