import { sanitize } from 'string-sanitizer';

const reqSanitize = (req, res, next) => {
  const { textNote } = req.params;
  req.textSanitize = sanitize.keepSpace(textNote);
  res.express_redis_cache_name = req.textSanitize;
  next();
}

export default reqSanitize;