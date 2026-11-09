<?php
    include_once('../conexao.php');
    $retorno = [
        'status'    => '',
        'mensagem'  => '',
        'data'      => []
    ];

    if (empty($_POST['titulo']) || empty($_POST['mensagem']) || empty($_POST['data']) || empty($_POST['autor']) || empty($_POST['visibilidade'])){
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Todos os campos são obrigatórios';
        $conexao->close();

        header('Content-type: application/json; charset=utf-8');
        echo json_encode($retorno);
        exit;
    }

    $idGrupo = 1;
    $autor = (int) ($_POST['autor'] ?? 0);
    $titulo = trim($_POST['titulo'] ?? '');
    $mensagem = trim($_POST['mensagem'] ?? '');
    $publicadoEm = ($_POST['data'] ?? '') . ' 00:00:00';
    $visibilidade = $_POST['visibilidade'] ?? '';

    if ($autor < 1 || !in_array($visibilidade, ['grupo', 'publica'], true)) {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Selecione um autor e escolha Todo o grupo ou Pública.';

        $conexao->close();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($retorno);
        exit;   
    }

    $stmt = $conexao->prepare(
        "INSERT INTO aviso (id_grupo, autor, titulo, mensagem, publicado_em, visibilidade) 
        VALUES (?, ?, ?, ?, ?, ?)"
    );

    if ($stmt === false) {
        $retorno['status'] = 'nok';
        $retorno['mensagem'] = 'Falha ao preparar o cadastro.';

        $conexao->close();
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($retorno);
        exit;
    }

    
    $stmt->bind_param('iissss', $idGrupo, $autor, $titulo, $mensagem, $publicadoEm, $visibilidade);
    $stmt->execute();

    if($stmt->affected_rows > 0){
        $retorno = [
            'status' => 'ok',
            'mensagem' => 'registro inserido com sucesso',
            'data' => []
        ];
    }else{
        $retorno = [
            'status' => 'nok',
            'mensagem' => 'Erro MySQL'. $stmt->errno . ': ' . $stmt->error,
            'data' => []
        ];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset=utf-8");
    echo json_encode($retorno);
