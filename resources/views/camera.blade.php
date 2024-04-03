@extends('layouts.app')
@section('content')
  <button class="camera-button watch"></button>
  <div class="video-container">
    <video id="video" class="watch watch-video"></video>
  </div>
  <script>
    const templatefotosrc = "{{ asset('template.jpg') }}"
  </script>
  <script src="{{ asset('js/camera.js') }}"></script>
@endsection