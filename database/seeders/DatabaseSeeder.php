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

        if (!Permission::where('name', 'view user')->exists()) {
            $viewUserPermission = Permission::create(['name' => 'view user']);
        }
        if (!Permission::where('name', 'edit user')->exists()) {
            $editUserPermission = Permission::create(['name' => 'edit user']);
        }
        if (!Permission::where('name', 'delete user')->exists()) {
            $deleteUserPermission = Permission::create(['name' => 'delete user']);
        }
        if (!Permission::where('name', 'edit product')->exists()) {
            $editProductPermission = Permission::create(['name' => 'edit product']);
        }

        if (!Role::where('name', 'Admin')->exists()) {
            Role::create(['name' => 'Admin']);
        }
        if (!Role::where('name', 'Manager')->exists()) {
            $managerRole = Role::create(['name' => 'Manager']);
            $managerRole->givePermissionTo($viewUserPermission);
            $managerRole->givePermissionTo($editUserPermission);
            $managerRole->givePermissionTo($deleteUserPermission);
            $managerRole->givePermissionTo($editProductPermission);
        }
        if (!Role::where('name', 'User')->exists()) {
           Role::create(['name' => 'User']);
        }

        $users = User::factory(100)->create();

        $admin->assignRole('Admin');
        $manager->assignRole('Manager');
        $users->each(function ($user) {
            $user->assignRole('User');
        });

    }
}
