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

    if ($idAviso < 1 || $titulo === '' || $mensagem === '' || $data === '' || $autor < 1) {
        $retorno['mensagem'] = 'Informe o ID e preencha os campos do aviso.';
    } elseif (!in_array($visibilidade, ['grupo', 'publica'], true)) {
        $retorno['mensagem'] = 'Escolha Todo o grupo ou Pública.';
    } else {
        $stmt = $conexao->prepare(
            "UPDATE aviso
            SET titulo = ?, mensagem = ?,
                publicado_em = TIMESTAMP(?, TIME(publicado_em)),
                autor = ?, visibilidade = ?, id_secao = NULL
            WHERE id_aviso = ?"
        );

        if ($stmt !== false) {
            $stmt->bind_param(
                'sssisi', $titulo, $mensagem, $data, $autor, $visibilidade, $idAviso
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