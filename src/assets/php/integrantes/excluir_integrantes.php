<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$idIntegrante = filter_input(INPUT_POST, 'id_integrante', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$idIntegrante) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "ID inválido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$conexao->begin_transaction();

$stmt = $conexao->prepare("SELECT id_usuario FROM integrante WHERE id_integrante = ?");
if (!$stmt) {
    $conexao->rollback();
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("i", $idIntegrante);
$stmt->execute();
$integrante = $stmt->get_result()->fetch_assoc();

if (!$integrante) {
    $conexao->rollback();
    http_response_code(404);
    echo json_encode(["status" => "nok", "mensagem" => "Integrante não encontrado.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$idUsuario = $integrante['id_usuario'];

// O integrante é excluído primeiro porque referencia o usuário.
$stmt = $conexao->prepare("DELETE FROM integrante WHERE id_integrante = ?");
$stmt->bind_param("i", $idIntegrante);
$ok = $stmt->execute();
$erro = $stmt->errno;

if ($ok) {
    $stmt = $conexao->prepare("DELETE FROM usuario WHERE id_usuario = ?");
    $stmt->bind_param("i", $idUsuario);
    $ok = $stmt->execute();
    $erro = $stmt->errno;
}

if ($ok) {
    $conexao->commit();
    echo json_encode(["status" => "ok", "mensagem" => "Integrante excluído com sucesso.", "data" => []], JSON_UNESCAPED_UNICODE);
} elseif ($erro === 1451) {
    $conexao->rollback();
    http_response_code(409);
    echo json_encode(["status" => "nok", "mensagem" => "Não é possível excluir este integrante porque ele ou seu usuário está vinculado a outros registros.", "data" => []], JSON_UNESCAPED_UNICODE);
} else {
    $conexao->rollback();
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao excluir integrante.", "data" => []], JSON_UNESCAPED_UNICODE);
}
?>
