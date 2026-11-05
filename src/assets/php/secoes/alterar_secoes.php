<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$nome = isset($_POST['nome']) && is_string($_POST['nome']) ? trim($_POST['nome']) : '';
$idGrupo = filter_input(INPUT_POST, 'id_grupo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);
$idRamo = filter_input(INPUT_POST, 'id_ramo', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$idSecao || $nome === '' || !$idGrupo || !$idRamo) {
    echo json_encode(["status" => "nok", "mensagem" => "Informe um ID válido, o nome, o grupo e o ramo da seção.", "data" => []]);
    exit;
}

$sql = "UPDATE secao SET nome = ?, id_grupo = ?, id_ramo = ? WHERE id_secao = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []]);
    exit;
}

$stmt->bind_param("siii", $nome, $idGrupo, $idRamo, $idSecao);

if ($stmt->execute()) {
    echo json_encode(["status" => "ok", "mensagem" => "Seção atualizada com sucesso.", "data" => []]);
} else {
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao atualizar seção. Verifique o grupo e o ramo selecionados.", "data" => []]);
}
?>