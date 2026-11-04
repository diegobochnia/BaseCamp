<?php
// Sobe um nível para acessar a conexão na pasta php/
require_once '../conexao.php';

// Consulta todas as conquistas cadastradas
$sql = "SELECT id_conquista, nome, criterios FROM conquista ORDER BY nome ASC";
$stmt = $pdo->query($sql);
$conquistas = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Informa que a resposta é um JSON e imprime a lista
header('Content-Type: application/json; charset=utf-8');
echo json_encode($conquistas);
?>
