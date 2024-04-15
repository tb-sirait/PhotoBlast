<?php

namespace App\Http\Controllers;

use App\Models\Tempcollage;
use Illuminate\Http\Request;
use App\Http\Requests\StoreTempcollageRequest;
use App\Http\Requests\UpdateTempcollageRequest;
use Illuminate\Support\Facades\Session;

class TempcollageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('template', [
            'temps' => Tempcollage::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTempcollageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Tempcollage $tempcollage)
    {
        // masukkan ke sesi temp_id yang bernilai id tabel dari template foto
        Session::put('temp_id', $tempcollage->id);

        // redirect ke halaman kamera
        return redirect()->route('camera');
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tempcollage $tempcollage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTempcollageRequest $request, Tempcollage $tempcollage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tempcollage $tempcollage)
    {
        //
    }
}
