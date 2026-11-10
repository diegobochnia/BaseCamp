<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$email = isset($_POST['email']) && is_string($_POST['email']) ? trim($_POST['email']) : '';
$telefone = isset($_POST['telefone']) && is_string($_POST['telefone']) ? trim($_POST['telefone']) : '';
$nascimento = isset($_POST['data_nascimento']) && is_string($_POST['data_nascimento']) ? trim($_POST['data_nascimento']) : '';
$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

$data = DateTime::createFromFormat('Y-m-d', $nascimento);
$dataValida = $data && $data->format('Y-m-d') === $nascimento;

if ($nome === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$dataValida || !$idSecao) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Informe nome, e-mail válido, data de nascimento e seção do integrante.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($telefone === '') {
    $telefone = null;
}

$conexao->begin_transaction();

$stmt = $conexao->prepare("INSERT INTO usuario (nome, email, telefone) VALUES (?, ?, ?)");
if (!$stmt) {
    $conexao->rollback();
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("sss", $nome, $email, $telefone);

if (!$stmt->execute()) {
    $conexao->rollback();
    if ($stmt->errno === 1062) {
        http_response_code(409);
        echo json_encode(["status" => "nok", "mensagem" => "Já existe um usuário com este e-mail.", "data" => []], JSON_UNESCAPED_UNICODE);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "nok", "mensagem" => "Erro ao cadastrar integrante.", "data" => []], JSON_UNESCAPED_UNICODE);
    }
    exit;
}

$idUsuario = $conexao->insert_id;

$stmt = $conexao->prepare("INSERT INTO integrante (id_usuario, id_secao, data_nascimento, data_ingresso, situacao) VALUES (?, ?, ?, CURDATE(), 'ativo')");
if (!$stmt) {
    $conexao->rollback();
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("iis", $idUsuario, $idSecao, $nascimento);

if ($stmt->execute()) {
    $idIntegrante = $conexao->insert_id;
    $conexao->commit();
    echo json_encode(["status" => "ok", "mensagem" => "Integrante cadastrado com sucesso.", "data" => ["id_integrante" => $idIntegrante]], JSON_UNESCAPED_UNICODE);
} else {
    $conexao->rollback();
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao cadastrar integrante. Verifique a seção selecionada.", "data" => []], JSON_UNESCAPED_UNICODE);
}
?>
