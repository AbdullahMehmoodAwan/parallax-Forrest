const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;
let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px)) rotateY(${rotateDegree * rotateSpeed}deg) perspective(2300px) translateZ(${zValue * speedz}px)`;
    })
}

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

    update(e.clientX);
})

let timeline = gsap.timeline();

parallax_el.forEach(el => {
    timeline.from(el, {
        top: `${el.offsetHeight / 2 + parseFloat(el.getAttribute("data-distance"))}px`,
        duration: 3.5
    });
});

// Add an animation for the text element to move it from the top to the middle of the screen.
timeline.to(".text", {
    top:  `${text.offsetHeight / 2 + parseFloat(el.getAttribute("data-distance"))}px`,
    duration: 3.5,
    ease: "power2.out",
}, "-=2.5"); // Delay it slightly to ensure it starts after other animations.
