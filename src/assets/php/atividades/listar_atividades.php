<?php
include_once('conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];
$stmt = $conexao->prepare('SELECT id_atividade, titulo, descricao, inicio, termino, local, situacao FROM atividade WHERE situacao = ? ORDER BY inicio ASC');
$stmt->bind_param('i', $_GET['situacao']);
$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];
if ($resultado->num_rows > 0) {
while ($linha = $resultado->fetch_assoc()) {
$tabela[] = $linha;
}
$retorno['status'] = 'ok';
$retorno['mensagem'] = 'Consulta efetuada.';
$retorno['data'] = $tabela;
} else {
$retorno['status'] = 'nok';
$retorno['mensagem'] = 'Nao ha registros';
}
$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);