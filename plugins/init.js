gsap.registerPlugin(ScrollTrigger);

let { userAgent, maxTouchPoints, platform } = navigator
let conditional = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
window.isMobile = conditional.test(userAgent) || (platform === "MacIntel" && maxTouchPoints > 1);
isMobile && document.documentElement.classList.add('is-mobile')
