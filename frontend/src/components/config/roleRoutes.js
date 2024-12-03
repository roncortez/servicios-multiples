
export const roleRoutes = [
    {
        roleId: 1,
        displayName: 'Administrador',
        routes: [
            { path: 'admin/dashboard', label: 'Dashboard' }
        ],
    },
    {
        roleId: 2,
        displayName: 'Talento Humano',
        routes: [
            { path: 'talento-humano/empleados', label: 'Empleados' },
            { path: 'talento-humano/permisos', label: 'Permisos' },
            { path: 'talento-humano/reportes', label: 'Reportes' },
        ],
    },
    {
        roleId: 3,
        displayName: 'Servicios Múltiples',
        routes: [
            { path: 'servicios-multiples/registro', label: 'Gestión de Socios' },
            { path: 'servicios-multiples/informacion', label: 'Mensaje' },
            { path: 'servicios-multiples/reportes', label: 'Reportes' },
        ],
    },
];
