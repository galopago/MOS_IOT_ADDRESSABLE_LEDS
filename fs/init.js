load('api_timer.js');
load('api_neopixel.js');

let pin = 13, numPixels = 50, colorOrder = NeoPixel.GRB, i = 0;
let strip = NeoPixel.create(pin, numPixels, colorOrder);

let lightpattern=[
					[10,255,0],
					[10,128,64],
					[10,3840,6000,9000,15000,30000],
					[10,0,255]
				];
let cnt=0;
let patternzise=lightpattern.length;
let val;

strip.clear();

Timer.set(100, Timer.REPEAT, function() {
  // let pixel = i++ % numPixels;
  // let r = i % 255, g = i * 2 % 255, b = i * i % 255;
  // strip.clear();
  // strip.setPixel(pixel, r, g, b);
  // strip.show();

if( cnt < patternzise)
	{
		val=lightpattern[cnt][1];
		strip.setPixel(49, val, 0, 0);	
		
		val=lightpattern[cnt][2];
		//strip.setPixel(48, 0, val, 0);	
		
		//setPixelColor(strip,48,986895);
		fillPixelFrame(strip,lightpattern[2]);
		
		cnt++;
		strip.show();
	}
else
	{
		cnt=0;
	}

}, null);

//strip.clear();
//strip.setPixel(1, 255, 0, 0);
//strip.show();
//strip.setPixel(49, 0, 0, 255);
//strip.setPixel(24, 0, 255, 0);
//strip.show();

/**
* set pixel color with packed rgb variable
* @param {obj} neopixel strip object
* @param {int} pixel number
* @param {int} packed color bits 0-7 red, bits 8-15 green, bits 16-23 blue 
* @returns {void}
*/
let setPixelColor=function(npixobj,pixnum,packedcolor){

	npixobj.setPixel(pixnum, (packedcolor >> 8)& 0x000000ff , packedcolor & 0x000000ff, (packedcolor >> 16)& 0x000000ff);	

};

/**
* fill one frame of neopixel strip leds with the  packed color values  in each position of the array
* @param {obj} neopixel strip object
* @param {int} frame array object. 
* @returns {void}
*/
let fillPixelFrame=function(npixobj,framearray){
	let i;
	let size=(framearray.length)-1;
	
	for(i=0; i<size ;i++)
	{
		setPixelColor(npixobj,i,framearray[i+1]);	
	}
	
};

