@extends('layouts.app')
@section('content')
  <button class="camera-button watch"></button>
  <div class="video-container">
    <video id="video" class="watch watch-video"></video>
  </div>
  <script>
    const templatefotosrc = "{{ asset($template_src)}}";
    const email = "{{ $email }}";
    var x = {{ $template_x }};
    var y = {{ $template_y }};
    const width = {{ $template_width }};
    const height = {{ $template_height }};
  </script>
  <script src="{{ asset('js/camera.js') }}"></script>
@endsection