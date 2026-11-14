<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\OrgSetup;
use Illuminate\Support\Facades\File;

class OrgSetupController extends Controller
{
    /**
     * Display the single form for creating, showing, and updating organization setup.
     */
    public function index()
    {
        $orgSetup = OrgSetup::first();
        return view('admin.orgsetup', compact('orgSetup'));
    }

    /**
     * Redirect create request to single form.
     */
    public function create()
    {
        return redirect()->route('admin.orgsetup');
    }

    /**
     * Store a newly created organization setup.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'org_name'                           => 'required|string|max:255',
            'org_address'                        => 'nullable|string|max:255',
            'org_phone'                          => 'nullable|string|max:255',
            'org_email'                          => 'nullable|email|max:255',
            'org_logo'                           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'org_favicon'                        => 'nullable|file|mimes:ico,png,jpg,jpeg,svg|max:1024',
            'org_description'                    => 'nullable|string',
            'org_meta_title'                     => 'nullable|string|max:255',
            'org_meta_description'               => 'nullable|string',
            'org_meta_keywords'                  => 'nullable|string|max:255',
            'org_timezone'                       => 'nullable|string|max:255',
            'org_date_format'                    => 'nullable|string|max:255',
            'org_time_format'                    => 'nullable|string|max:255',
            'org_currency_symbol'                => 'nullable|string|max:255',
            'org_currency_code'                  => 'nullable|string|max:255',
            'org_currency_position'              => 'nullable|string|max:255',
            'org_currency_decimal_places'        => 'nullable|string|max:255',
            'org_currency_symbol_position'       => 'nullable|string|max:255',
            'org_currency_symbol_decimal_places' => 'nullable|string|max:255',
        ]);

        $uploadPath = public_path('uploads/org');
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        if ($request->hasFile('org_logo')) {
            $logo = $request->file('org_logo');
            $logoName = 'logo_' . time() . '_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $logo->move($uploadPath, $logoName);
            $validated['org_logo'] = 'uploads/org/' . $logoName;
        }

        if ($request->hasFile('org_favicon')) {
            $favicon = $request->file('org_favicon');
            $faviconName = 'favicon_' . time() . '_' . uniqid() . '.' . $favicon->getClientOriginalExtension();
            $favicon->move($uploadPath, $faviconName);
            $validated['org_favicon'] = 'uploads/org/' . $faviconName;
        }

        OrgSetup::create($validated);

        return redirect()->route('admin.orgsetup')->with('success', 'প্রতিষ্ঠানের তথ্য সফলভাবে সংরক্ষিত হয়েছে!');
    }

    /**
     * Display the specified resource (redirects to single form).
     */
    public function show(string $id)
    {
        return redirect()->route('admin.orgsetup');
    }

    /**
     * Show the form for editing (redirects to single form).
     */
    public function edit(string $id)
    {
        return redirect()->route('admin.orgsetup');
    }

    /**
     * Update the specified organization setup.
     */
    public function update(Request $request, string $id)
    {
        $orgSetup = OrgSetup::findOrFail($id);

        $validated = $request->validate([
            'org_name'                           => 'required|string|max:255',
            'org_address'                        => 'nullable|string|max:255',
            'org_phone'                          => 'nullable|string|max:255',
            'org_email'                          => 'nullable|email|max:255',
            'org_logo'                           => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'org_favicon'                        => 'nullable|file|mimes:ico,png,jpg,jpeg,svg|max:1024',
            'org_description'                    => 'nullable|string',
            'org_meta_title'                     => 'nullable|string|max:255',
            'org_meta_description'               => 'nullable|string',
            'org_meta_keywords'                  => 'nullable|string|max:255',
            'org_timezone'                       => 'nullable|string|max:255',
            'org_date_format'                    => 'nullable|string|max:255',
            'org_time_format'                    => 'nullable|string|max:255',
            'org_currency_symbol'                => 'nullable|string|max:255',
            'org_currency_code'                  => 'nullable|string|max:255',
            'org_currency_position'              => 'nullable|string|max:255',
            'org_currency_decimal_places'        => 'nullable|string|max:255',
            'org_currency_symbol_position'       => 'nullable|string|max:255',
            'org_currency_symbol_decimal_places' => 'nullable|string|max:255',
        ]);

        $uploadPath = public_path('uploads/org');
        if (!File::exists($uploadPath)) {
            File::makeDirectory($uploadPath, 0755, true, true);
        }

        if ($request->hasFile('org_logo')) {
            if ($orgSetup->org_logo && File::exists(public_path($orgSetup->org_logo))) {
                File::delete(public_path($orgSetup->org_logo));
            }
            $logo = $request->file('org_logo');
            $logoName = 'logo_' . time() . '_' . uniqid() . '.' . $logo->getClientOriginalExtension();
            $logo->move($uploadPath, $logoName);
            $validated['org_logo'] = 'uploads/org/' . $logoName;
        } else {
            $validated['org_logo'] = $orgSetup->org_logo;
        }

        if ($request->hasFile('org_favicon')) {
            if ($orgSetup->org_favicon && File::exists(public_path($orgSetup->org_favicon))) {
                File::delete(public_path($orgSetup->org_favicon));
            }
            $favicon = $request->file('org_favicon');
            $faviconName = 'favicon_' . time() . '_' . uniqid() . '.' . $favicon->getClientOriginalExtension();
            $favicon->move($uploadPath, $faviconName);
            $validated['org_favicon'] = 'uploads/org/' . $faviconName;
        } else {
            $validated['org_favicon'] = $orgSetup->org_favicon;
        }

        $orgSetup->update($validated);

        return redirect()->route('admin.orgsetup')->with('success', 'প্রতিষ্ঠানের তথ্য সফলভাবে আপডেট হয়েছে!');
    }
}
