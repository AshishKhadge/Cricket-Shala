var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: .2
        })
        .from("#herofooter", {
            y: '-10',
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}

function cursorSqueeze() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev
        var ydiff = dets.clientY - yprev

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff)
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff)

        xprev = dets.clientX
        yprev = dets.clientY

        cursorFollower(xscale, yscale)

        timeout = setTimeout(function () {
            document.querySelector(
                "#cursor"
            ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);

    })
}

function cursorFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var difference = 0;


    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
        gsap.to(elem.querySelector("h1"), {
            scale:1,
            opacity: 1,
            x: 0
        })
    })


    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top
        difference = dets.clientX - rotate
        rotate = dets.clientX
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff - 100,
            left: dets.clientX - 300,
            rotate: gsap.utils.clamp(-20, 20, difference)
        })
        gsap.to(elem.querySelector("h1"), {
    scale: 1.2,
    opacity: 0.3,
    x: 100, // Move 100px to the right
    ease: "power2.out" // Smooth easing
});

    })
})
cursorSqueeze()
cursorFollower()
firstPageAnimation()