@extends('layouts.app')
@section('content')
<section id="content">
  <h1>{{ $h1 }}</h1>
  <section id="list-photo">
    <form action="@if(Request::routeIs('list-photo')) {{ route('retake-photo') }} @elseif(Request::routeIs('print-photo')) {{ route('print') }} @endif" method="post">
      @csrf
      @foreach(collect($photos)->chunk(5) as $photoschunk)
        <div class="photo-group">
          @foreach($photoschunk as $photo)
            <div class="photo-item">
              <input type="checkbox" name="photos[]" id="{{ $photo }}" value="{{ $photo }}">
              <label for="{{ $photo }}"><img src="{{ asset(str_replace('public', 'storage', $photo)) }}" alt=""></label>
            </div>
          @endforeach
        </div>
      @endforeach
    </section>
    @if(Request::routeIs('list-photo'))
      <div class="notes">*{{ $notes }}</div>
    @endif
    <div class="formgroup">
      @if(Request::routeIs('list-photo'))
        <button type="submit" class="formbutton">
          Retake
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 52" fill="none">
            <path d="M23 16.317L31.75 0.959821C35.5417 1.98363 38.9067 3.86061 41.845 6.59077C44.7833 9.32093 46.9183 12.563 48.25 16.317H23ZM16.0625 22.7158L7.50002 7.35863C9.75002 5.09772 12.365 3.30605 15.345 1.98363C18.325 0.661211 21.5433 0 25 0C25.5417 0 26.1667 0.0324209 26.875 0.0972622C27.5833 0.162103 28.2292 0.236329 28.8125 0.31994L16.0625 22.7158ZM0.812527 31.994C0.562528 30.9702 0.364194 29.9251 0.217528 28.8586C0.0708611 27.7922 -0.00163857 26.7044 2.809e-05 25.5952C2.809e-05 22.5665 0.479194 19.7083 1.43753 17.0208C2.39586 14.3333 3.75002 11.8805 5.50002 9.6622L18.125 31.994H0.812527ZM18.3125 50.2307C14.5208 49.2068 11.1458 47.3299 8.18752 44.5997C5.22919 41.8695 3.08336 38.6275 1.75003 34.8735H26.9375L18.3125 50.2307ZM25 51.1905C24.375 51.1905 23.7392 51.1478 23.0925 51.0625C22.4458 50.9772 21.8317 50.8919 21.25 50.8065L33.9375 28.4747L42.5 43.8318C40.25 46.0928 37.6358 47.8844 34.6575 49.2068C31.6792 50.5293 28.46 51.1905 25 51.1905ZM44.5 41.5283L31.875 19.1964H49.1875C49.4375 20.2202 49.6358 21.2654 49.7825 22.3318C49.9291 23.3983 50.0016 24.4861 50 25.5952C50 28.5813 49.49 31.4395 48.47 34.1696C47.45 36.8998 46.1266 39.3527 44.5 41.5283Z" fill="black"/>
          </svg>
        </button>
        <a href="{{ route('print-photo') }}" class="formbutton">
          Next
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40" fill="none">
            <path d="M15.9091 31.0795L3.97727 19.1477L0 23.125L15.9091 39.0341L50 4.94315L46.0227 0.965881L15.9091 31.0795Z" fill="black"/>
          </svg>
        </a>
      @elseif(Request::routeIs('print-photo'))
        <a href="{{ route('list-photo') }}" class="formbutton">
          Kembali
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="52" viewBox="0 0 50 52" fill="none">
            <path d="M3.83947 19.8641L1.91974 22.3249L0 19.8641L1.91974 17.4033L3.83947 19.8641ZM50 47.7093C50 48.6325 49.7139 49.5178 49.2047 50.1705C48.6955 50.8233 48.0048 51.19 47.2847 51.19C46.5645 51.19 45.8739 50.8233 45.3646 50.1705C44.8554 49.5178 44.5693 48.6325 44.5693 47.7093H50ZM15.4964 39.7282L1.91974 22.3249L5.7592 17.4033L19.3358 34.8066L15.4964 39.7282ZM1.91974 17.4033L15.4964 0L19.3358 4.92165L5.7592 22.3249L1.91974 17.4033ZM3.83947 16.3834H30.9927V23.3448H3.83947V16.3834ZM50 40.748V47.7093H44.5693V40.748H50ZM30.9927 16.3834C36.0338 16.3834 40.8683 18.9504 44.4329 23.5197C47.9975 28.0889 50 34.2861 50 40.748H44.5693C44.5693 36.1324 43.139 31.7058 40.5928 28.4421C38.0467 25.1783 34.5935 23.3448 30.9927 23.3448V16.3834Z" fill="black"/>
          </svg>
        </a>
        <button type="submit" class="formbutton">
          Cetak
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40" fill="none">
            <path d="M15.9091 31.0795L3.97727 19.1477L0 23.125L15.9091 39.0341L50 4.94315L46.0227 0.965881L15.9091 31.0795Z" fill="black"/>
          </svg>
        </button>
      @endif
    </div>
  </form>
</section>
@endsection