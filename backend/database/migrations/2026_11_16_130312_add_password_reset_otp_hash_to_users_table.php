<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Skip if columns exist
        if (Schema::hasColumn('users', 'password_reset_otp_hash')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->string('password_reset_otp_hash')->nullable();
            $table->timestamp('password_reset_otp_expires_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'password_reset_otp_hash',
                'password_reset_otp_expires_at',
            ]);
        });
    }
};
