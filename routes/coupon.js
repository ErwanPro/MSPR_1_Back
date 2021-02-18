import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Coupon from '../models/Coupon';

const router = express.Router();

router.post('/', (req, res) => {
    const coupon = new Coupon ({
        hash: req.body.hash
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

export default router;