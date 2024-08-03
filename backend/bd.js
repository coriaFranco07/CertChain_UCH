// bd.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/miBaseDeDatos', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
