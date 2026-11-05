<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$idSecao) {
    echo json_encode(["status" => "nok", "mensagem" => "ID inválido.", "data" => []]);
    exit;
}

$sql = "DELETE FROM secao WHERE id_secao = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []]);
    exit;
}

$stmt->bind_param("i", $idSecao);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["status" => "ok", "mensagem" => "Seção excluída com sucesso.", "data" => []]);
    } else {
        echo json_encode(["status" => "nok", "mensagem" => "Seção não encontrada.", "data" => []]);
    }
} elseif ($stmt->errno === 1451) {
    echo json_encode(["status" => "nok", "mensagem" => "Não é possível excluir esta seção porque ela está vinculada a outros registros.", "data" => []]);
} else {
    echo json_encode(["status" => "nok", "mensagem" => "Erro ao excluir seção.", "data" => []]);
}
?>
