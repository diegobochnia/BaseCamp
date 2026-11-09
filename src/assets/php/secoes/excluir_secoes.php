<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$idSecao) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "ID inválido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "DELETE FROM secao WHERE id_secao = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("i", $idSecao);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "ok", "mensagem" => "Seção excluída com sucesso.", "data" => []], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "nok", "mensagem" => "Seção não encontrada.", "data" => []], JSON_UNESCAPED_UNICODE);
    }
} elseif ($stmt->errno === 1451) {
    http_response_code(409);
    echo json_encode(["status" => "nok", "mensagem" => "Não é possível excluir esta seção porque ela está vinculada a outros registros.", "data" => []], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao excluir seção.", "data" => []], JSON_UNESCAPED_UNICODE);
}
?>
