@extends('layouts.app')
@section('content')
<section id="content">
  <section id="Photos">
    <div class="photo">
    </div>
  </section>
  <section id="Camera">
    <div class="video-container">
      <video id="video" class=" watch-video"></video>
      <div id="countdown-display"></div>
    </div>
    <div class="button">
        <button class="camera-button ">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 52" fill="none">
            <path d="M23 16.317L31.75 0.959821C35.5417 1.98363 38.9067 3.86061 41.845 6.59077C44.7833 9.32093 46.9183 12.563 48.25 16.317H23ZM16.0625 22.7158L7.50002 7.35863C9.75002 5.09772 12.365 3.30605 15.345 1.98363C18.325 0.661211 21.5433 0 25 0C25.5417 0 26.1667 0.0324209 26.875 0.0972622C27.5833 0.162103 28.2292 0.236329 28.8125 0.31994L16.0625 22.7158ZM0.812527 31.994C0.562528 30.9702 0.364194 29.9251 0.217528 28.8586C0.0708611 27.7922 -0.00163857 26.7044 2.809e-05 25.5952C2.809e-05 22.5665 0.479194 19.7083 1.43753 17.0208C2.39586 14.3333 3.75002 11.8805 5.50002 9.6622L18.125 31.994H0.812527ZM18.3125 50.2307C14.5208 49.2068 11.1458 47.3299 8.18752 44.5997C5.22919 41.8695 3.08336 38.6275 1.75003 34.8735H26.9375L18.3125 50.2307ZM25 51.1905C24.375 51.1905 23.7392 51.1478 23.0925 51.0625C22.4458 50.9772 21.8317 50.8919 21.25 50.8065L33.9375 28.4747L42.5 43.8318C40.25 46.0928 37.6358 47.8844 34.6575 49.2068C31.6792 50.5293 28.46 51.1905 25 51.1905ZM44.5 41.5283L31.875 19.1964H49.1875C49.4375 20.2202 49.6358 21.2654 49.7825 22.3318C49.9291 23.3983 50.0016 24.4861 50 25.5952C50 28.5813 49.49 31.4395 48.47 34.1696C47.45 36.8998 46.1266 39.3527 44.5 41.5283Z" fill="black"/>
          </svg>
        </button>
        <select class="timer-button">
            <option value="3">3s</option>
            <option value="5">5s</option>
            <option value="10">10s</option>
        </select>
    </div>
  </section>
</section>
  <script>
    const email = "{{ $email }}";
    const limit = {{ $limit }}
    var photoName = {!! json_encode($photoname) !!};
  </script>
  <script src="{{ asset('js/camera.js') }}"></script>
@endsection
