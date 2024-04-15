@extends('layouts.app')
@section('content')
<section class="content">
  <div class="left">
    <svg xmlns="http://www.w3.org/2000/svg" width="99" height="77" viewBox="0 0 99 77" fill="none">
      <path d="M5 38.5L38.375 72M5 38.5L38.375 5M5 38.5L63.4063 38.5M94 38.5L80.0938 38.5" stroke="#E9ECEF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="templates">
    <div class="template">
      @foreach ($temps as $temp)
        <a href="{{ route('tempcollage.show', ['tempcollage' => $temp]) }}"><img src="{{ asset($temp->src) }}" alt=""></a>
      @endforeach
    </div>
  </div>
  <div class="right">
    <svg xmlns="http://www.w3.org/2000/svg" width="99" height="77" viewBox="0 0 99 77" fill="none">
      <path d="M94 38.5L60.625 5M94 38.5L60.625 72M94 38.5L35.5937 38.5M5 38.5L18.9062 38.5" stroke="#E9ECEF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</section>
<script src="{{ asset('js/gallery.js') }}"></script>
@endsection