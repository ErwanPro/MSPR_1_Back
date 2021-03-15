import express from 'express';
import Coupon from '../models/Coupon';

const router = express.Router();

router.post('/', (req, res) => {
    const coupon = new Coupon ({
        libelle: req.body.libelle,
        pourcentage: req.body.pourcentage,
        dateValidite: req.body.dateValidite,
    });
    coupon.save()
        .then(() => res.status(201).json({ message: 'Coupon créé !' }))
        .catch(error => res.status(400).json({ error: `${error} post coupon` }));
});

router.get('/', (req, res) => {
    Coupon.find()
        .then((coupons) => {
            res.status(200).json(coupons)
        })
        .catch(error => res.status(400).json({ error: `${error} get coupons` }));
});

router.get('/:id', (req, res) => {
    const id = req.params.id.replace("gs://", "");
    Coupon.findById(id)
        .then((coupon) => {
            res.status(200).json(coupon)
        })
        .catch(error => res.status(400).json({ error: `${error} get coupon` }));
});


export default router;