
var lobes_land = 
	[
	  [// northern hemisphere
		    [[-180,   0], [-100,  90], [ -40,   0]],
		    [[ -40,   0], [  30,  90], [ 180,   0]]
		  ],
		  [ // southern hemisphere
		    [[-180,   0], [-160, -90], [-100,   0]],
		    [[-100,   0], [ -60, -90], [ -20,   0]],
		    [[ -20,   0], [  20, -90], [  80,   0]],
		    [[  80,   0], [ 140, -90], [ 180,   0]]
		  ]
		];
		
    
var lobes_sea = [
	  [
	    [[-180,   0], [-130,  90], [ -90,   0]],
	    [[ -90,   0], [  -30,  90], [ 60,   0]],
	    [[ 60,   0], [  120,  90], [ 180,   0]],
	  ],
	  [
	    [[-180,   0], [-120, -90], [-60,   0]],
	    [[ -60,   0], [  20, -90], [  100,   0]],
	    [[  100,   0], [ 140, -90], [ 180,   0]]
	  ]
	];

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var options = [
	  {name: "Goode’s interrupted homolosine (Land: 2+3 lobes)", projection: d3.geoInterruptedHomolosine().lobes(lobes_land).scale(152.63)},
	  {name: "Goode’s interrupted homolosine (Sea: 3 lobes)", projection: d3.geoInterruptedHomolosine().lobes(lobes_sea).scale(152.63)},
	  {name: "Bogg’s interrupted eumorphic", projection: d3.geoInterruptedBoggs().lobes(lobes_land)},
	  {name: "Aitoff", projection: d3.geoAitoff()},
	  {name: "Albers", projection: d3.geoAlbers().scale(145).parallels([20, 50])},
	  {name: "August", projection: d3.geoAugust().scale(60)},
	  {name: "Baker", projection: d3.geoBaker().scale(100)},
	  {name: "Boggs", projection: d3.geoBoggs()},
	  {name: "Bonne", projection: d3.geoBonne().scale(120)},
	  {name: "Bromley", projection: d3.geoBromley()},
	  {name: "Collignon", projection: d3.geoCollignon().scale(93)},
	  {name: "Craster Parabolic", projection: d3.geoCraster()},
	  {name: "Eckert I", projection: d3.geoEckert1().scale(165)},
	  {name: "Eckert II", projection: d3.geoEckert2().scale(165)},
	  {name: "Eckert III", projection: d3.geoEckert3().scale(180)},
	  {name: "Eckert IV", projection: d3.geoEckert4().scale(180)},
	  {name: "Eckert V", projection: d3.geoEckert5().scale(170)},
	  {name: "Eckert VI", projection: d3.geoEckert6().scale(170)},
	  {name: "Eisenlohr", projection: d3.geoEisenlohr().scale(60)},
	  {name: "Equirectangular (Plate Carrée)", projection: d3.geoEquirectangular()},
	  {name: "Hammer", projection: d3.geoHammer().scale(165)},
	  {name: "Hill", projection: d3.geoHill()},
	  {name: "Goode Homolosine", projection: d3.geoHomolosine()},
	  {name: "Kavrayskiy VII", projection: d3.geoKavrayskiy7()},
	  {name: "Lambert cylindrical equal-area", projection: d3.geoCylindricalEqualArea()},
	  {name: "Lagrange", projection: d3.geoLagrange().scale(120)},
	  {name: "Larrivée", projection: d3.geoLarrivee().scale(95)},
	  {name: "Laskowski", projection: d3.geoLaskowski().scale(120)},
	  {name: "Loximuthal", projection: d3.geoLoximuthal()},
	  {name: "Mercator", projection: d3.geoMercator().scale(490 / 2 / Math.PI)},
	  {name: "Miller", projection: d3.geoMiller().scale(100)},
	  {name: "McBryde–Thomas Flat-Polar Parabolic", projection: d3.geoMtFlatPolarParabolic()},
	  {name: "McBryde–Thomas Flat-Polar Quartic", projection: d3.geoMtFlatPolarQuartic()},
	  {name: "McBryde–Thomas Flat-Polar Sinusoidal", projection: d3.geoMtFlatPolarSinusoidal()},
	  {name: "Mollweide", projection: d3.geoMollweide().scale(165)},
	  {name: "Natural Earth", projection: d3.geoNaturalEarth()},
	  {name: "Nell–Hammer", projection: d3.geoNellHammer()},
	  {name: "Polyconic", projection: d3.geoPolyconic().scale(100)},
	  {name: "Robinson", projection: d3.geoRobinson()},
	  {name: "Sinusoidal", projection: d3.geoSinusoidal()},
	  {name: "Sinu-Mollweide", projection: d3.geoSinuMollweide()},
	  {name: "van der Grinten", projection: d3.geoVanDerGrinten().scale(75)},
	  {name: "van der Grinten IV", projection: d3.geoVanDerGrinten4().scale(120)},
	  {name: "Wagner IV", projection: d3.geoWagner4()},
	  {name: "Wagner VI", projection: d3.geoWagner6()},
	  {name: "Wagner VII", projection: d3.geoWagner7()},
	  {name: "Winkel Tripel", projection: d3.geoWinkel3()}
	];
var menu = d3.select("#projection-menu")
.on("change", ()=>{
	  update([document.getElementById("myRange").value,0],options[menu.property('selectedIndex')].projection)
});

menu.selectAll("option")
.data(options)
.enter().append("option")
.text(function(d) { return d.name; });



	
	var projection = d3.geoInterruptedHomolosine()
	.lobes(lobes_land)
	.rotate([0,0])
	.scale(152.63)
	//.translate([width / 2, height / 2])
	//.precision(0.1);
    

    
var graticule = d3.geoGraticule();

var path = d3.geoPath()
    .projection(projection);

var defs = svg.append("defs");

defs.append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

defs.append("clipPath")
    .attr("id", "clip")
  .append("use")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

svg.append("use")
    .attr("class", "fill")
    .attr("xlink:href", "#sphere");

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("clip-path", "url(#clip)")
    .attr("d", path);

d3.json("world-110m.json", function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("clip-path", "url(#clip)")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("clip-path", "url(#clip)")
      .attr("d", path);
});

function update(rotation,proje) {
	  svg.selectAll("path").interrupt().transition()
	      .duration(1000).ease(d3.easeLinear)
	      .attrTween("d", projectionTween(rotation,proje))
	  //d3.timeout(loop, 1000)
	}
function projectionTween(rotation,proje) {
	  return function(d) {
		  if (typeof(proje)=='undefined'){
				var projection = options[menu.property('selectedIndex')].projection
				.rotate(rotation)
				//.scale(152.63)
				//.translate([width / 2, height / 2])
				//.precision(0.1);
				
		  }else{
//			  if(options[menu.property('selectedIndex')].name=='Goode’s interrupted homolosine (Sea)'){
//				document.getElementById("myRange").value="160"
//				document.getElementById("centerCoord").innerHTML="160"
//				rotation=[160,0]
//			  }
			var projection = proje
			.rotate(rotation)
			//.scale(152.63)
			//.translate([width / 2, height / 2])
			//.precision(0.1);
			  

		  }
		  
			var graticule = d3.geoGraticule();

			var path = d3.geoPath()
			    .projection(projection);
	    return function(_) {
	      t = _;
	      return path(d);
	    };
	  };
	}
	
