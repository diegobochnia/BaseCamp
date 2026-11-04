<?php

$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "basecamp_v2";

mysqli_report(MYSQLI_REPORT_OFF);

$conexao = new mysqli($servidor, $usuario, $senha, $banco);

if ($conexao->connect_errno) {
    header("Content-Type: application/json; charset=utf-8");

    echo json_encode([
        "status" => "nok",
        "mensagem" => "Não foi possível conectar ao banco de dados.",
        "data" => []
    ]);

    exit;
}

$conexao->set_charset("utf8mb4");


// Para conectar o banco de dados em cada endpoint:
// include_once __DIR__ . "/../conexao.php";