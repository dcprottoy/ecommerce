<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\OrgSetupController;

Route::get('/', function () {
    return view('admin.dashboard');
})->name('admin.dashboard');

Route::resource('/orgsetup', OrgSetupController::class)
    ->except(['destroy'])
    ->names([
        'index'   => 'admin.orgsetup',
        'create'  => 'admin.orgsetup.create',
        'store'   => 'admin.orgsetup.store',
        'show'    => 'admin.orgsetup.show',
        'edit'    => 'admin.orgsetup.edit',
        'update'  => 'admin.orgsetup.update',
    ]);

Route::get('/landingpage', function () {
    return view('landingpage.layouts.main');
})->name('landingpage.jeans');
