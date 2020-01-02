const doc = document;
const container = doc.querySelectorAll('.container')[0];

let startDotsPosition = [
  {x: 500, y: 50},
  {x: 50, y: 500},
  {x: 950, y: 500},
];

let startDot = {
  x: 250,
  y: 250
}

const createDot = ({x, y}) => {
  const dot = doc.createElement('div');

  dot.classList.add('dot');

  dot.style.top = `${y}px`;
  dot.style.left = `${x}px`;

  dot.setAttribute('data-y', y)
  dot.setAttribute('data-x', x)

  return dot;
};


const draw = arrayOfCoordinates => {
  let dot;
  
  arrayOfCoordinates.forEach(({x, y}) => {
    dot = createDot({x, y});

    container.appendChild(dot);
  });

  return dot;
};

const getDotCoordinates = ({activeDot, aimDot: {x: aimedX, y: aimedY}}) => {
  const activeX = +activeDot.dataset.x;
  const activeY = +activeDot.dataset.y;

  const neededX = Math.floor(Math.abs(activeX + aimedX) / 2);
  const neededY = Math.floor(Math.abs(activeY + aimedY) / 2);

  return {
    x: neededX,
    y: neededY
  }
};

const start = () => {
  draw(startDotsPosition)
  let activeDot = draw([startDot])

  for(let i = 0; i < 100000; i++) {
    const random = Math.floor(Math.random() * 6) + 1;

    if (random === 1 || random === 2) {
      const coordinates = getDotCoordinates({activeDot, aimDot: startDotsPosition[0]});
  
      activeDot = draw([coordinates])
      continue;
    }

    if (random === 3 || random === 4) {
      const coordinates = getDotCoordinates({activeDot, aimDot: startDotsPosition[1]});
  
      activeDot = draw([coordinates])
      continue;
    }

    if (random === 5 || random === 6) {
      const coordinates = getDotCoordinates({activeDot, aimDot: startDotsPosition[2]});
  
      activeDot = draw([coordinates])
      continue;
    }
  }
}

start()
