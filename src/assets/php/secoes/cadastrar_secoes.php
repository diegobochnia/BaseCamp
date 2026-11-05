<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$idGrupo = filter_input(INPUT_POST, 'id_grupo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$idRamo = filter_input(INPUT_POST, 'id_ramo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if ($nome === '' || !$idGrupo || !$idRamo) {
    echo json_encode(["status" => "nok", "mensagem" => "Informe o nome, o grupo e o ramo da seção.", "data" => []]);
    exit;
}

$sql = "INSERT INTO secao (id_grupo, id_ramo, nome) VALUES (?, ?, ?)";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []]);
    exit;
}

$stmt->bind_param("iis", $idGrupo, $idRamo, $nome);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Seção cadastrada com sucesso.", "data" => []]);
} else {
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao cadastrar seção. Verifique o grupo e o ramo selecionados.", "data" => []]);
}
?>