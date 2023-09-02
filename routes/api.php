<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlockDateController;
use App\Http\Controllers\BlockPeriodController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FetchRelevantReservationsInvokable;
use App\Http\Controllers\FetchReservationsPerMonthInvokable;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UpdateActivityStatusInvokable;
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

Route::get('/selector/categories', [CategoryController::class, 'selector']);
Route::get('/selector/activities', [ActivityController::class, 'selector']);

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', 'App\Http\Controllers\AuthController@logout');
Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
Route::get('me', 'App\Http\Controllers\AuthController@me');

Route::put('/activity-status/{activity}', UpdateActivityStatusInvokable::class);

Route::get('/reservations-per-month', FetchReservationsPerMonthInvokable::class);
Route::get('/reservations-relevant', FetchRelevantReservationsInvokable::class);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('activities', ActivityController::class);
Route::apiResource('reservations', ReservationController::class);
Route::apiResource('blocked-dates', BlockDateController::class);
Route::apiResource('blocked-periods', BlockPeriodController::class);
