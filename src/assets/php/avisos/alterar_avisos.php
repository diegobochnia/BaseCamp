<?php
    include_once('../conexao.php');

    $retorno = [
        'status'   => 'nok',
        'mensagem' => 'Não foi possível alterar o aviso.',
        'data'     => []
    ];

    $idAviso = (int) ($_GET['id'] ?? 0);
    $titulo = trim($_POST['titulo'] ?? '');
    $mensagem = trim($_POST['mensagem'] ?? '');
    $data = $_POST['data'] ?? '';
    $autor = (int) ($_POST['autor'] ?? 0);
    $visibilidade = $_POST['visibilidade'] ?? '';

    $idSecao = null;

    if ($visibilidade === 'secao') {
        $idSecao = filter_input(INPUT_POST, 'id_secao', FILTER_VALIDATE_INT, [
            'options' => ['min_range' => 1]
        ]);
    }

    if ($idAviso < 1 || $titulo === '' || $mensagem === '' || $data === '' || $autor < 1) {
        $retorno['mensagem'] = 'Informe o ID e preencha os campos do aviso.';
    } elseif (!in_array($visibilidade, ['grupo', 'publica', 'secao'], true)) {
        $retorno['mensagem'] = 'Escolha uma visibilidade válida.';
    } elseif ($visibilidade === 'secao' && !$idSecao) {
        $retorno['mensagem'] = 'Selecione uma seção válida.';
    } else {
        $stmt = $conexao->prepare(
            "UPDATE aviso
            SET titulo = ?, mensagem = ?,
                publicado_em = TIMESTAMP(?, TIME(publicado_em)),
                autor = ?, visibilidade = ?, id_secao = ?
            WHERE id_aviso = ?"
        );

        if ($stmt !== false) {
            $stmt->bind_param(
                'sssisii', $titulo, $mensagem, $data, $autor, $visibilidade, $idSecao, $idAviso
            );

            if ($stmt->execute() && $stmt->affected_rows > 0) {
                $retorno['status'] = 'ok';
                $retorno['mensagem'] = 'Aviso alterado com sucesso.';
            } elseif ($stmt->errno === 0) {
                $retorno['mensagem'] = 'Nenhuma alteração foi aplicada.';
            }

            $stmt->close();
        }
    }

    $conexao->close();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($retorno);