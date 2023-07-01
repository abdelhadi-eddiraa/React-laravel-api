<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRequest;
use App\Http\Resources\V1\SkillResource;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index(){
      return  SkillResource::collection(Skill::all());
      
    }

    public function store(StoreRequest $request){
        Skill::create($request->validated());
        return response()->json('Skill Created');

    }


    public function show(Skill $skill){
       return new SkillResource($skill);
    }

    public function update(Request $request,Skill $skill){
        $validatedData = $request->validate([
            'name'=> 'required|min:3|max:20',
            'slug'=> 'required|unique:skills,slug,'. $skill->id,
        ]);
    
        $skill->update($validatedData);
        return response()->json('Skill updated');

    }

    public function destroy(Skill $skill){
       $skill->delete();
        return response()->json('Skill Deleted');

    }
}
