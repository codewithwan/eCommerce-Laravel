<?php
namespace App\Http\Middleware;

use App\Enums\UserRole;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        $allowedRoles = array_map(function ($role) {
            return strtolower(trim($role));
        }, $roles);

        $userRole = $user->role;

        if ($userRole instanceof UserRole) {
            $userRole = $userRole->value;
        }

        if (! in_array(strtolower($userRole), $allowedRoles)) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
