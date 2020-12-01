# very simple template script to generate a frame, in a format compatible with the app
import random

framedelay=1000
frameoffset=0
numpixels=25
frames=20

# "brown":1039,red:255,yellow:65535,"silver":937807,orange:16639
colorarray = [1039,255,65535,937807,16639]

f = open("neopframe.txt", "w")



for i in range(frames):

	f.write("["+str(framedelay)+","+str(frameoffset)+",")

	for j in range(numpixels-1):
		ran=random.randint(0, 4)
		rancolor=colorarray[ran] 
		f.write(str(rancolor)+",")

	ran=random.randint(0, 4)
	rancolor=colorarray[ran]   
	f.write(str(rancolor))

	f.write("],\n")

f.close()

