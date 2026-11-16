<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
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
