<?php

namespace App\Services;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class MenuBuilder
{
    public static function build(): array
    {
        $menus = [];

        foreach (glob(config_path('*.php')) as $file) {
            $config = require $file;

            if (array_key_exists('menu', $config)) {
                foreach ($config['menu'] as $item) {
                    if (self::normalize($item)) {
                        $menus[] = self::normalize($item);
                    }
                }
            }
        }

        // Default 0, sort from small -> large
        usort($menus, function ($a, $b) {
            $pa = $a['priority'] ?? 0;
            $pb = $b['priority'] ?? 0;
            return $pa <=> $pb;
        });
        return array_values($menus);
    }

    protected static function normalize(array $item): ?array
    {
        //If not have permission -> ignore
        if (isset($item['can']) && !Gate::allows($item['can'])) {
            return [];
        }

        $children = [];

        if (!empty($item['children']) && is_array($item['children'])) {
            foreach ($item['children'] as $child) {
                $normalizedChild = self::normalize($child);
                if ($normalizedChild) {
                    $children[] = $normalizedChild;
                }
            }
        }

        // If not have children -> ignore
        if (isset($item['children']) && empty($children)) {
            return [];
        }

        $routeName = isset($item['route_name']) && Route::has($item['route_name']) ? $item["route_name"] : null;
        $menu = [
            'title' => $item['label'] ?? '',
            'icon'  => $item['icon'] ?? '',
            'href'  => $routeName ? parse_url(route($routeName), PHP_URL_PATH) : '',
            'items' => $children ?: [],
            'priority' => $item['priority'] ?? '',
        ];

        return $menu;
    }
}
