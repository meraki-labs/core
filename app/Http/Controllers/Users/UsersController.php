<?php

namespace App\Http\Controllers\Users;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get search input
        $search = $request->input('search', null);
        $perPage = $request->input('per_page', 15);
        $sortBy = $request->input('sort_by', 'created_at');
        $sortType = $request->input('sort_type', 'asc');

        //Get data
        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortType)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_type' => $sortType,
            ],
        ]);
    }

    public function trashed(Request $request)
    {
        // Get search input
        $search = $request->input('search', null);
        $perPage = $request->input('per_page', 15);
        $sortBy = $request->input('sort_by', 'created_at');
        $sortType = $request->input('sort_type', 'asc');

        //Get data
        $users = User::query()->onlyTrashed()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortType)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();


        return Inertia::render('users/trash', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_type' => $sortType,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
