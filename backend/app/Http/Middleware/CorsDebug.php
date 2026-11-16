<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsDebug
{
    public function handle(Request $request, Closure $next)
    {
        file_put_contents(
            storage_path('logs/cors-debug.log'),
            $request->method() . ' | ' .
            $request->path() . PHP_EOL,
            FILE_APPEND
        );

        return $next($request);
    }
}
