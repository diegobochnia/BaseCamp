<?php
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];
$id_secao = $_POST['id_secao'];
$titulo = $_POST['titulo'];
$descricao = $_POST['descricao'];
$inicio = $_POST['inicio'];
$termino = $_POST['termino'];
$local = $_POST['local'];
$situacao = $_POST['situacao'];
$stmt = $conexao->prepare(
'INSERT INTO atividade(id_secao, titulo, descricao, inicio, termino, local, situacao)
VALUES (?, ?, ?, ?, ?, ?, ?)'
);
$stmt->bind_param('issssss', $id_secao, $titulo, $descricao, $inicio, $termino, $local, $situacao);
$stmt->execute();
if ($stmt->affected_rows > 0) {
$retorno['status'] = 'ok';
$retorno['mensagem'] = 'Atividade inserida com sucesso';
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'Falha ao inserir a atividade';
}
$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);