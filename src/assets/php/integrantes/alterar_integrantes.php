<?php
include_once __DIR__ . "/../conexao.php";
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "nok", "mensagem" => "Método não permitido.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$idIntegrante = filter_input(INPUT_POST, 'id_integrante', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$telefone = isset($_POST['telefone']) && is_string($_POST['telefone']) ? trim($_POST['telefone']) : '';
$nascimento = isset($_POST['data_nascimento']) && is_string($_POST['data_nascimento']) ? trim($_POST['data_nascimento']) : '';
$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

$data = DateTime::createFromFormat('Y-m-d', $nascimento);
$dataValida = $data && $data->format('Y-m-d') === $nascimento;

if (!$idIntegrante || $nome === '' || !$dataValida || !$idSecao) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Informe um ID válido, o nome, a data de nascimento e a seção do integrante.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($telefone === '') {
    $telefone = null;
}

$sql = "UPDATE integrante i
        INNER JOIN usuario u ON u.id_usuario = i.id_usuario
        SET u.nome = ?, u.telefone = ?, i.data_nascimento = ?, i.id_secao = ?
        WHERE i.id_integrante = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

$stmt->bind_param("sssii", $nome, $telefone, $nascimento, $idSecao, $idIntegrante);

if (!$stmt->execute()) {
    http_response_code(400);
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao atualizar integrante. Verifique a seção selecionada.", "data" => []], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($stmt->affected_rows === 0) {
    $verificar = $conexao->prepare("SELECT id_integrante FROM integrante WHERE id_integrante = ?");
    if (!$verificar) {
        http_response_code(500);
        echo json_encode(["status" => "nok", "mensagem" => "Erro interno ao confirmar a atualização.", "data" => []], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $verificar->bind_param("i", $idIntegrante);
    $verificar->execute();
    if (!$verificar->get_result()->fetch_assoc()) {
        http_response_code(404);
        echo json_encode(["status" => "nok", "mensagem" => "Integrante não encontrado.", "data" => []], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

echo json_encode(["status" => "ok", "mensagem" => "Integrante atualizado com sucesso.", "data" => []], JSON_UNESCAPED_UNICODE);
?>
