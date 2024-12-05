<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $contactName = filter_var($_POST['contactName'], FILTER_SANITIZE_STRING);
    $contactEmail = filter_var($_POST['contactEmail'], FILTER_VALIDATE_EMAIL);
    $contactSubject = filter_var($_POST['contactSubject'], FILTER_SANITIZE_STRING);
    $contactMessage = filter_var($_POST['contactMessage'], FILTER_SANITIZE_STRING);

    if ($contactEmail === false) {
        echo 'Invalid email address.';
        exit;
    }

    $to = "your-email@example.com"; // Replace with your email address
    $subject = $contactSubject;
    $body = "Name: $contactName\nEmail: $contactEmail\n\nMessage:\n$contactMessage";
    $headers = "From: $contactEmail";

    if (mail($to, $subject, $body, $headers)) {
        echo 'OK';
    } else {
        echo 'Error sending email.';
    }
} else {
    echo 'Invalid request method.';
}
?>