<?php

namespace App\Policies;

use App\Models\TempatLapangan;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TempatLapanganPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, TempatLapangan $tempatLapangan)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, TempatLapangan $tempatLapangan)
    {
        //
        // return $user->id === $tempatLapangan->user_id;
        return $user->type === 'admin'
            ? Response::allow()
            : Response::deny('You do not own this post.');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, TempatLapangan $tempatLapangan)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, TempatLapangan $tempatLapangan)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\TempatLapangan  $tempatLapangan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, TempatLapangan $tempatLapangan)
    {
        //
    }
}
