export default app => {
    app.post("/projeto", (req, res, next) => {
        let discente = new Discente(req.session.user); //tipo de usuario admin
        discente.getProjetos()
            .then(projetos => {
                res.status(200).json({ status: 200, data: projetos });
            })
            .catch(e => {
                Logger.danger('api/admin/requisicoes/projeto/', e);
                res.status(500).json({ status: 500, msg: "Erro fatal no DB" });
            })
    })
}