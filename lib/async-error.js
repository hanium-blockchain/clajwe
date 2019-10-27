module.exports = function asyncErrorCatcher(fn) {
  if (!(fn instanceof Function)) {
    throw new Error('Must supply a function');
  }

  return (req, res, next) => {
    const promise = fn(req, res, next); //위의 함수를 실행 시키고 이를 프로미스로 받음
    if (!promise.catch) return;
    promise.catch(err => next(err)); //에러가 나면 넥스트 에러로 넘어가게 함
  }
};