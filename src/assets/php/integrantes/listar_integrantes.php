<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$situacao = $_GET["situacao"] ?? "ativo";
if (!is_string($situacao) || !in_array($situacao, ["ativo", "inativo", "todos"], true)) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Filtro de situação inválido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "SELECT i.id_integrante, i.id_usuario, u.nome, u.email, u.telefone, i.data_nascimento, i.data_ingresso, i.id_secao, s.nome AS secao, i.situacao
        FROM integrante i
        INNER JOIN usuario u ON u.id_usuario = i.id_usuario
        INNER JOIN secao s ON s.id_secao = i.id_secao";
if ($situacao !== "todos") {
    $sql .= " WHERE i.situacao = ?";
}
$sql .= " ORDER BY u.nome ASC";

$stmt = $conexao->prepare($sql);
if ($stmt && $situacao !== "todos") {
    $stmt->bind_param("s", $situacao);
}

if (!$stmt || !$stmt->execute()) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Falha ao buscar os integrantes.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    "status" => "ok",
    "mensagem" => "Listagem concluída.",
    "data" => $stmt->get_result()->fetch_all(MYSQLI_ASSOC)
], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
?>
