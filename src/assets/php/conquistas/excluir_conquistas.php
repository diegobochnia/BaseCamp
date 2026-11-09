<?php
include_once __DIR__ . "/../conexao.php";
header('Content-Type: application/json; charset=utf-8');

$id = filter_input(INPUT_POST, 'id_conquista', FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]]);

if (!$id) {
    echo json_encode(["status" => "nok", "mensagem" => "ID inválido.", "data" => []]);
    exit;
}

$sql = "DELETE FROM conquista WHERE id_conquista = ?";
$stmt = $conexao->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "nok", "mensagem" => "Erro interno no banco de dados.", "data" => []]);
    exit;
}

$stmt->bind_param("i", $id);

try {
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["status" => "ok", "mensagem" => "Conquista excluída com sucesso.", "data" => []]);
        } else {
            echo json_encode(["status" => "nok", "mensagem" => "Conquista não encontrada.", "data" => []]);
        }
    } else {
        echo json_encode(["status" => "nok", "mensagem" => "Erro ao excluir conquista.", "data" => []]);
    }
} catch (mysqli_sql_exception $e) {
    // 1451 é o código de erro no MySQL/MariaDB para violação de constraint de Foreign Key
    if ($e->getCode() == 1451) {
        echo json_encode(["status" => "nok", "mensagem" => "Não é possível excluir: esta conquista já está vinculada a integrantes.", "data" => []]);
    } else {
        echo json_encode(["status" => "nok", "mensagem" => "Erro no banco de dados ao tentar excluir.", "data" => []]);
    }
}
?>
