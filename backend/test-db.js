import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConnection() {
    try {
        const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/interview-platform';
        console.log('🔗 Connecting to:', dbUrl.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://username:password@'));
        
        await mongoose.connect(dbUrl);
        console.log('✅ MongoDB connected successfully!');
        
        // Test basic operations
        const testSchema = new mongoose.Schema({ name: String });
        const Test = mongoose.model('Test', testSchema);
        
        // Create
        await Test.create({ name: 'Test Document' });
        console.log('✅ Document created successfully!');
        
        // Read
        const docs = await Test.find();
        console.log('✅ Documents retrieved:', docs);
        
        // Clean up
        await Test.deleteMany({});
        console.log('✅ Test cleanup completed!');
        
        await mongoose.connection.close();
        console.log('✅ Connection closed!');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
    }
}

testConnection();