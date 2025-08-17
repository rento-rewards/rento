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
        Schema::create('leases', function (Blueprint $table) {
            $table->id();
            // Address Information
            $table->text('address_line_1');
            $table->text('address_line_2')->nullable();
            $table->text('city');
            $table->text('province');
            $table->text('country')->default('Canada');

            // Lease Information
            $table->decimal('rent_amount', 10, 2);
            $table->date('lease_start_date');
            $table->integer('monthly_due_date')->default(1);

            // Landlord Information
            $table->text('landlord_name');
            $table->text('landlord_email');
            $table->text('landlord_phone');

            // Tenant
            $table->foreignId('user_id');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leases');
    }
};
