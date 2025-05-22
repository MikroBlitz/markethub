<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Mail\UserStatusChanged;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

final readonly class UserMutator
{
    /** @param  array{}  $args */
    public function updateStatus(null $_, array $args)
    {
        $user = User::findOrFail($args['id']);

        if (Auth::id() === $user->id) {
            throw new \Exception("You can't change your own status.");
        }

        $user->is_active = $args['is_active'];
        $user->save();

        Mail::to($user->email)->send(new UserStatusChanged($user));

        return $user;
    }

}
