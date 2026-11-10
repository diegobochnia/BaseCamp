<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];
if (isset($_GET['id_atividade'])) {
$id_secao = $_POST['id_secao'];
$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$inicio = $_POST['inicio'];
$termino = $_POST['termino'];
$local = $_POST['local'];
$situacao = $_POST['situacao'];
$stmt = $conexao->prepare(
'UPDATE atividade
SET id_secao = ?, titulo = ?, descricao = ?, inicio = ?, termino = ?, local = ?, situacao = ?
WHERE id_atividade = ?'
);
$stmt->bind_param('issssssi', $id_secao, $titulo, $descricao, $inicio, $termino, $local, $situacao, $_GET['id_atividade']);
$stmt->execute();
if ($stmt->affected_rows > 0) {
$retorno['status'] = 'ok';
$retorno['mensagem'] = 'Atividade alterada com sucesso.';
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'Nao foi possivel alterar a atividade.';
}
$stmt->close();
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'ID nao informado.';
}
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);