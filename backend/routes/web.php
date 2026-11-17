<?php

use Illuminate\Support\Facades\Route;

// Angular application
Route::get('/{any?}', function () {
    $index = public_path('index.html');

    return file_exists($index)
        ? response()->file($index)
        : view('welcome');
})->where('any', '^(?!api|storage).*$');
