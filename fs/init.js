load('api_timer.js');
load('api_neopixel.js');

let pin = 13, numPixels = 50, colorOrder = NeoPixel.GRB, i = 0;
let strip = NeoPixel.create(pin, numPixels, colorOrder);

let lightpattern=[
					[1000,0,255,255,255,255],
					[1000,0,65280,65280,65280,65280],
					[300,0,16711680,16711680,16711680,16711680],
					[1000,0,0,0,0,0]
				];
let cnt=0;
let FRAME_TICK_MS=100;
let frameqty=lightpattern.length;
let framedelay;
let frameticksctr=0;

strip.clear();

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
* @param {obj} frame array object. 
* @returns {void}
*/
let fillPixelFrame=function(npixobj,framearray){
	let i;
	let colval;
	let size=(framearray.length)-2;
	let offset=framearray[1];
	
	for(i=0; i<size ;i++)
	{
		colval=framearray[i+2];
		setPixelColor(npixobj,offset+i, colval);	
	}	
};

Timer.set(FRAME_TICK_MS, Timer.REPEAT, function() {

	
	framedelay=lightpattern[cnt][0];

	if( frameticksctr===0 )
		{				
			fillPixelFrame(strip,lightpattern[cnt]);
			strip.show();
			frameticksctr=frameticksctr+1;				
		}
	else
		{				
			if( framedelay > (frameticksctr * FRAME_TICK_MS) )
			{
				frameticksctr=frameticksctr+1;
			}
			else
			{
				cnt++;
				frameticksctr=0;
				if( cnt > (frameqty-1))
				{
					cnt=0;
				}					
			}  
		}		

}, null);
