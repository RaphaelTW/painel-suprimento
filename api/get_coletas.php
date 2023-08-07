<?php
// Usar o horário local nosso
date_default_timezone_set("America/Sao_Paulo");

header("Access-Control-Allow-Origin: *");

// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "viaexp72_api_usl_coleta";

try {
    // Cria a conexão usando PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    // Define o modo de erro do PDO para exceções
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta os dados da tabela
    $sql = "SELECT sequence_code, taxed_weight FROM db_coletas WHERE taxed_weight > 50";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Define o modo de busca para retornar um array associativo
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    // Obtém os resultados
    $coletas = $stmt->fetchAll();

    // Verifica se existem dados
    if (!empty($coletas)) {
        // Converte o array para formato JSON
        $json_coletas = json_encode($coletas);

        // Retorna os dados
        echo $json_coletas;
    } else {
        echo "Nenhum dado encontrado.";
    }
} catch (PDOException $e) {
    // Em caso de erro na conexão ou consulta, exibe a mensagem de erro
    echo "Erro na conexão com o banco de dados: " . $e->getMessage();
}

// Fecha a conexão
$conn = null;
?>
