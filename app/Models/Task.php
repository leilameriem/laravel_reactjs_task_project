<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class Task extends Model
{
    use HasFactory;

     protected $fillable = [
       'title',
       'body',
       'done',
       'category_id',
      
    ];
     public function category(){

      return $this->belongsTo('App\Models\Category', 'category_id');
    }


      public function getCreatedAtAttribute($value){
      return Carbon::parse($value)->diffForHumans();
    }

}
