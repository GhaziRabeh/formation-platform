<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Skip on fresh database
        if (! Schema::hasColumn('users', 'password_reset_token')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn(
                'password_reset_token',
                'password_reset_otp_hash'
            );

            $table->renameColumn(
                'password_reset_expires_at',
                'password_reset_otp_expires_at'
            );
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'password_reset_otp_hash')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn(
                'password_reset_otp_hash',
                'password_reset_token'
            );

            $table->renameColumn(
                'password_reset_otp_expires_at',
                'password_reset_expires_at'
            );
        });
    }
};
