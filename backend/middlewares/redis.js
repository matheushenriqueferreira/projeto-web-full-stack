import expressRedisCache from "express-redis-cache";

const cache = expressRedisCache({
  prefix: 'redis-test',
  host: 'redis',
  port: 6379,
});

export const deleteCache = (name) => {
  cache.del(name, (error, entries) => {
    console.log(`O cache "${name}" foi deletado."`);
    return;
  });
}

export const invalidateCache = (req, res, next) => {
  deleteCache('annotations');
  next();
}

export default cache;