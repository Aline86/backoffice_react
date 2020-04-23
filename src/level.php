<?php 
header("Access-Control-Allow-Origin: *");

include 'DBconfig.php';
$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
$level=isset($_GET['level'])?$_GET['level']:"";
$id=isset($_GET['id'])?$_GET['id']:"";
$niveau=isset($_GET['niveau'])?$_GET['niveau']:"";
if($niveau==1){
$sql = 'UPDATE eleve SET niveau_1="'.$level.'" WHERE id_eleve="'.$id.'"';;
 
$result = $conn->query($sql);
 

 echo $json;
$conn->close();
}
if($niveau==2){
    $sql = 'UPDATE eleve SET niveau_2="'.$level.'" WHERE id_eleve="'.$id.'"';;
     
    $result = $conn->query($sql);
     
    
     echo $json;
    $conn->close();
    }