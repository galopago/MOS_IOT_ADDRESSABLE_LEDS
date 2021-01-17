
load('api_timer.js');
load('api_neopixel.js');
load('api_mqtt.js');

let random=ffi('float mgos_rand_range(float,float)');

let iopin = 13, numPixels = 50, colorOrder = NeoPixel.GRB, i = 0;

let strip = NeoPixel.create(iopin, numPixels, colorOrder);

let FRAME_TICK_MS=5000;

let colval;

let activepalette=0;

let topic = '/mosiotlights/colorpalette';

// ********************************************************
// Palette colors (RGB) are packed for compact code writting
// 0xBBGGRR
// ********************************************************	

// **** Autumn palette ****
// red=255,brown=1039,orange=16639,yellow=65535,silver=937807
let autumn_palette=[255, 1039, 16639, 65535, 937807];
let autumn_palette_size=autumn_palette.length;

// **** Christmas palette ****
// pomogreen=13056,sprigreen=39168,oryellow=52479,cinnabar=13260,firebrick=153
let christmas_palette=[13056, 39168, 52479, 13260, 153];
let christmas_palette_size=christmas_palette.length;

// **** allwhite palette (max power output test) ****
// allwhite=16777215
let allwhite_palette=[16777215, 16777215, 16777215, 16777215, 16777215];
let allwhite_palette_size=allwhite_palette.length;

strip.clear();
strip.clear();


/**
* return integer random number between min and max
* @param {int} min random number interval
* @param {int} max random number interval
* @returns {int} generated random number
*/

let randomint=function(min,max){
	let floatres;
	let intres;
	floatres=random(min,max+1)
	intres=(0 | floatres);				// truncate decimal part

	// extreme low probablility case:
	if(intres>max)
		{
			intres = intres-1;
		}
	return intres;
};

// ************************************************
// listen to MQTT server topic to change color palette
// ************************************************

MQTT.sub(topic,function(conn,topic,msg){
	print('Topic:', topic, 'message:', msg);
	activepalette=JSON.parse(msg);
},null);



// ************************************************
// change strip colors every  FRAME_TICK_MS seconds
// ************************************************

Timer.set(FRAME_TICK_MS, Timer.REPEAT, function() {

let rvar,gvar,bvar;
let randomnum;

	print("start filling strip");
	for(i=0; i<numPixels ;i++)
	{

		if( activepalette===0 )
		{
			randomnum=randomint(0,christmas_palette_size-1);
			colval=christmas_palette[randomnum];
		}
		else if ( activepalette===1 )
		{
			randomnum=randomint(0,autumn_palette_size-1);
			colval=autumn_palette[randomnum];
		}
			else if ( activepalette===2 )
		{
			randomnum=randomint(0,allwhite_palette_size-1);
			colval=allwhite_palette[randomnum];
		}		
		else
		{
			// default condition for unknown numbers
			randomnum=randomint(0,christmas_palette_size-1);
			colval=christmas_palette[randomnum];
		}
		
		rvar=colval & 0x000000ff;
		gvar=(colval >> 8)& 0x000000ff;
		bvar=(colval >> 16)& 0x000000ff;

		strip.setPixel(i, gvar , rvar, bvar );	
	}	
	print("finished filling strip");
	strip.show();	
		

}, null);
