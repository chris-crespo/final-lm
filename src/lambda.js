const restingState = {
    offset: 0,
    red: [0, 0],
    blue: [0, 0],
    green: [0, 0]
}

const app = new PIXI.Application({
    width: 32,
    height: 16,
    background: 0x000000
})

const sprite = PIXI.Sprite.from("assets/img/white-lambda.png")
const glitch = new PIXI.filters.GlitchFilter(restingState)
Object.assign(sprite, {
    width: 16,
    height: 16,
    filters: [glitch]
})

app.stage.addChild(sprite)

const container = document.querySelector(".glitch-container")
container.appendChild(app.view)

const rand = (range, base = 0) => Math.floor(Math.random() * range + base)
const resetFx = fx => Object.assign(fx, restingState)
const randomizeFx = fx => Object.assign(fx, {
    slices: rand(12, 8),
    offset: rand(20),
    red: [rand(20, -15), rand(50, -20)],
    blue: [rand(20, -15), 0],
    green: [0, rand(10, -4)]
})
const minimalFx = fx => Object.assign(fx, {
    slices: rand(10, 6),
    offset: rand(2),
    red: [rand(2, -1), 0],
    blue: [rand(2, -1), 0],
    green: [0, rand(2, -1)]
})

const minimizeFor = time => new Promise(res => {
    let id;

    const provoke = () => {
        minimalFx(glitch) 
        id = requestAnimationFrame(reset)
    }

    const reset = () => {
        resetFx(glitch)
        id = requestAnimationFrame(provoke)
    }

    id = requestAnimationFrame(provoke)
    setTimeout(() => {
        cancelAnimationFrame(id)
        res()
    }, time)
})

const step = () => new Promise(res => {
    console.log("step")
    randomizeFx(glitch)
    setTimeout(() => {
        minimizeFor(rand(200, rand(1200))).then(_ => res())
    }, rand(20, rand(90, 40)))
})

console.log("lkdjf");
(async () => {
    while (true) await step()
})()
