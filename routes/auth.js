import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const router = express.Router();

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error: `${error} save` }));
        })
        .catch(error => res.status(500).json({ error: `${error} bcrypt` }));
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json( 'Utilisateur non trouvé !' );
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json('Mot de passe incorrect !' );
                    }
                    req.session.user = user;
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                          { userId: user._id },
                          process.env.JWT_SECRET,
                          { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: `${error} mdp` }));
        })
        .catch(error => res.status(500).json({ error: `${error} find` }));
});


export default router;