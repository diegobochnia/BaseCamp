<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$sql = "SELECT s.id_secao, s.nome, s.id_grupo, g.nome AS grupo, s.id_ramo, r.nome AS ramo
        FROM secao s
        INNER JOIN grupo g ON g.id_grupo = s.id_grupo
        INNER JOIN ramo r ON r.id_ramo = s.id_ramo
        ORDER BY s.nome ASC";
$result = $conexao->query($sql);

if (!$result) {
    echo json_encode(["status" => "nok", "mensagem" => "Falha ao buscar as seções.", "data" => [], "grupos" => [], "ramos" => []]);
    exit;
}

$secoes = $result->fetch_all(MYSQLI_ASSOC);
$grupos = $conexao->query("SELECT id_grupo, nome FROM grupo ORDER BY nome ASC");
$ramos = $conexao->query("SELECT id_ramo, nome FROM ramo ORDER BY nome ASC");

if (!$grupos || !$ramos) {
    echo json_encode(["status" => "nok", "mensagem" => "Falha ao carregar grupos e ramos.", "data" => [], "grupos" => [], "ramos" => []]);
    exit;
}

echo json_encode([
    "status" => "ok",
    "mensagem" => "Listagem concluída.",
    "data" => $secoes,
    "grupos" => $grupos->fetch_all(MYSQLI_ASSOC),
    "ramos" => $ramos->fetch_all(MYSQLI_ASSOC)
]);
?>
