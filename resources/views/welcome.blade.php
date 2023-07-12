<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5">

    <title>Madeira Outdoors</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;700;900&display=swap" rel="stylesheet">

    <!-- Styles -->


    <style>
        html,
        body,
        #index {
            height: 100%;
            font-family: 'Nunito', sans-serif;
            scroll-behavior: smooth;
        }

        body {
            margin: 0;
            position: relative;
        }

        .rmdp-week-day {
            height: 90px;
        }

        .menu-modal .ant-drawer-body {
            padding: 0px;
        }
    </style>

</head>

<body>
    <div id="index">
        <script src="{{ mix('/js/app.js') }}"></script>
    </div>
</body>


</html>