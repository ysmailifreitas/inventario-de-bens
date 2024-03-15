const { UserRoles } = require("../models/UserRoles");

exports.atualizarUserRole = (req, res) => {
    UserRoles.findOne({
        where: {user_id: req.params.id},
    }).then(function (userRole) {
        if (userRole) {
            console.log(userRole)
            userRole
                .update({
                    role_id: req.body.role_id,
                })
                .then(function () {
                    res.redirect(req.get('referer'));
                })
                .catch(function (error) {
                    console.error("Error updating user role:", error);
                    res.status(500).send("Internal Server Error");
                });
        } else {
            res.status(404).send("User role not found");
        }
    })
        .catch(function (error) {
            console.error("Error finding user role:", error);
            res.status(500).send("Internal Server Error");
        });
};