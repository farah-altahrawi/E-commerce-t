import cors from 'cors';
import connectDb from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js';
import categoryRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import cartRouter from './modules/cart/cart.router.js';

const initApp = async(app,express)=>{

    app.use(express.json());
    app.use(cors());
    connectDb();

    app.get('/',(req,res)=>{
        return res.status(200).json({message:"welcome . . ."});
    });

    app.use('/auth',authRouter);
    app.use('/categories',categoryRouter);
    app.use('/products',productRouter);
    app.use('/coupons',couponRouter);
    app.use('/carts',cartRouter);

    app.get('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});
    });

}

export default initApp;
