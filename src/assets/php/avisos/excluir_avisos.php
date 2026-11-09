<?php
    include_once('../conexao.php');

    $retorno = [
        'status'   => '',
        'mensagem' => '',
        'data'     => []
    ];

    if(isset($_GET['id'])) {
        $stmt = $conexao->prepare("DELETE FROM aviso WHERE id_aviso = ?");
        $stmt->bind_param("i", $_GET['id']);
        $stmt->execute();

        if($stmt->affected_rows > 0){
            $retorno = [
                'status'    => 'ok', // ok - nok
                'mensagem'  => 'Registro excluido', // mensagem que envio para o front
                'data'      => []
            ];
        }else{
            $retorno = [
                'status'    => 'nok', // ok - nok
                'mensagem'  => 'Registro não excluido', // mensagem que envio para o front
                'data'      => []
            ];
        }
        $stmt->close();
    }else{
        // Configurando o padrão de retorno em todas
        // as situações
        $retorno = [
            'status'    => 'nok', // ok - nok
            'mensagem'  => 'É necessário informar um ID para exclusão', // mensagem que envio para o front
            'data'      => []
        ];
    }

    $conexao->close();

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($retorno);