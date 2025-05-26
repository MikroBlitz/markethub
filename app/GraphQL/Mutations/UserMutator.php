<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Mail\UserStatusChanged;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

final readonly class UserMutator
{
    public function upsertUser($_, array $args)
    {
        $data = $args['input'];

        // Generate full name
        $fullName = collect([
            $data['first_name'] ?? '',
            $data['middle_name'] ?? '',
            $data['last_name'] ?? '',
        ])->filter()->map('trim')->implode(' ');

        $data['name'] = $fullName;

        // Upsert logic
        $user = User::updateOrCreate(
            ['id' => $data['id'] ?? null],
            $data
        );

        return $user;
    }

    /** @param  array{}  $args */
    public function updateStatus(null $_, array $args)
    {
        $user = User::findOrFail($args['id']);

        if (Auth::id() === $user->id) {
            throw new \Exception("You can't change your own status.");
        }

        if ($user->hasRole('Admin')) {
            throw new \Exception("You cannot disable an Admin user.");
        }

        $user->is_active = $args['is_active'];
        $user->save();
        Mail::to($user->email)->send(new UserStatusChanged($user));

        return $user;
    }

}
