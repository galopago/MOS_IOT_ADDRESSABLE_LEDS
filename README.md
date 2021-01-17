# WiFi controlled LED string + Mongoose OS

ESP8266 based LED string, controlable via MQTT and firmware upgradeable (OTA) with Mongoose OS dashboard.

## Tested Hardware
- ESP8266

## Installation & Flashing

Before beginning, you must have the `mos` tool installed. For more info, see the mos [installation instructions](https://mongoose-os.com/docs/mongoose-os/quickstart/setup.md). 

1. First, clone the repo

```
$ git clone https://github.com/galopago/MOS_IOT_ADDRESSABLE_LEDS.git
```

2. Building the firmware: (esp8266)

```
$ mos build --arch esp8266 
```

3. To flash the device: (esp8266)

```
$ mos flash 
```

4. Configure WiFi:

```
mos wifi WIFI_SSID WIFI_PASSWORD 
```
You must replace the following values:
- WIFI_SSID
- WIFI_PASSWORD

5. Configure Mongoose OS dashboard (mDASH) 

```
mos config-set dash.enable=true dash.token=MDASH_TOKEN
```
You must replace the following values:
- MDASH_TOKEN
```  

6. To stream logs to the terminal: 

```
$ mos console
```

7. To open up the Web UI:

```
$ mos
```