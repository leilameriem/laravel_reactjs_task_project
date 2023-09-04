<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\CategoryController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('tasks',[TaskController::class,'index']);
Route::post('tasks',[TaskController::class,'store']);
Route::put('tasks/{id}',[TaskController::class,'update']);
Route::get('tasks/{id}',[TaskController::class,'show']);
Route::delete('tasks/{id}',[TaskController::class,'destroy']);

Route::get('category/{category}/tasks',[TaskController::class,'getTasksByCategory']);


Route::get('search/{term}/tasks',[TaskController::class,'getTaskByTerm']);
Route::get('search/{column}/{direction}/tasks',[TaskController::class,'getTasksOrderedBy']);

Route::get('categories',[CategoryController::class,'index']);
