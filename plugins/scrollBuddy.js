function initScrollBuddy(){

  const { userAgent, maxTouchPoints, platform } = navigator
  const conditional = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  let smoothScroll = null
  let lerp = (s,e,a)=>{
    let l = (1 - a) * s + a * e;
    return Math.abs(l - e) < 0.0001 ? e : l;
  }

  window.isMobile = conditional.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
  document.documentElement.classList.add(isMobile ? 'is-mobile' : 'is-desktop')

  window.scrollBuddy = {
    top:0,
    bottom:0,
    delta:0,
    direction:'down',
    init:(props)=>{
      !smoothScroll
      ? (smoothScroll = new SmoothScroll(props))
      : smoothScroll.reset(props)
    },
    update:()=>{
      smoothScroll && smoothScroll.update()
    },
    reset:()=>{
      smoothScroll && smoothScroll.reset()
    },
    isMobile:()=>{
      let { userAgent, maxTouchPoints, platform } = navigator
      let conditional = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      return conditional.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
    },
    updateScroll:(top,last = scrollBuddy.top)=>{
      scrollBuddy.delta = top - last
      scrollBuddy.top = top
      scrollBuddy.bottom = top + window.innerHeight
      scrollBuddy.direction = scrollBuddy.delta < 0 ? 'up' : scrollBuddy.delta > 0 ? 'down' : ''
    }
  }

  class SmoothScroll{
    constructor(props){
      this.handleWheel = this.handleWheel.bind(this)
      this.handleScroll = this.handleScroll.bind(this)
      this.updateDocument = this.updateDocument.bind(this)

      if (typeof props.el == 'string'){
        props.el = document.querySelector(props.el)
      }

      this.inertia = props.inertia || .1
      this.el = props.el || document.body
      this.busy = false
      this.document = null;
      this.window = null;
      this.event = props.event || null

      this.setup()
    }

    setup(){
      this.document = document.createElement("div");
      this.window = document.createElement("div");
      this.window.appendChild(this.document);
      document.body.appendChild(this.window);

      this.el.style.willChange = 'transform'
      this.window.style.cssText = `position:fixed;top:0;right:0;bottom:0;width:20px;overflow:scroll;`;
      document.documentElement.style.cssText = `position:fixed;top:0;left:0;right:0;height:100vh;overflow:hidden;`;

      window.addEventListener('resize',this.updateDocument)
      window.addEventListener('wheel',this.handleWheel)
      this.window.addEventListener('scroll',this.handleScroll)

      this.updateDocument()
    }

    reset(){
      this.busy = false
      scrollBuddy.updateScroll(0,0)
      this.updateDocument()
      this.window.scrollTop = 0
      console.log(this)
    }

    update(){
      this.updateDocument()
    }

    handleWheel(e){
      e.stopPropagation();
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      this.window.scrollTop += e.deltaY * 0.75;
    }

    handleScroll(){
      !this.busy && (this.busy = true) && this.updateScroll()
    }

    updateDocument(){
      this.document.style.height = `${this.el.offsetHeight}px`
    }

    updateScroll(){
      window.requestAnimationFrame(()=>{
        let topTarget = this.window.scrollTop
        let topCurrent = lerp(scrollBuddy.top,topTarget,this.inertia)
        let val = `matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,0,${-topCurrent},0,1)`;

        scrollBuddy.updateScroll(topCurrent)
        this.event && this.event()

        this.el.style.webkitTransform = val;
        this.el.style.msTransform = val;
        this.el.style.transform = val;

        topCurrent == topTarget ? (this.busy = false) : this.updateScroll()
      })
    }
  }


}


initScrollBuddy()
