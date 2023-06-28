import { RateLimiterMongo } from "rate-limiter-flexible";
import { MongoClient } from "mongodb";
import logger from "../controllers/logger.js";

const client = MongoClient.connect(
  'mongodb://mongo/'
);

const rateLimiterMongo = new RateLimiterMongo({
  storeClient: client,
  dbName: 'projeto',
  points: 5,
  duration: 30,
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiterMongo.consume(req.ip);
    return next();
  }
  catch (error) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    logger.log('warn', `Requisições suspeitas no IP ${req.ip} em ${fullUrl}.`);
    return res.status(429).json({message: 'Muitas requisições. Tente mais tarde.'});
  }
};

export default rateLimiterMiddleware;