<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
   
    public function index()
    {
        return Task::with('category')->paginate(10)
    }

    public function create()
    {
        
    }

    public function store(CreateTaskRequest $request)
    {
        $task =Task::create([
            'title'=>$request->title,
            'body'=>$request->body,
            'category_id'=>$request->category_id,

        ]);
        return $task;
    }

   
    public function show(Task $task)
    {
        return $task;
    }

   
    public function edit(string $id)
    {
        //
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
          $task =Task::update([
            'title'=>$request->title,
            'body'=>$request->body,
            'category_id'=>$request->category_id,
            'done'=>$request->done

        ]);
        return $task;
    }

   
    public function destroy(string $id)
    {
        //
    }
}
