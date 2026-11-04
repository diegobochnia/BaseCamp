<?php
// Sobe um nível para acessar a conexão na pasta php/
require_once '../conexao.php';

// Recebe os dados enviados via POST pelo formulário
$nome = $_POST['nome'] ?? '';
$criterios = $_POST['criterios'] ?? '';

// Validação básica para evitar campos em branco
if (empty($nome) || empty($criterios)) {
    http_response_code(400);
    echo "Preencha todos os campos obrigatórios.";
    exit;
}

// Prepara e executa a inserção no banco de dados com parâmetros seguros
$sql = "INSERT INTO conquista (nome, criterios) VALUES (:nome, :criterios)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'nome' => $nome,
    'criterios' => $criterios
]);

echo "Conquista cadastrada com sucesso!";
?>
