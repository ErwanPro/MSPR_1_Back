import mongoose from 'mongoose';

const couponSchema = mongoose.Schema({
    libelle: {type: String, required: true},
    pourcentage: {type: String, required: true},
    dateValidite: {type: String, required: true}
});

export default mongoose.model('Coupon', couponSchema);