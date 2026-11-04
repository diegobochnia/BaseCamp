<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$nome = $_POST['conquistas_name'] ?? '';
$descricao = $_POST['conquistas_desc'] ?? '';
$criterios = $_POST['conquistas_criterios'] ?? '';

if (empty($nome) || empty($descricao) || empty($criterios)) {
    echo json_encode(["status" => "erro", "mensagem" => "Preencha todos os campos.", "data" => []]);
    exit;
}

$sql = "INSERT INTO conquista (nome, descricao, criterios) VALUES (?, ?, ?)";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("sss", $nome, $descricao, $criterios);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Conquista cadastrada com sucesso.", "data" => []]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar conquista.", "data" => []]);
}
?>
