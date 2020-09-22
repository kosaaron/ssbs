<?php
session_start();

if (!isset($_POST['Email']) || !isset($_POST['NewPassword'])) {
	// Could not get the data that should have been sent.
	die ('Something went wrong...');
}else{
	$emailAddress = $_POST['Email'];
	$newPassword = $_POST['NewPassword'];
}

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once('../PHPMailer/PHPMailer.php');
require_once('../PHPMailer/SMTP.php');
require_once('../PHPMailer/Exception.php');

require_once('./Modules/Connect.php');

$PDOConnect = new PDOConnect();
$pdo = $PDOConnect->pdo;


$query = "SELECT 
			c_200_id,
			c_8 AS FirstName,
			c_74 AS LastName,
			c_75 AS UserPassword,
			c_76 AS Email,
			c_77 AS ActivationCode,
			c_78 AS VerificationStatus
		  FROM t_200 
          WHERE c_76 = :user_email";

$statement = $pdo->prepare($query);
$statement->execute(
	array(
		':user_email'	=>	$emailAddress
	)
);

$no_of_row = $statement->rowCount();
if($no_of_row == 0)
{
    $main_data['EmailSent'] = FALSE;
	$main_data['Message'] = 'Email címe nincs felvéve a rendszerbe. Lépjen kapcsolatba a rendszergazdával!';
}else
{
    
	$user_actcode_seed = rand(100000,999999);
	$user_activation_code = hash('sha256', $user_actcode_seed);
	
    foreach ($statement as $result) {
        $userFName = $result['FirstName'];
    }
	
	$insert_query = "
	UPDATE t_200
	SET c_77 = :user_activation_code, c_78=0
    WHERE c_76 = :user_email
	";
	
	$statement = $pdo->prepare($insert_query);
	
	$statement->execute(
		array(
			':user_email'			=>	$emailAddress,
			':user_activation_code'	=>	$user_activation_code
		)
	);
	
	//$result = $statement->fetchAll();
	
	    
	$base_url = "https://ssbs.ssbsystem.com/";
	/*$mail_body = "
	<p>Hi $userFName,</p>
	<p>Thanks for Registration. Your password is ".$user_password.", This password will work only after your email verification.</p>
	<p>Please Open this link to verify your email address - ".$base_url."Verification.php?act_code=".$user_activation_code."
	<p>Best Regards,<br />SSB SYSTEMS Co.</p>
	";*/

	$host = $_SERVER['HTTP_HOST'];
	if ($host=="localhost") {
		$testlink = 'localhost/login.php?act_code=' . $user_activation_code . '&new_pass=' . $newPassword;
		$main_data['Message'] = 'Verification link: ' . $testlink;
		$main_data['EmailSent'] = TRUE;
	}else {
		require_once('EmailTemplates.php');
		$emailTemplates = new EmailTemplates();
		$mail_body = $emailTemplates->verification($userFName, $base_url, $user_activation_code, $newPassword);
		
		$mail = new PHPMailer;
		
		$mail->CharSet = 'UTF-8';
		$mail->Encoding = 'base64';
		$mail->IsSMTP();								//Sets Mailer to send message using SMTP
		$mail->Host = 'mail.ssbsystem.com'; 		//Sets the SMTP hosts of your Email hosting, this for Godaddy
		$mail->Port = 465;								//Sets the default SMTP server port
		$mail->SMTPAuth = true;							//Sets SMTP authentication. Utilizes the Username and Password variables
		$mail->Username = 'info@ssbsystem.com';					//Sets SMTP username
		$mail->Password = 'Fradi2021BLGyőztes';					//Sets SMTP password
		$mail->SMTPSecure = 'ssl';							//Sets connection prefix. Options are "", "ssl" or "tls"
		$mail->setFrom('info@ssbsystem.com', 'SSB System');
		$mail->addAddress($emailAddress, "SSBS User");		//Adds a "To" address			
		$mail->WordWrap = 50;							//Sets word wrapping on the body of the message to a given number of characters
		$mail->IsHTML(true);							//Sets message type to HTML				
		$mail->Subject = 'Email Verification';			//Sets the Subject of the message
		$mail->Body = $mail_body;							//An HTML or plain text message body
		
		if($mail->Send())								//Send an Email. Return true on success or false on error
		{
			$main_data['EmailSent'] = TRUE;
			$main_data['Message'] = 'Email elküdlve, nézze meg bejövő üzeneteit.';
		}
	}
	
	

}

$json = json_encode($main_data);
print_r($json);
        
