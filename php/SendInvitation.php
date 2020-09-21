<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
/* use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once('PHPMailer/PHPMailer.php');
require_once('PHPMailer/SMTP.php');
require_once('PHPMailer/Exception.php'); */


if (!isset($_POST['EmployeeId'])) {
	// Could not get the data that should have been sent.
	die('No employee found!');
}

class SendEmail
{
	function __construct()
	{
		$employeeId = $_POST['EmployeeId'];

		require_once('Modules/Connect.php');
		$PDOConnect = new PDOConnect();
		$this->pdo = $PDOConnect->pdo;

		$query = "SELECT 
					c_200_id,
					c_8 AS FirstName,
					c_74 AS LastName,
					c_75 AS UserPassword,
					c_76 AS Email,
					c_77 AS ActivationCode,
					c_78 AS VerificationStatus
				  FROM t_200 
             	  WHERE c_200_id = :employeeId";

		$statement = $this->pdo->prepare($query);
		$statement->execute(
			array(
				':employeeId'	=>	$employeeId
			)
		);


		foreach ($statement as $result) {
			$userFName = $result['FirstName']; //Emailbe megszólításhoz
			$userEmail = $result['Email'];
		}

		$query = "SELECT 
					c_200_id,
					c_8 AS FirstName,
					c_74 AS LastName,
					c_75 AS UserPassword,
					c_76 AS Email,
					c_77 AS ActivationCode,
					c_78 AS VerificationStatus
				  FROM t_200 
				  WHERE Email = :useremail";

		$statement = $this->pdo->prepare($query);
		$statement->execute(
			array(
				':useremail'	=>	$userEmail
			)
		);

		$no_of_row = $statement->rowCount();

		if ($no_of_row > 1) {
			
			$main_data['Message'] = "Invitation failed: email already exists!";
			$main_data['Result'] = 'E';
		} else {

			$main_data['Message'] = "Sending invitation for " . $userEmail;
			$main_data['Result'] = 'S';

			/* EMAIL KÜLDÉS MAJD A SZERVEREN (phpMailer be kell húzni még)         	
			$user_password = rand(100000,999999);
        	$user_encrypted_password = password_hash($user_password, PASSWORD_DEFAULT);
        	$user_activation_code = hash("sha256", "valami");
        	$insert_query = "
        	INSERT INTO t_200 
        	(c_76, c_8, c_74, c_77, c_78) 
        	VALUES (:user_email, :user_fname, :user_lname, :user_activation_code, :user_email_status)
        	";
        	
        	$statement = $this->pdo->prepare($insert_query);
        	
        	$statement->execute(
        		array(
        			':user_email'			=>	$data->user_email,
        			':user_fname'			=>	$data->user_fname,
        			':user_lname'			=>	$data->user_lname,
        			':user_activation_code'	=>	$user_activation_code,
        			':user_email_status'	=>	false
        		)
        	);
        	
        	//$result = $statement->fetchAll();
        	
        	    
    		$base_url = "https://ssbsystem.com/";

    		require_once('EmailTemplates.php');
    		$emailTemplates = new EmailTemplates();
    		$mail_body = $emailTemplates->verification($data->user_fname, $user_password, $base_url, $user_activation_code);
    		echo "test";
    		
    		$mail = new PHPMailer;
    		
    		$mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
    		$mail->IsSMTP();								//Sets Mailer to send message using SMTP
    		$mail->Host = 'mail.ssbsystem.com'; 		//Sets the SMTP hosts of your Email hosting, this for Godaddy
    		$mail->Port = 465;								//Sets the default SMTP server port
    		$mail->SMTPAuth = true;							//Sets SMTP authentication. Utilizes the Username and Password variables
    		$mail->Username = 'info@ssbsystem.com';					//Sets SMTP username
    		$mail->Password = 'Sport2018';					//Sets SMTP password
    		$mail->SMTPSecure = 'ssl';							//Sets connection prefix. Options are "", "ssl" or "tls"
    		$mail->setFrom('info@ssbsystem.com', 'SSB System');
    		$mail->addAddress($data->user_email, $data->user_name);		//Adds a "To" address			
    		$mail->WordWrap = 50;							//Sets word wrapping on the body of the message to a given number of characters
    		$mail->IsHTML(true);							//Sets message type to HTML				
    		$mail->Subject = 'Email Verification';			//Sets the Subject of the message
    		$mail->Body = $mail_body;							//An HTML or plain text message body
    		if($mail->Send())								//Send an Email. Return true on success or false on error
    		{
    			$message = '<label class="text-success">Register Done, Please check your mail.</label>';
    		} */
		}

		$json = json_encode($main_data);
		print_r($json);

		
	}
}

$SendEmail = new SendEmail();