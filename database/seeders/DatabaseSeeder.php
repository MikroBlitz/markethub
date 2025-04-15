<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!Role::where('name', 'Admin')->exists()) {
            Role::create(['name' => 'Admin']);
        }
        if (!Role::where('name', 'Manager')->exists()) {
            Role::create(['name' => 'Manager']);
        }
        if (!Role::where('name', 'User')->exists()) {
            Role::create(['name' => 'User']);
        }
        if (!Permission::where('name', 'edit user')->exists()) {
            Permission::create(['name' => 'edit user']);
        }
        if (!Permission::where('name', 'delete user')->exists()) {
            Permission::create(['name' => 'delete user']);
        }

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
        $admin->givePermissionTo('edit user');
        $admin->givePermissionTo('delete user');
        $manager->assignRole('Manager');
        $users->each(function ($user) {
            $user->assignRole('User');
        });

    }
}
