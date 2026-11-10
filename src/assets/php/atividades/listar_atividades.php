<?php
include_once('../conexao.php');
$retorno = ['status' => '', 'mensagem' => '', 'data' => []];
$situacao = $_GET['situacao'] ?? 'todas';
$situacoes = ['programada', 'concluida', 'cancelada', 'todas'];
if (!in_array($situacao, $situacoes, true)) {
    http_response_code(400);
    $retorno['status'] = 'nok';
    $retorno['mensagem'] = 'Filtro de situação inválido.';
    header('Content-type: application/json; charset=utf-8');
    echo json_encode($retorno);
    exit;
}
$sql = 'SELECT id_atividade, id_secao, titulo, descricao, inicio, termino, local, situacao FROM atividade';
if ($situacao !== 'todas') {
    $sql .= ' WHERE situacao = ?';
}
$sql .= ' ORDER BY inicio ASC';
$stmt = $conexao->prepare($sql);
if ($situacao !== 'todas') {
    $stmt->bind_param('s', $situacao);
}
$stmt->execute();
$resultado = $stmt->get_result();
$tabela = [];
while ($linha = $resultado->fetch_assoc()) {
$tabela[] = $linha;
}
$retorno['status'] = 'ok';
$retorno['mensagem'] = 'Consulta efetuada.';
$retorno['data'] = $tabela;
$stmt->close();
$conexao->close();
header('Content-type: application/json; charset=utf-8');
echo json_encode($retorno);