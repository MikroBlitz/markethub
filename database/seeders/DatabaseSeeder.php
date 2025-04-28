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
            $adminRole = Role::create(['name' => 'Admin']);
            $adminRole->givePermissionTo($editUserPermission);
            $adminRole->givePermissionTo($deleteUserPermission);
        }
        if (!Role::where('name', 'Manager')->exists()) {
            $managerRole = Role::create(['name' => 'Manager']);
            $managerRole->givePermissionTo($editProductPermission);
        }
        if (!Role::where('name', 'User')->exists()) {
            $adminRole = Role::create(['name' => 'User']);
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

        $manager->assignRole('Manager');
        $users->each(function ($user) {
            $user->assignRole('User');
        });

    }
}
