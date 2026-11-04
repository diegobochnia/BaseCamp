<?php
require_once '../conexao.php';
header('Content-Type: application/json; charset=utf-8');

$sql = "SELECT id_conquista, nome, descricao, criterios FROM conquista ORDER BY nome ASC";
$result = $conexao->query($sql);

$conquistas = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $conquistas[] = $row;
    }
    echo json_encode(["status" => "ok", "mensagem" => "Listagem concluída.", "data" => $conquistas]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Falha na busca dos registros.", "data" => []]);
}
?>
