<?php
// Sobe um nível para acessar a conexão na pasta php/
require_once '../conexao.php';

// Recebe o ID do item que deve ser deletado
$id = $_POST['id_conquista'] ?? '';

if (empty($id)) {
    http_response_code(400);
    echo "ID da conquista não informado.";
    exit;
}

// Executa a exclusão com bind param para segurança
$sql = "DELETE FROM conquista WHERE id_conquista = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);

echo "Conquista excluída com sucesso!";
?>
