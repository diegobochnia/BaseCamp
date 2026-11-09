<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$idGrupo = filter_input(INPUT_POST, 'id_grupo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$idRamo = filter_input(INPUT_POST, 'id_ramo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$idSecao || $nome === '' || !$idGrupo || !$idRamo) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Informe um ID válido, o nome, o grupo e o ramo da seção.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "UPDATE secao SET nome = ?, id_grupo = ?, id_ramo = ? WHERE id_secao = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("siii", $nome, $idGrupo, $idRamo, $idSecao);

if (!$stmt->execute()) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao atualizar seção. Verifique o grupo e o ramo selecionados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($stmt->affected_rows === 0) {
    $verificar = $conexao->prepare("SELECT id_secao FROM secao WHERE id_secao = ?");
    if (!$verificar) {
        http_response_code(500);
        echo json_encode(["status" => "nok", "mensagem" => "Erro interno ao confirmar a atualização.", "data" => []], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $verificar->bind_param("i", $idSecao);
    $verificar->execute();
    if (!$verificar->get_result()->fetch_assoc()) {
        http_response_code(404);
        echo json_encode(["status" => "nok", "mensagem" => "Seção não encontrada.", "data" => []], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

echo json_encode(["status" => "ok", "mensagem" => "Seção atualizada com sucesso.", "data" => []], JSON_UNESCAPED_UNICODE);
?>