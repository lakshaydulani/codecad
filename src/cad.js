import { drawCircle,
  makePlane,
  draw } from "replicad";

// The replicad code! Not much there!
export function drawBox(numberOfBlades,baseradius,height,outerradius,innerradius,thickness) {


  const polarCopies = (shape, count, radius) => {
    const base = shape.translate(0, radius);
    const angle = 360 / count; 

    const copies = [];
    for (let i = 0; i < count; i++) {
      copies.push(base.clone().rotate(i * angle));
    }
    return copies;
  };

  const fuseAll = (shapes) => {
    let result = shapes[0];
    shapes.slice(1).forEach((shape) => {
      result = result.fuse(shape);
    });
    return result;
  };


  //  const a=0;
  const baseHeight =thickness;
  const cylinderHeight = height;
  const totalHeight = baseHeight + cylinderHeight;
  const baseRadius = baseradius;
  const outerRadiusCylinder = outerradius;
  const innerRadiusCylinder = innerradius;
  const cylinderWallThickness = outerRadiusCylinder - innerRadiusCylinder;
  const bladeThick = 2;
  //const numberOfBlades = 10;
  const bladeStart = innerRadiusCylinder;



  const cirCylind = drawCircle(outerRadiusCylinder)
    .sketchOnPlane(makePlane("XY", [0, 0, baseHeight]))
    .extrude(cylinderHeight)
    .shell(cylinderWallThickness, (f) => f.inPlane("XY", totalHeight));

  const base = drawCircle(baseRadius+1)
    .sketchOnPlane(makePlane("XY",[0,0,0]))
    .extrude(baseHeight);

  const baseCylinderFused = base.fuse(cirCylind);


  const bladeShape = draw([bladeStart, 0,baseHeight])
    .vLine(bladeThick)
    .bulgeArcTo([baseRadius, 6], -.4)
    .vLine(-4)
    .bulgeArcTo([bladeStart, 0], .4)
    .close()
    .sketchOnPlane("XY")
    .extrude(totalHeight);



  const shape = fuseAll(polarCopies(bladeShape, numberOfBlades, 12)).fuse(baseCylinderFused);

  return shape;
}
