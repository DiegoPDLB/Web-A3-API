import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const uri = process.env.URI;
    if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
      console.warn('MongoDB URI not set or contains placeholders - skipping DB connection for local testing');
      return;
    }
    await mongoose.connect(uri);
    console.log('conectado');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    console.warn('Continuando sin conexión a BD. Algunas rutas pueden fallar.');
}
};