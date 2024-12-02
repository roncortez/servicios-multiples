export const menuConfig = {
    administrador: {
        displayName: 'Administrador',
        items: [
            { path: 'admin', label: 'Dashboard' }
        ],
    },
    talentoHumano: {
        displayName: 'Talento Humano',
        items: [
            { path: 'talento-humano/empleados', label: 'Empleados' },
            { path: 'talento-humano/permisos', label: 'Permisos' },
            { path: 'talento-humano/reportes', label: 'Reportes' },
        ],
    },
    serviciosMultiples: {
        displayName: 'Servicios Múltiples',
        items: [
            { path: 'servicios-multiples/registro', label: 'Gestión de Socios' },
            { path: 'servicios-multiples/informacion', label: 'Mensaje' },
            { path: 'servicios-multiples/reportes', label: 'Reportes' },
        ],
    },
};
