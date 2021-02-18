import mongoose from 'mongoose';

const couponSchema = mongoose.Schema({
    title: {type: String, required: false},
    hash: {type: String, required: true}
});

export default mongoose.model('Coupon', couponSchema);