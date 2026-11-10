<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];
if (isset($_GET['id'])) {
$stmt = $conexao->prepare('DELETE FROM atividade WHERE id_atividade = ?');
$stmt->bind_param('i', $_GET['id']);
$stmt->execute();
if ($stmt->affected_rows > 0) {
$retorno['status'] = 'ok';
$retorno['mensagem'] = 'Atividade excluida';
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'Atividade nao excluida';
}
$stmt->close();
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'E necessario informar um ID para exclusao';
}
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);