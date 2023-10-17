// Middleware checkPermissions
const checkPermissions = (requiredPermission) => {
  return async (req, res, next) => {
    // Aqui você deve verificar a permissão do usuário atual com base em seu tipo de usuário e as permissões definidas no banco de dados
    const tipoUsuario = req.user.tipo; // Supondo que você tem essas informações disponíveis em req.user

    // Lógica de verificação de permissões com base no tipo de usuário e nas permissões requeridas
    if (tipoUsuario === "Gestor" && requiredPermission === "inventario") {
      next(); // Permissão concedida, continue com a solicitação
    } else if (tipoUsuario === "Administrador" && requiredPermission === "usuarios") {
      next(); // Permissão concedida, continue com a solicitação
    } else if (tipoUsuario === "Supervisor" && requiredPermission === "relatorios") {
      next(); // Permissão concedida, continue com a solicitação
    } else if (tipoUsuario === "Comum" && requiredPermission === "visualizar") {
      next(); // Permissão concedida, continue com a solicitação
    } else {
      res.status(403).send("Acesso negado. Você não tem permissão para acessar este recurso.");
    }
  };
};

module.exports = checkPermissions;
