<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(100)->create();

        // Create an admin role if it doesn't exist
        if (!Role::where('name', 'Admin')->exists()) {
            Role::create(['name' => 'Admin']);
        }
        if (!Role::where('name', 'Manager')->exists()) {
            Role::create(['name' => 'Manager']);
        }

        $user = User::factory()->create([
            'name' => 'User',
            'email' => 'user@mail.com',
            'password' => 'user1234',
            'is_active' => 1,
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => 'admin1234',
            'is_active' => 1,
        ]);

        $admin->assignRole('Admin');
        $user->assignRole('Manager');
    }
}
