<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    
    public function authorize(): bool
    {
        return true;
    }

   
    public function rules(): array
    {
        return [
            'title'=>'required|max:255',
            'body'=>'required|max:5000',
            'category_id'=>'required',
        ];
    }

     public function messages()
    {
      return [
        'category_id.required' =>'Category field is required'
      ];
    }
}
