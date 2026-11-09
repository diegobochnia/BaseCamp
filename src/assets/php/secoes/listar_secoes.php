<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$situacao = $_GET["situacao"] ?? "ativa";
if (!is_string($situacao) || !in_array($situacao, ["ativa", "inativa", "todas"], true)) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Filtro de situação inválido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "SELECT s.id_secao, s.nome, s.id_grupo, g.nome AS grupo, s.id_ramo, r.nome AS ramo, s.situacao
        FROM secao s
        INNER JOIN grupo g ON g.id_grupo = s.id_grupo
        INNER JOIN ramo r ON r.id_ramo = s.id_ramo";
if ($situacao !== "todas") {
    $sql .= " WHERE s.situacao = ?";
}
$sql .= " ORDER BY s.nome ASC";

$stmt = $conexao->prepare($sql);
if ($stmt && $situacao !== "todas") {
    $stmt->bind_param("s", $situacao);
}

if (!$stmt || !$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Falha ao buscar as seções.", "data" => [], "grupos" => [], "ramos" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$secoes = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
$grupos = $conexao->query("SELECT id_grupo, nome FROM grupo ORDER BY nome ASC");
$ramos = $conexao->query("SELECT id_ramo, nome FROM ramo ORDER BY nome ASC");

if (!$grupos || !$ramos) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Falha ao carregar grupos e ramos.", "data" => [], "grupos" => [], "ramos" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    "status" => "ok",
    "mensagem" => "Listagem concluída.",
    "data" => $secoes,
    "grupos" => $grupos->fetch_all(MYSQLI_ASSOC),
    "ramos" => $ramos->fetch_all(MYSQLI_ASSOC)
], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
?>
