import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:porta/nome_db';
    
    await mongoose.connect(mongoURI);
    console.log('Connection Done');
  } catch (error) {
    console.error('Connection Error: ', error);
    process.exit(1);
  }
};

export default connectDB;