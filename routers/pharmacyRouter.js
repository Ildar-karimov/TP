const Router = require('express').Router;
const pharmacyRepository = require('../repositories/pharmacyRepository')

const pharmacyRouter = Router();
pharmacyRouter.route('/')
    .get(async function(req, res) {
        try {
            let pharmasies = await pharmacyRepository.getAll();

            for (let pharmacy of pharmasies) {

                pharmacy.patient = {
                    "id": pharmacy.id_patient,
                    "firstname": pharmacy.firstname,
                    "lastname": pharmacy.lastname,
                    "patronymic": pharmacy.patronymic
                }
                pharmacy.medicine = {
                    "id": pharmacy.id_medicine,
                    "name": pharmacy.name,
                    "description": pharmacy.description,
                    "amount": pharmacy.amount,
                    "id_same_medicine": pharmacy.id_same_medicine
                }

                delete pharmacy.id_patient;
                delete pharmacy.firstname;
                delete pharmacy.lastname;
                delete pharmacy.patronymic;

                delete pharmacy.id_medicine;
                delete pharmacy.name;
                delete pharmacy.description;
                delete pharmacy.amount;
                delete pharmacy.id_same_medicine;
            }

            res.send(pharmasies);

        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const rssItem = {
                id_patient: req.body.id_patient,
                id_medicine: req.body.id_medicine
            };
            res.send(await pharmacyRepository.post(rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
pharmacyRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await pharmacyRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const rssItem = {
                id_patient: req.body.id_patient,
                id_medicine: req.body.id_medicine
            };
            res.send(await pharmacyRepository.put(id, rssItem));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await pharmacyRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

module.exports = pharmacyRouter;