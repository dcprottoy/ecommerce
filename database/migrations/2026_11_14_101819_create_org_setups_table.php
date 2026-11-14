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
        Schema::create('org_setups', function (Blueprint $table) {
            $table->id();
            $table->string('org_name');
            $table->string('org_address')->nullable();
            $table->string('org_phone')->nullable();
            $table->string('org_email')->nullable();
            $table->string('org_logo')->nullable();
            $table->string('org_favicon')->nullable();
            $table->text('org_description')->nullable();
            $table->string('org_meta_title')->nullable();
            $table->text('org_meta_description')->nullable();
            $table->string('org_meta_keywords')->nullable();
            $table->string('org_timezone')->nullable();
            $table->string('org_date_format')->nullable();
            $table->string('org_time_format')->nullable();
            $table->string('org_currency_symbol')->nullable();
            $table->string('org_currency_code')->nullable();
            $table->string('org_currency_position')->nullable();
            $table->string('org_currency_decimal_places')->nullable();
            $table->string('org_currency_symbol_position')->nullable();
            $table->string('org_currency_symbol_decimal_places')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('org_setups');
    }
};
