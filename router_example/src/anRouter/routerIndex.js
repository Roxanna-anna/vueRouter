class HistoryRoute {
  constructor () {
    this.current = null
  }
}

class anRouter {
  constructor (options) {
    this.mode = options.mode || 'hash'
    this.anRoutes = options.anRoutes || []
    this.history = new HistoryRoute()
    this.routesMap = this.createMap(this.routes)
    this.init()
  }
  createMap (routes) {
    return routes.reduce((memo, current) => {
      memo[current.path] = current.component
      return memo
    }, {})
  }
  init () {
    if (this.mode == 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })
      window.addEventListener('hashChange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      // history模式下
      location.pathname ? '' : location.pathname = '/'
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }
}
anRouter.install = function (vue) {
  vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.router) {
        this._root = this
        this._router = this.$options.router
        vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = this.$parent._root
      }
      Object.defineProperty(this, '$router',{
        get(){
          return this._root._router
        }
      })
    }
  })
  vue.component('router-view', {
    render (h) {
      let current = this._self._root._router.history.current
      let routesMap = this._self._root._router.routesMap
      return h(routesMap[current])
    }
  })
}
export default anRouter
