<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;


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
        $task->delete();
        return ['message'=>'Your task has been removed'];
    }
    public function getTaskByCategory(Category $category){
        return $category->tasks()->with('category')->paginate(10);
    }
    public function getTaskOrderBy($column, $direction){
        return Task:with('category')->orderBy($column,$direction)->paginate(10);

    }
    public function getTaskByTerm($term){
        $tasks=Task::with('category')
        ->where('title','like','%'.$term.'%')
        ->orwhere('body','like','%'.$term.'%')
        ->orwhere('id','like','%'.$term.'%')
        ->paginate(10);

        return $tasks;

    }

}