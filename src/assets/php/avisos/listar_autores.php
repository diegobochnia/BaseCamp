<?php
    include_once('../conexao.php');

    $retorno = [
        "status"   => "nok",
        "mensagem" => "Não foi possível consultar os autores.",
        "data"     => []
    ];

    $stmt = $conexao->prepare(
        "SELECT id_usuario, nome FROM usuario WHERE ativo = 1 ORDER BY nome"
    );

    if ($stmt !== false) {
        if ($stmt->execute()) {
            $resultado = $stmt->get_result();

            if ($resultado !== false) {
                while ($linha = $resultado->fetch_assoc()) {
                    $retorno["data"][] = $linha;
                }

                $retorno["status"] = "ok";
                $retorno["mensagem"] = "Consulta efetuada com sucesso.";
            }
        }

        $stmt->close();
    }

    $conexao->close();

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($retorno);