export class Router {
  routes = {} 
  
  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] ||this.routes[404] 
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
      
      this.background(pathname)
  }

 home() {
    document.body.classList.add('bgHome')
    document.body.classList.remove('bgUniverso')
    document.body.classList.remove('bgExploracao')

    document.querySelector('.btHome').classList.add('focus')
    document.querySelector('.btUniverso').classList.remove('focus')
    document.querySelector('.btExploracao').classList.remove('focus')
  }

  universo() {
    document.body.classList.add('bgUniverso')
    document.body.classList.remove('bgHome')
    document.body.classList.remove('bgExploracao')

    document.querySelector('.btHome').classList.remove('focus')
    document.querySelector('.btUniverso').classList.add('focus')
    document.querySelector('.btExploracao').classList.remove('focus')
  }

  exploracao() {
    document.body.classList.add('bgExploracao')
    document.body.classList.remove('bgHome')
    document.body.classList.remove('bgUniverso')
    
    document.querySelector('.btHome').classList.remove('focus')
    document.querySelector('.btUniverso').classList.remove('focus')
    document.querySelector('.btExploracao').classList.add('focus')
  }

  background(bg) {
    if (bg == '/') {
      this.home()
    } else if (bg == '/universo') {
      this.universo()
    } else if (bg == '/exploracao') {
      this.exploracao()
    }
  }
}


