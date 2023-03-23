<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">

    {{-- style inertia progress --}}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />

    {{-- style loader --}}
    <style>
        .container-loader {
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #0ea5e9;
        }

        .loader {
            position: relative;
        }

        .loader span {
            position: absolute;
            transform: translate(-50%, -50%);
            font-size: 10vw;
            letter-spacing: 5px;
            left: 50%;
            width: max-content;
        }

        .loader span:nth-child(1) {
            color: transparent;
            -webkit-text-stroke: 1px #fff;
        }

        .loader span:nth-child(2) {
            /* color: rgb(128, 198, 255); */
            color: #cffafe;
            /* -webkit-text-stroke: 1px rgb(128, 198, 255); */
            -webkit-text-stroke: 1px #fff;
            animation: uiverse723 3s ease-in-out infinite;
        }

        @keyframes uiverse723 {

            0%,
            100% {
                clip-path: polygon(0% 45%, 15% 44%, 32% 50%,
                        54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
            }

            50% {
                clip-path: polygon(0% 60%, 16% 65%, 34% 66%,
                        51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
            }
        }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

<div class="container-loader fixed z-50">
    <div class="loader">
        <span>Tunggu dulu</span>
        <span>Tunggu dulu</span>
    </div>
</div>

</html>
