class Game {
    constructor() {
        this.world = new World();

        const landingPad = new Obstacle();
        landingPad.points.push({x: -100, y: 100});
        landingPad.points.push({x: 100, y: 100});
        this.world.add(landingPad);

        const targetPad = new Obstacle();
        targetPad.points.push({x: 1200, y: 100});
        targetPad.points.push({x: 1400, y: 100});
        this.world.add(targetPad);

        const obst = new Obstacle();
        for (let x = 0 ; x < 800 ; x+= 100)  {
            obst.points.push({x: x + 200, y: sin(x / 800 * PI * 2 * 3) * 40 + 100});
        }
        this.world.add(obst);

        const ceiling = new Obstacle();
        ceiling.directionY = -1;
        for (let x = 0 ; x < 800 ; x+= 100)  {
            ceiling.points.push({x: x + 200, y: sin(x / 800 * PI * 2 * 3) * 40 - 400});
        }
        this.world.add(ceiling);

        this.world.add(new Player());
    }

    cycle(elapsed) {
        this.world.cycle(elapsed);
        this.world.render();

        if (DEBUG) {
            ctx.fillStyle = '#fff';
            ctx.strokeStyle = '#000';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'bottom';
            ctx.font = '14pt Courier';
            ctx.lineWidth = 3;

            let y = CANVAS_HEIGHT - 10;
            for (const line of [
                'FPS: ' + ~~(1 / elapsed),
                'Entities: ' + this.world.entities.size,
            ].reverse()) {
                ctx.strokeText(line, 10, y);
                ctx.fillText(line, 10, y);
                y -= 20;
            }
        }
    }
}
