<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::where('email', 'datpa12192@gmail.com')->exists()) {
            User::factory()->create([
                'name' => 'DatPA',
                'email' => 'datpa12192@gmail.com',
            ]);
        }

        User::factory(20)->create();
    }
}
