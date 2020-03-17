
<?php
$nom = $_POST['formNom'];
$email = $_POST['formEmail'];
$message = $_POST['formMessage'];
$id = $_POST['formId'];
$long = $_POST['long'];
$lati = $_POST['lati'];
$erreur = $_POST['typeErreur'];
header('Content-Type: application/json');
if ($nom === ''){
print json_encode(array('message' => 'Le champs nom doit être rempli', 'code' => 0));
exit();
}
if ($email === ''){
print json_encode(array('message' => 'Le champs e-mail doit être rempli', 'code' => 0));
exit();
} else {
if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
print json_encode(array('message' => 'E-mail non valide', 'code' => 0));
exit();
}
}
if ($message === ''){
print json_encode(array('message' => 'Le champs message doit être rempli', 'code' => 0));
exit();
}
if ($erreur === ''){
print json_encode(array('message' => 'Un type derreur doit être choisi', 'code' => 0));
exit();
}

$content="Message de : $nom \n E-mail : $email \n Numéro du site : $id \n Type de l'erreur : $erreur \n Longitude : $long \n Latitude : $lati \n Message: $message";
$recipient = "zacharie.moulin@gmail.com";
$subject = "Erreur signalée sur l'inventaire du patrimoine : site n°$id";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $content, $mailheader) or die("Error!");
print json_encode(array('message' => 'E-mail envoyé !', 'code' => 1));
exit();
?>
