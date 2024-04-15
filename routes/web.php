<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\PhotoblastController::class, 'index'])->name('home');
Route::get('/camera', [App\Http\Controllers\PhotoblastController::class, 'camera'])->name('camera');
Route::post('/payment', [App\Http\Controllers\PhotoblastController::class, 'processpayment'])->name('payment');
Route::post('/verify', [App\Http\Controllers\PhotoblastController::class, 'verifyPayment'])->name('verify');
Route::post('/save-video', [App\Http\Controllers\PhotoblastController::class, 'saveVideo'])->name('save-video');
Route::post('/save-photo', [App\Http\Controllers\PhotoblastController::class, 'savePhoto'])->name('save-photo');
Route::post('/send-mail', [App\Http\Controllers\PhotoblastController::class, 'sendPhoto'])->name('send-mail');
Route::resource('redeem', App\Http\Controllers\CodeController::class);
Route::resource('tempcollage', \App\Http\Controllers\TempcollageController::class); 