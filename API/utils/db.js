import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI); // usa la variable del .env
    console.log('conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
}
};