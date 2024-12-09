export const roleRoutes = {
    1: {
        displayName: 'Administrador',
        routes: [
            { path: 'dashboard', label: 'Dashboard' },
        ],
    },
    2: {
        displayName: 'Talento Humano',
        routes: [
            { path: 'talento-humano/empleados', label: 'Empleados' },
            { path: 'permisos', label: 'Permisos' },
            { path: 'reportes', label: 'Reportes' },
        ],
    },
    3: {
        displayName: 'Servicios Múltiples',
        routes: [
            { path: 'registro', label: 'Gestión de Socios' },
            { path: 'informacion', label: 'Mensaje' },
            { path: 'reportes', label: 'Reportes' },
        ],
    },
};
