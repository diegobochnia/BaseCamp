<?php
    include_once('../conexao.php');

    $retorno = [
        'status'    => '', 
        'mensagem'  => '', 
        'data'      => []
    ];

    if (isset($_GET['id'])) {
        $idAviso = (int) $_GET['id'];

        if ($idAviso < 1) {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode([
                'status' => 'nok',
                'mensagem' => 'ID do aviso inválido.',
                'data' => []
            ]);
            exit;
        }

        $stmt = $conexao->prepare(
            "SELECT * FROM aviso WHERE id_aviso = ?"
        );
        $stmt->bind_param("i", $idAviso);
    } else {
        $stmt = $conexao->prepare("SELECT * FROM aviso");
    }

    $stmt->execute();
    $resultado = $stmt->get_result();

    $tabela = [];
    if ($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $tabela[] = $linha;
        }

        $retorno = [
            'status'    => 'ok', 
            'mensagem'  => 'Consulta efetuada com sucesso', 
            'data'      => $tabela
        ];
    }else{
        if (isset($_GET['id'])) {
            $retorno = [
                'status'   => 'nok',
                'mensagem' => 'Aviso não encontrado.',
                'data'     => []
            ];
        } else {
            $retorno = [
                'status'   => 'ok',
                'mensagem' => 'Não há avisos cadastrados.',
                'data'     => []
            ];
        }
    }

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset-utf-8");
    echo json_encode($retorno);
