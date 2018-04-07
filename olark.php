<?
// <readme>
/*
	This is a lite version of Olark's and Intercom's functionality (without the chat part).

	It lets you get feedback from users on your site to your email.

	And you won't have to rely on another company anymore!

	#killyourdependencies

	You use it like this. Put this in your PHP page wherever you want the box to show up:

		require('feedback-popup.php');

	You can also embed it as a JS file:

		<script src="/feedback-popup.php?action=feedback-popup-as-js"></script>

	Make sure you embed it AFTER you load jQuery.

	The JS will POST the message to your server at /feedback-popup.php, make sure the file is
	in your root for it to work.

	P.S. You need 2 dependencies, jQuery and PHPMailer
	P.S. 2. Feel free to replace the PHP with JS etc and take it.

	License: do whatever you want with this, I don't care <3333
*/
// </readme>

// <config>
	// change these values!
	// enter the to name and to email address the messages are sent to
	$config['toName']='Remote OK';
	$config['toEmail']='bla@remoteok.io';
	// you'll need an SMTP server, I use MailChimp's Mandrill:
	// https://mandrillapp.com
	// $config['smtp']['hostname']='smtp.mandrillapp.com';
	// $config['smtp']['port']=587;
	// $config['smtp']['server']['secure']='tls';
	// enter your login to the SMTP serveR:
	// $config['smtp']['username']='';
	// $config['smtp']['password']='';
	// you'll need PHPMailer: https://github.com/PHPMailer/PHPMailer
	// specify the path to it here:
	$config['pathToPHPMailer']=__DIR__.'/../lib/smtp-mailer/class.phpmailer.php';
	$config['pathToPHPMailerSMTP']=__DIR__.'/../lib/smtp-mailer/class.phpmailer.php';
// </config>

if($_GET['action']=='feedback-popup-as-js') {
	// enable embedding as JS file
	header('Content-Type: application/javascript');
	?>
	$(function() {
		$.get('<?=$_SERVER['HTTPS'] ? 'https://' : 'http://';?><?=$_SERVER['HTTP_HOST']?>/feedback-popup.php',function(html) {
			$('body').append(html);
		});
	})
	<?
	exit;
}
if(empty($_POST['message'])) {
	// show feedback page
	?>
	<div class="feedback-popup">
		<span class="title">
			Need help?
		</span>
		<i class="fa fa-chevron-up action-expand-feedback-popup"></i>
		<span class="text">
			Need help? Have feedback?
		</span>
		<span class="success-text">
			Thanks for the message! We will get back to you soon.
		</span>
		<input type="text" placeholder="Name" class="name" />
		<input type="email" placeholder="Email" class="email" />
		<textarea placeholder="Write your message" class="message"></textarea>
		<div class="button action-feedback-popup-send">Send</div>
	</div>
	<style>
		.feedback-popup {
			position:fixed;
			border:2px solid #c6c2be;
			bottom:0;
			left:2em;
			margin:0;
			width:16em;
			text-align:left;
			padding:0.5em;
			padding-left:0.75em;
			padding-right:0.75em;
			z-index:1000;
			border-radius:5px;
			border-bottom-left-radius:0;
			border-bottom-right-radius:0;
			border-bottom:0;
			background:#fff;
			cursor:pointer;
			color:#c6c2be;
		}
		.feedback-popup * {
			display:none !important;
			box-sizing:border-box;
		}
		.feedback-popup .action-expand-feedback-popup {
			background:#c6c2be;
			border-radius:5px;
			padding:0.5em;
			color:#fff;
			font-size:10px;
			position:absolute;
			top:0.85em;
			right:0.85em;
			display:block !important;
		}
		.feedback-popup .title {
			display:block !important;
			color:#c6c2be;
			font-weight:bold;
		}
		.feedback-popup.expanded .title {
			color:#353535;
		}
		.feedback-popup .title:hover {
			text-decoration:underline;
		}
		.feedback-popup.expanded * {
			display:block !important;
		}
		.feedback-popup.expanded {
			cursor:normal;
			min-height:18em;
		}
		.feedback-popup .text {
			margin-top:15px;
			margin-bottom:5px;
			font-size:14px;
		}
		.feedback-popup input,
		.feedback-popup textarea {
			width:100% !important;
	    	border: 1px solid #e4e4e4 !important;
		    padding: 4px !important;
		    margin-bottom: 5px !important;
		    font-size: 14px !important;
		    border-radius: 5px !important;
			box-shadow:none !important;
			font-weight:normal !important;
			outline:none !important;
		}
		.feedback-popup textarea {
			min-height:7em;
		}
		.feedback-popup .button {
			float:right;
			font-weight:bold;
			padding:0.25em;
			padding-left:0.75em !important;
			padding-right:0.75em !important;
			border-radius:5px !important;
			background:#ff4742;
			border:2px solid #ff4742;
			color:#fff;
			margin-top:5px;
			text-transform:none !important;
		}
		.feedback-popup .button:hover {
			color:#ff4742;
			background:none;
		}
		.feedback-popup .success-text {
			font-size:14px;
			margin-top:15px;
			display:none !important;
		}
		.feedback-popup.success * {
			display:none !important;
		}
		.feedback-popup.success .fa,
		.feedback-popup.success .title,
		.feedback-popup.success .success-text {
			display:block !important;
		}
		.feedback-popup:not(.expanded) .success-text {
			display:none !important;
		}

		@media (max-width:600px) {
			.feedback-popup {
				display:none;
			}
		}
	</style>
	<script>
		$(function() {
			$('.feedback-popup .title').bind('click',function(e) {
				toggleFeedbackPopup();
				e.stopPropagation();
				e.preventDefault();
			});
			$('.feedback-popup').bind('click touchend',function() {
				if(!$(this).hasClass('expanded')) toggleFeedbackPopup();
			});
			$('.feedback-popup .action-expand-feedback-popup').bind('click',function() {
				toggleFeedbackPopup();
				e.stopPropagation();
				e.preventDefault();
			});
			function toggleFeedbackPopup() {
				$('.feedback-popup').toggleClass('expanded');
				if($('.feedback-popup').hasClass('expanded')) {
					$('.feedback-popup').removeClass('success');
					$('.feedback-popup input').val('');
					$('.feedback-popup textarea').val('');
					$('.feedback-popup .fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				}
				else {
					$('.feedback-popup input').val('');
					$('.feedback-popup textarea').val('');
					$('.feedback-popup').removeClass('success');
					$('.feedback-popup .fa').addClass('fa-chevron-up').removeClass('fa-chevron-down');
				}
			}
			$('.feedback-popup .button').bind('click touchend',function() {
				if($('.feedback-popup .name').val().trim()=='' || $('.feedback-popup .email').val().trim()=='') {
					alert("Please complete all fields.");
					return;
				}
				if(!validateEmail($('.feedback-popup .email').val())) {
					alert("Please specify a valid email.");
					return;
				}
				$.ajax({
					url: "<?=$_SERVER['HTTPS'] ? 'https://' : 'http://';?><?=$_SERVER['HTTP_HOST']?>/feedback-popup.php",
					dataType:'json',
					type:'POST',
					data:{
						name:$('.feedback-popup .name').val(),
						email:$('.feedback-popup .email').val(),
						message:$('.feedback-popup .message').val()
					},
					context: document.body
				}).done(function(reply) {
					if(reply.success=='true' || reply.success==true) {
						$('.feedback-popup').addClass('success');
					}
					else {
						alert("Sorry, can't connect to the server right now");
					}
				});
			});
		});
		function validateEmail(email) {
		   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	</script>
<?}

if(!empty($_POST['message']) && !empty($_POST['name']) && !empty($_POST['email'])) {

	// send message
	require_once($config['pathToPHPMailer']);
	require_once($config['pathToPHPMailerSMTP']);

	$_POST['email']=strip_tags($_POST['email']);
	$_POST['name']=strip_tags(substr($_POST['name'],0,50));
	$_POST['message']=strip_tags(substr($_POST['message'],0,1000));

	$subject=$_SERVER['HTTP_HOST'].': '.$_POST['email'].' wrote you a note';
	$body=$_POST['message']."\n\n----
You received this message from a visitor

Name: ".$_POST['name']."

Email: ".$_POST['email']."

The visitor was on this page: ".($_SERVER['HTTPS'] ? 'https://' : 'http://').$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."

Web Browser: ".$_SERVER['HTTP_USER_AGENT']."
IP Address: ".$_SERVER['REMOTE_ADDR']."
Location: ".$_SERVER['GEOIP_COUNTRY']."

";

	try {
		$mail=new PHPMailer(true); // create a new object
		$mail->isSMTP();
		$mail->SMTPDebug=0;
		$mail->IsHTML(false);
		$mail->CharSet = 'UTF-8';
		$mail->SMTPAuth=true;
		$mail->SMTPSecure=$config['smtp']['server']['secure'];
		$mail->Host=$config['smtp']['hostname'];
		$mail->Port=$config['smtp']['port'];
		$mail->Username=$config['smtp']['username'];
		$mail->Password=$config['smtp']['password'];
		$mail->AddReplyTo(
			$_POST['email'],
			$_POST['name']
		);
		$mail->SetFrom(
			$config['toEmail'],
			$config['toName']
		);
		$mail->AddAddress(
			$config['toEmail'],
			$config['toName']
		);
		$mail->Subject=$subject;
		// $mail->AltBody=$body;
		// $mail->WordWrap=80;
		$mail->Body=$body;

		// <sent failed>
			if(!$mail->Send()) {
				echo json_encode(
					array(
						'success'=>false,
						'message'=>$mail->ErrorInfo()." ".json_encode($config)
					)
				);
				exit;
			}
		// </sent failed>

		// <sent succesfully>
			else {
				echo json_encode(array('success'=>true));
				exit;
			}
		// </sent succesfully>
	}
	catch (phpmailerException $e) {
		echo json_encode(array('success'=>false,'message'=>$e->getMessage()));
		exit;
	}
	catch (Exception $e) {
		echo json_encode(array('success'=>false,'message'=>$e->getMessage()));
		exit;
	}
}
?>
