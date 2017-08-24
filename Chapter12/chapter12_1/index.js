class Middleware {
  constructor () {
    this.middleware = (next) => next()
  }

  run (fn) {
    this.middleware(
      () => fn.call(this)
    )
  }

  use (fn) {
    const previousFn = this.middleware
    this.middleware = (next) =>
      previousFn.call(this, () =>
        fn.call(this, next)
      )
  }
}

const instance = new Middleware()

instance.use(function (next) {
  setTimeout(() => {
    console.log('first')
    this.firstMiddlewareLoaded = true
    next()
  }, 500)
})

instance.use(function (next) {
  setTimeout(() => {
    console.log('second')
    this.secondMiddlewareLoaded = true
    next()
  }, 250)
})

const start = new Date()
instance.run(function () {
  console.log('first middleware loaded:', this.firstMiddlewareLoaded)
  console.log('second middleware loaded:', this.secondMiddlewareLoaded)
  console.log('time passed:', new Date() - start)
})
