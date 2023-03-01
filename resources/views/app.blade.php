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

    {{-- style container_loading --}}
    <style>
        #container_loading {
            background: rgba(255, 255, 255, 0.25);
            /* background: #2dd4bf; */
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        #circle_loading img {
            background: rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        #circle_loading span {
            background: #2dd4bf;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            border: 1px solid #fff;
            padding: 0 10px;
            display: block;
        }

        /* #circle_loading svg {
            width: 150px;
            height: 150px;
            transform: rotate(270deg);
            transition: 5s;
        } */

        /* #circle_loading svg circle {
            width: 100%;
            height: 100%;
            fill: transparent;
            stroke-width: 8;
            stroke: #282828;
            transform: translate(24px, 24px);
            filter: drop-shadow(0 0 5px #04fc43);
        }

        #circle_loading svg circle:nth-child(2) {
            stroke-dasharray: 355;
            stroke-dashoffset: 150;
            stroke: #04fc43;
        } */
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    <div id="container_loading"
        class="hidden top-0 right-0 bottom-0 left-0 bg-[#2f363e] justify-center items-center z-50">
        <div id="circle_loading" class="hidden text-center cursor-wait">
            {{-- <svg class="animate-spin">
                <circle cx="50" cy="50" r="50"></circle>
                <circle cx="50" cy="50" r="50"></circle>
            </svg>  --}}
            <img src="/api/image/spongebob.gif" alt="" width="200">
            <span class="text-white animate-pulse font-bold mt-2 text-xl ">
                Dagoan heula ...
            </span>
        </div>
    </div>
    @inertia

</body>

</html>
