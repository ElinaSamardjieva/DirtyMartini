var boardCanvas;
boardCanvas = (function () {
    var boardLayer = new Kinetic.Layer(),
        bullsEye,
        outerEye,
        outerCircle,
        lemonOne,
        lemonTwo,
        lemonThree,
        lemonFour,
        lemonFive,
        innerCircle;

    outerCircle = new Kinetic.Circle({
        x: targetCenterX,
        y: targetCenterY,
        radius: targetRadius + 20,
        opacity: 0.5,
        fill: 'blue'
    });

    innerCircle = new Kinetic.Circle({
        x: targetCenterX,
        y: targetCenterY,
        radius: (targetRadius + 20) * 0.76,
        opacity: 0.5,
        fill: 'red'
    });

    bullsEye = new Kinetic.Circle({
        x: targetCenterX + 5,
        y: targetCenterY - 5,
        radius: (targetRadius + 20) * 0.11,
        opacity: 0.5,
        fill: 'black'
    });

    outerEye = new Kinetic.Circle({
        x: targetCenterX + 2,
        y: targetCenterY - 2,
        radius: (targetRadius + 20) * 0.28,
        opacity: 0.5,
        fill: 'white',
        scaleY: 0.9
    });

    lemonOne = new Kinetic.Line({
            points: [287, 130,
                350, 115,
                430, 130,
                465, 180,
                465, 220,
                435, 255],
            stroke: 'brown',
            fill: 'brown',
            opacity: 1,
            strokeWidth: 3,
            tension: 0.2,
            closed: true
        }
    );

    lemonTwo = new Kinetic.Line({
        points: [593, 48,
            627, 85,
            640, 130,
            640, 170,
            630, 200,
            600, 235,
            580, 243,
            520, 235],
        stroke: 'brown',
        fill: 'brown',
        opacity: 1,
        strokeWidth: 3,
        tension: 0.2,
        closed: true
    });

    lemonThree = new Kinetic.Line({
        points: [583, 290,
            570, 320,
            580, 350,
            600, 375,
            660, 390,
            725, 370,
            770, 320],
        stroke: 'brown',
        fill: 'brown',
        opacity: 1,
        strokeWidth: 3,
        tension: 0.2,
        closed: true
    });

    lemonFour = new Kinetic.Line({
        points: [530, 360,
            500, 370,
            475, 400,
            470, 440,
            500, 495,
            530, 520,
            570, 535,
            607, 540],
        stroke: 'brown',
        fill: 'brown',
        opacity: 1,
        strokeWidth: 3,
        tension: 0.2,
        closed: true
    });

    lemonFive = new Kinetic.Line({
        points: [265, 435,
            290, 340,
            320, 315,
            360, 295,
            385, 290,
            420, 310,
            430, 330,
            435, 350],
        stroke: 'brown',
        fill: 'brown',
        opacity: 1,
        strokeWidth: 3,
        tension: 0.2,
        closed: true
    });

    boardLayer.add(outerCircle);
    boardLayer.add(innerCircle);
    boardLayer.add(outerEye);
    boardLayer.add(bullsEye);
    boardLayer.add(lemonOne);
    boardLayer.add(lemonTwo);
    boardLayer.add(lemonThree);
    boardLayer.add(lemonFour);
    boardLayer.add(lemonFive);
    stage.add(boardLayer);

    return boardLayer;
}());

