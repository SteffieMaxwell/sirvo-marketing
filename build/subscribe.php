<?php
require '../vendor/autoload.php';

$email = $_POST['email'];
$type = $_POST['type'];
$name = $_POST['name'];

$sendgrid_user = 'sirvo';
$sendgrid_pass = 'Sirvo1!admin';
$request_url =  "https://sendgrid.com/api/newsletter/lists/email/add.json";
$data = array("email" => $email, "name" => $name, "Name"=>$name ,"role"=> $type);
$params = array(
    'api_user'  => $sendgrid_user,
    'api_key'   => $sendgrid_pass,
    'list'=>"Sirvo Early Access Beta Signup Redux",
    'data' =>json_encode($data)
  );

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL, $request_url);
curl_setopt ($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);
$resp = curl_exec($ch);
curl_close($ch);

if($resp == '{"inserted": 0}'){
	echo json_encode(['result'=>'failure']);
}else{
	echo json_encode(['result'=>'success']);
	$sendgrid = new SendGrid('Sirvo', 'Sirvo1!admin');
	$message    = new SendGrid\Email();
	$message->addTo($email)->
	       setFrom('hello@gosirvo.com')->
	       setSubject('Welcome to Sirvo!')->
	       setText(file_get_contents("email.html"))->
	       setHtml(file_get_contents("email.html"));

	$sendgrid->send($message);
}