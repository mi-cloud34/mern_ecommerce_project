import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "reacteCommerceDB",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB: Connectted'))
  .catch((err) => console.log(err.message));
 