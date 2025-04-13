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
        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Manager']);
        Role::create(['name' => 'User']);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => 'admin1234',
            'is_active' => 1,
        ]);

        $manager = User::factory()->create([
            'name' => 'Manager',
            'email' => 'manager@mail.com',
            'password' => 'manager1234',
            'is_active' => 1,
        ]);

        $users = User::factory(100)->create();

        $admin->assignRole('Admin');
        $manager->assignRole('Manager');
        $users->each(function ($user) {
            $user->assignRole('User');
        });

    }
}
