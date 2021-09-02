<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Neputer\Support\Mixins\Responsable;

class TaskController extends Controller
{
    use Responsable;

    public function __construct() {
        $this->middleware('auth');
    }

    public function index(Request $request, Task $task) {
        $allTasks = $task->whereIn('user_id', $request->user())->with('user');
        $tasks = $allTasks->take(10)->get();

        return $this->responseOk([
            'tasks' => $tasks
        ]);

    }

    public function store(Request $request) {
        // validate
        $this->validate($request, [
            'name' => 'required|max:255',
        ]);
        // create a new task based on user tasks relationship
        $task = $request->user()->tasks()->create([
            'name' => $request->name,
        ]);
        // return task with user object
        return response()->json($task->with('user')->find($task->id));
    }

    public function destroy($id) {
        Task::findOrFail($id)->delete();
    }
}
