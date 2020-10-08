<?php
    # запись в переменные значений с полей формы и фильтрация для безопасности
    $username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
	$data    = filter_var($_POST['date'], FILTER_SANITIZE_EMAIL);
	$time    = filter_var($_POST['time'], FILTER_SANITIZE_STRING);
	$phone    = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
	$remind    = filter_var($_POST['remind'], FILTER_SANITIZE_STRING);


	$error = '';

	# проверка формы на валидность
	if (strlen($username) <= 3)
	{
		$error = 'Enter your name';
	}
	else if (strlen($data) <= 3)
	{
		$error = 'Enter date';
	}
	else if (strlen($time) <= 3)
	{
		$error = 'Enter time';
	}

	if ($error != '')
	{
		echo $error;
		exit();
	}
    echo 'Готово';
?>