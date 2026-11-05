<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$idGrupo = filter_input(INPUT_POST, 'id_grupo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$idRamo = filter_input(INPUT_POST, 'id_ramo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if ($nome === '' || !$idGrupo || !$idRamo) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Informe o nome, o grupo e o ramo da seção.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$sql = "INSERT INTO secao (id_grupo, id_ramo, nome, situacao) VALUES (?, ?, ?, 'ativa')";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("iis", $idGrupo, $idRamo, $nome);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Seção cadastrada com sucesso.", "data" => ["id_secao" => $conexao->insert_id]], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao cadastrar seção. Verifique o grupo e o ramo selecionados.", "data" => []], JSON_UNESCAPED_UNICODE);
}
?>