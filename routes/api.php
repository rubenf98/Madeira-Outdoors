<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FetchRelevantReservationsInvokable;
use App\Http\Controllers\FetchReservationsPerMonthInvokable;
use App\Http\Controllers\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', 'App\Http\Controllers\AuthController@logout');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
Route::get('me', 'App\Http\Controllers\AuthController@me');

Route::get('/reservations-per-month', FetchReservationsPerMonthInvokable::class);
Route::get('/reservations-relevant', FetchRelevantReservationsInvokable::class);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('activities', ActivityController::class);
Route::apiResource('reservations', ReservationController::class);
