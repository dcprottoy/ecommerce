<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OrgSetup extends Model
{
    use HasFactory;

    protected $table = 'org_setups';
    protected $primaryKey = 'id';
    protected $fillable = [
        'org_name',
        'org_address',
        'org_phone',
        'org_email',
        'org_logo',
        'org_favicon',
        'org_description',
        'org_meta_title',
        'org_meta_description',
        'org_meta_keywords',
        'org_timezone',
        'org_date_format',
        'org_time_format',
        'org_currency_symbol',
        'org_currency_code',
        'org_currency_position',
        'org_currency_decimal_places',
        'org_currency_symbol_position',
        'org_currency_symbol_decimal_places',
    ];
}
