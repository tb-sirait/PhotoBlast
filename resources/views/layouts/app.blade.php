<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photoblast</title>
  @if(Request::routeIs('camera'))
    <link rel="stylesheet" href="{{ asset('css/camera.css') }}">
    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset("js/jszip.min.js") }}"></script>
    <script src="{{ asset('js/email.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

  @else
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  @endif
</head>
<body>
  @yield('content')
</body>
</html>