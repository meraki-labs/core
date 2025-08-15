<?php

use App\Http\Controllers\Users\UsersController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    Route::prefix('users')->group(function() {
        Route::get('/index', [UsersController::class, 'index'])->name('users.index');
        Route::get('/trashed', [UsersController::class, 'trashed'])->name('users.trashed');
    });
    // Route::get('users', [UsersController::class, 'index'])->name('users.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
