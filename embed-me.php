<?php
switch ($_GET['sandbox']) {
    case 'on':
        $csp = 'sandbox';
        break;
    case 'scripts':
        $csp = 'sandbox allow-scripts';
        break;
    case 'modals':
        $csp = 'sandbox allow-scripts allow-modals';
        break;
    default:
        $csp = '';
        break;
}
if ($csp) {
    header("Content-Security-Policy: {$csp};");
}
?>
<html>

<head>
    <title>CSP Sandbox Example | wizardsoftheweb</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" />
    <style type="text/css">
    body {
        font-family: 'Roboto Mono', monospace;
    }

    </style>
</head>

<body>
    <header>
        <p>This file is a simple CSP sandbox demo. Loaded in a sandbox, this will be the only paragraph.</p>
    </header>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        alert("Embedded modal alert");
        $("header").append("<p>This paragraph was dynamically added by JavaScript.</p>");
    });
    </script>
</body>

</html>
