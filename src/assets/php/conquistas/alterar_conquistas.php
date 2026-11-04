<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$id = filter_input(INPUT_POST, 'id_conquista', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$nome = trim($_POST['conquistas_name'] ?? '');
$descricao = trim($_POST['conquistas_desc'] ?? '');
$criterios = trim($_POST['conquistas_criterios'] ?? '');

if (!$id || empty($nome) || empty($descricao) || empty($criterios)) {
    echo json_encode(["status" => "nok", "mensagem" => "Dados inválidos ou incompletos para atualização.", "data" => []]);
    exit;
}

$sql = "UPDATE conquista SET nome = ?, descricao = ?, criterios = ? WHERE id_conquista = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []]);
    exit;
}

$stmt->bind_param("sssi", $nome, $descricao, $criterios, $id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "ok", "mensagem" => "Conquista atualizada com sucesso.", "data" => []]);
    } else {
        echo json_encode(["status" => "nok", "mensagem" => "Nenhuma alteração foi feita ou conquista não encontrada.", "data" => []]);
    }
} else {
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao atualizar conquista.", "data" => []]);
}
?>
