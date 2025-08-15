<?php

return [
    'menu' => [
        [
            'label' => 'Dashboard',
            'icon' => 'LayoutGrid',
            'route_name' => 'dashboard',
        ],
        [
            'label' => 'Users Component',
            'icon' => 'Users',
            'route_name' => 'users.index',
            // 'can' => 'users.views',
            'children' => [
                [
                    'label' => 'Users Config',
                    'route_name' => 'users.setting',
                    // 'can' => 'users.setting',
                ]
            ]
        ]
    ]
];
