<?php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

$id = $_POST['id_conquista'] ?? '';
$nome = $_POST['conquistas_name'] ?? '';
$descricao = $_POST['conquistas_desc'] ?? '';
$criterios = $_POST['conquistas_criterios'] ?? '';

if (empty($id) || empty($nome) || empty($descricao) || empty($criterios)) {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos para atualização.", "data" => []]);
    exit;
}

$sql = "UPDATE conquista SET nome = ?, descricao = ?, criterios = ? WHERE id_conquista = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("sssi", $nome, $descricao, $criterios, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Conquista atualizada com sucesso.", "data" => []]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar conquista.", "data" => []]);
}
?>
