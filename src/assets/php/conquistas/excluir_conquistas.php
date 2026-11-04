<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$id = $_POST['id_conquista'] ?? '';

if (empty($id)) {
    echo json_encode(["status" => "erro", "mensagem" => "ID inválido.", "data" => []]);
    exit;
}

$sql = "DELETE FROM conquista WHERE id_conquista = ?";
$stmt = $conexao->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Conquista excluída com sucesso.", "data" => []]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao excluir conquista.", "data" => []]);
}
?>
