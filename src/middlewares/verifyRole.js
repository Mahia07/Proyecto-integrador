export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Acceso denegado. Se requieren permisos de administrador' });
    }
    next();
};
