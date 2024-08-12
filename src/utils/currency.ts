export function formatCurrency(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') return '';
    
    // Convertir el valor a número si es un string
    const number = typeof value === 'string' ? parseFloat(value) : value;

    // Verificar si el valor es un número válido
    if (isNaN(number)) return value.toString();

    // Formatear el número con separadores de miles
    return number.toLocaleString('es-ES');
}