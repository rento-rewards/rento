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
        Schema::table('interacs', function (Blueprint $table) {
            $table->string('document_type')->nullable();
            $table->date('expiry_date')->nullable();
            $table->json('payload')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('interacs', function (Blueprint $table) {
            $table->dropColumn('document_type');
            $table->dropColumn('expiry_date');
            $table->dropColumn('payload');
        });
    }
};
