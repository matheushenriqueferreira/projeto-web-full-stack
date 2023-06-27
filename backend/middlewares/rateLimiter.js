import { RateLimiterMongo } from "rate-limiter-flexible";
import { MongoClient } from "mongodb";

const client = MongoClient.connect(
  'mongodb://mongo/'
);
  
const rateLimiterMongo = new RateLimiterMongo({
  storeClient: client,
  dbName: 'projeto',
  points: 3,
  duration: 10,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiterMongo.consume(req.ip);
    return next();
  }
  catch (error){
    return res.status(429).json({message: 'Muitos pedidos. Tente mais tarde'});
  }
};

export default rateLimiterMiddleware;