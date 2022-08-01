import mongoose from 'mongoose';
const { MONGO_URI } = process.env;
function connect() {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log('connected to a database');
    })
    .catch((error) => {
      console.log('database connection failed...');
      console.error(error);
      process.exit(1);
    });
}
export default connect;
