<?php
// Usar o horário local nosso
date_default_timezone_set("America/Sao_Paulo");

header("Access-Control-Allow-Origin: *");

// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "viaexp72_api_usl_coleta";

// Cria a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
  die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}

// Consulta os dados da tabela
$sql = "SELECT id, taxed_weight FROM db_coletas WHERE taxed_weight > 50";
$result = $conn->query($sql);

// Verifica se existem dados
if ($result->num_rows > 0) {
  // Array para armazenar os resultados
  $coletas = array();

  // Loop através dos resultados
  while ($row = $result->fetch_assoc()) {
    // Adiciona os dados ao array
    $coletas[] = $row;
  }

  // Converte o array para formato JSON
  $json_coletas = json_encode($coletas);

  // Retorna os dados
  echo $json_coletas;
} else {
  echo "Nenhum dado encontrado.";
}

// Fecha a conexão
$conn->close();
