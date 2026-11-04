<?php
// Sobe um nível para acessar a conexão na pasta php/
require_once '../conexao.php';

// Recebe os dados atualizados e o ID
$id = $_POST['id_conquista'] ?? '';
$nome = $_POST['nome'] ?? '';
$criterios = $_POST['criterios'] ?? '';

// Validação simples do ID e campos
if (empty($id) || empty($nome) || empty($criterios)) {
    http_response_code(400);
    echo "Dados incompletos para a atualização.";
    exit;
}

// Atualiza o registro correspondente no banco
$sql = "UPDATE conquista SET nome = :nome, criterios = :criterios WHERE id_conquista = :id";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'nome' => $nome,
    'criterios' => $criterios,
    'id' => $id
]);

echo "Conquista atualizada com sucesso!";
?>
