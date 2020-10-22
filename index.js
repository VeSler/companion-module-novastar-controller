// NovaStar-Controller
const tcp           = require('../../tcp');
const instance_skel = require('../../instance_skel');
var actions         = require('./actions');
let debug;
let log;

class instance extends instance_skel {

	constructor(system,id,config) {
		super(system,id,config)

		Object.assign(this, {
			...actions
		});

		// Brightness
		this.CHOICES_BRIGHTNESS = [
			{ id: '0',  label: '3%',   cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x08,0x5D,0x5A]) },
			{ id: '1',  label: '5%',   cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x0D,0x62,0x5A]) },
			{ id: '2',  label: '8%',   cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x14,0x69,0x5A]) },
			{ id: '3',  label: '10%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x1A,0x6F,0x5A]) },
			{ id: '4',  label: '15%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x27,0x7C,0x5A]) },
			{ id: '5',  label: '20%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x33,0x88,0x5A]) },
			{ id: '6',  label: '25%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x40,0x95,0x5A]) },
			{ id: '7',  label: '30%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x4D,0xA2,0x5A]) },
			{ id: '8',  label: '35%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x5A,0xAF,0x5A]) },
			{ id: '9',  label: '40%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x66,0xBB,0x5A]) },
			{ id: '10', label: '45%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x73,0xC8,0x5A]) },
			{ id: '11', label: '50%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x80,0xD5,0x5A]) },
			{ id: '12', label: '55%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x8D,0xE2,0x5A]) },
			{ id: '13', label: '60%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0x9A,0xEF,0x5A]) },
			{ id: '14', label: '65%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xA6,0xFB,0x5A]) },
			{ id: '15', label: '70%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xB3,0x08,0x5B]) },
			{ id: '16', label: '75%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xC0,0x15,0x5B]) },
			{ id: '17', label: '80%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xCD,0x22,0x5B]) },
			{ id: '18', label: '85%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xDA,0x2F,0x5B]) },
			{ id: '19', label: '90%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xE6,0x3B,0x5B]) },
			{ id: '20', label: '95%',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xF3,0x48,0x5B]) },
			{ id: '21', label: '100%', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x01,0xFF,0xFF,0xFF,0x01,0x00,0x01,0x00,0x00,0x02,0x01,0x00,0xFF,0x54,0x5B]) }
		];

		// Test Patterns
		this.CHOICES_TESTPATTERNS = [
			{ id: '0', label: 'Red',        cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x02,0xDA,0x58]) },
			{ id: '1', label: 'Green',      cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x04,0xDC,0x58]) },
			{ id: '2', label: 'Blue',       cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x03,0xDB,0x58]) },
			{ id: '3', label: 'White',      cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x05,0xDD,0x58]) },
			{ id: '4', label: 'Horizontal', cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x06,0xDE,0x58]) },
			{ id: '5', label: 'Vertical',   cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x07,0xDF,0x58]) },
			{ id: '6', label: 'Diagonal',   cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x08,0xE0,0x58]) },
			{ id: '7', label: 'Gray-Scale', cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x09,0xE1,0x58]) },
			{ id: '8', label: 'Aging-All',  cmd: new Buffer([0x55,0xAA,0x00,0x80,0xFE,0x00,0x01,0x00,0xFF,0xFF,0x01,0x00,0x01,0x01,0x00,0x02,0x01,0x00,0x0A,0xE2,0x58]) }
		];

		// VX4S Display Modes
		this.CHOICES_DISPLAYMODE = [
			{ id: '0', label: 'Normal', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x50,0x00,0x20,0x02,0x01,0x00,0x00,0xC7,0x56]) },
			{ id: '1', label: 'Freeze', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x50,0x00,0x20,0x02,0x01,0x00,0x01,0xC8,0x56]) },
			{ id: '2', label: 'Black',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x50,0x00,0x20,0x02,0x01,0x00,0x02,0xC9,0x56]) }
		];
		
		// VX6S Display Modes
		this.CHOICES_DISPLAYMODE_VX6S = [
			{ id: '0', label: 'Normal', cmd: new Buffer([0x55,0xAA,0x00,0x38,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x04,0x00,0x00,0x13,0x01,0x00,0x03,0xA7,0x56]) },
			{ id: '1', label: 'Freeze', cmd: new Buffer([0x55,0xAA,0x00,0x35,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x04,0x00,0x00,0x13,0x01,0x00,0x03,0xA5,0x56]) },
			{ id: '2', label: 'Black',  cmd: new Buffer([0x55,0xAA,0x00,0x37,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x04,0x00,0x00,0x13,0x01,0x00,0x03,0xA2,0x56]) }
		];	

		// VX6S Working Modes
		this.CHOICES_WORKINGMODE_VX6S = [
			{ id: '0', label: 'Direct',   cmd: new Buffer([0x55,0xAA,0x00,0xEC,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2C,0x00,0x00,0x13,0x01,0x00,0x00,0x80,0x57]) },
			{ id: '1', label: 'Switcher', cmd: new Buffer([0x55,0xAA,0x00,0x1E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2C,0x00,0x00,0x13,0x01,0x00,0x01,0xB3,0x56]) }
		];					

		// MCTRL4K Inputs
		this.CHOICES_INPUTS_MCTRL4K = [
			{ id: '0', label: 'DVI',          cmd: new Buffer([0x55,0xAA,0x00,0x3E,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x23,0x00,0x00,0x02,0x01,0x00,0x61,0x18,0x58]) },
			{ id: '1', label: 'HDMI',         cmd: new Buffer([0x55,0xAA,0x00,0x8A,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x23,0x00,0x00,0x02,0x01,0x00,0x05,0x08,0x58]) },
			{ id: '2', label: 'Display Port', cmd: new Buffer([0x55,0xAA,0x00,0x9D,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x23,0x00,0x00,0x02,0x01,0x00,0x5F,0x75,0x58]) }
		];

		// VX4S Inputs
		this.CHOICES_INPUTS_VX4S = [
			{ id: '0', label: 'DVI',          cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x10,0xB4,0x56]) },
			{ id: '1', label: 'HDMI',         cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0xA0,0x44,0x57]) },
			{ id: '2', label: 'VGA 1',        cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x01,0xA5,0x56]) },
			{ id: '3', label: 'VGA 2',        cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x02,0xA6,0x56]) },
			{ id: '4', label: 'CVBS 1',       cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x71,0x15,0x57]) },
			{ id: '5', label: 'CVBS 2',       cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x72,0x16,0x57]) },
			{ id: '6', label: 'SDI',          cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x40,0xE4,0x56]) },
			{ id: '7', label: 'Display Port', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x20,0x02,0x01,0x00,0x90,0x34,0x57]) }
		];

		// VX6S Inputs
		this.CHOICES_INPUTS_VX6S = [
			{ id: '0', label: '[Window 1] HDMI 1',        cmd: new Buffer([0x55,0xAA,0x00,0x88,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x00,0x00,0x11,0x17,0x57]) },
			{ id: '1', label: '[Window 1] HDMI 2',        cmd: new Buffer([0x55,0xAA,0x00,0xA8,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x01,0x00,0x12,0x39,0x57]) },
			{ id: '2', label: '[Window 1] SDI 1',         cmd: new Buffer([0x55,0xAA,0x00,0xC4,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x02,0x00,0x31,0x75,0x57]) },
			{ id: '3', label: '[Window 1] SDI 2',         cmd: new Buffer([0x55,0xAA,0x00,0xD4,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x03,0x00,0x32,0x87,0x57]) },
			{ id: '4', label: '[Window 1] DVI 1',         cmd: new Buffer([0x55,0xAA,0x00,0xD6,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x04,0x00,0x01,0x59,0x57]) },
			{ id: '5', label: '[Window 1] DVI 2',         cmd: new Buffer([0x55,0xAA,0x00,0xD7,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x06,0x00,0x02,0x5D,0x57]) },
			{ id: '6', label: '[Window 1] USB',           cmd: new Buffer([0x55,0xAA,0x00,0xD9,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x12,0x00,0x02,0x13,0x03,0x00,0x07,0x00,0xA0,0xFE,0x57]) },
			{ id: '7', label: '[Window 2] HDMI 1',        cmd: new Buffer([0x55,0xAA,0x00,0x47,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x00,0x01,0x11,0x07,0x57]) },
			{ id: '9', label: '[Window 2] HDMI 2',        cmd: new Buffer([0x55,0xAA,0x00,0x55,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x01,0x01,0x12,0x17,0x57]) },
			{ id: '10', label: '[Window 2] SDI 1',        cmd: new Buffer([0x55,0xAA,0x00,0x56,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x02,0x01,0x31,0x38,0x57]) },
			{ id: '11', label: '[Window 2] SDI 2',        cmd: new Buffer([0x55,0xAA,0x00,0x58,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x03,0x01,0x32,0x3C,0x57]) },
			{ id: '12', label: '[Window 2] DVI 1',        cmd: new Buffer([0x55,0xAA,0x00,0x59,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x04,0x01,0x01,0x0D,0x57]) },
			{ id: '13', label: '[Window 2] DVI 2',        cmd: new Buffer([0x55,0xAA,0x00,0x5A,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x06,0x01,0x02,0x11,0x57]) },
			{ id: '14', label: '[Window 2] USB',          cmd: new Buffer([0x55,0xAA,0x00,0x5C,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x42,0x00,0x02,0x13,0x03,0x00,0x07,0x01,0xA0,0xB2,0x57]) },
			{ id: '15', label: '[Window 3] HDMI 1',       cmd: new Buffer([0x55,0xAA,0x00,0xA2,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x00,0x02,0x11,0x93,0x57]) },
			{ id: '16', label: '[Window 3] HDMI 2',       cmd: new Buffer([0x55,0xAA,0x00,0xA3,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x01,0x02,0x12,0x96,0x57]) },
			{ id: '17', label: '[Window 3] SDI 1',        cmd: new Buffer([0x55,0xAA,0x00,0xA5,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x02,0x02,0x31,0xB8,0x57]) },
			{ id: '18', label: '[Window 3] SDI 2',        cmd: new Buffer([0x55,0xAA,0x00,0xA6,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x03,0x02,0x32,0xBB,0x57]) },
			{ id: '19', label: '[Window 3] DVI 1',        cmd: new Buffer([0x55,0xAA,0x00,0xA7,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x04,0x02,0x01,0x8C,0x57]) },
			{ id: '20', label: '[Window 3] DVI 2',        cmd: new Buffer([0x55,0xAA,0x00,0xA9,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x06,0x02,0x02,0x91,0x57]) },
			{ id: '21', label: '[Window 3] USB',          cmd: new Buffer([0x55,0xAA,0x00,0xAA,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x72,0x00,0x02,0x13,0x03,0x00,0x07,0x02,0xA0,0x31,0x58]) }
		];


		// NovaProHD Inputs
		this.CHOICES_INPUTS_NOVAPROHD = [
			{ id: '0', label: 'SDI',          cmd: new Buffer([0x55,0xAA,0x00,0x2B,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x1A,0xDE,0x56]) },
			{ id: '1', label: 'DVI',          cmd: new Buffer([0x55,0xAA,0x00,0x34,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x1C,0xE9,0x56]) },
			{ id: '2', label: 'HDMI',         cmd: new Buffer([0x55,0xAA,0x00,0x3F,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x1B,0xF3,0x56]) },
			{ id: '3', label: 'Display Port', cmd: new Buffer([0x55,0xAA,0x00,0x51,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x1E,0x08,0x57]) },
			{ id: '4', label: 'VGA',          cmd: new Buffer([0x55,0xAA,0x00,0x48,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x17,0xF8,0x56]) },
			{ id: '5', label: 'CVBS',         cmd: new Buffer([0x55,0xAA,0x00,0x5A,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x22,0x00,0x20,0x02,0x01,0x00,0x02,0xF5,0x56]) }
		];

		// MCTRL4K Inputs
		this.CHOICES_PIP_ONOFF = [
			{ id: '0', label: 'Off', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x30,0x00,0x20,0x02,0x01,0x00,0x00,0xA6,0x57]) },
			{ id: '1', label: 'On',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x30,0x00,0x20,0x02,0x01,0x00,0x01,0xA7,0x57]) }
		];

		this.CHOICES_PRESETS_VX4S = [
			{ id: '0',  label: 'Preset 1',  cmd: new Buffer([0x55,0xAA,0x00,0x2E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x00,0x15,0x57]) },
			{ id: '1',  label: 'Preset 2',  cmd: new Buffer([0x55,0xAA,0x00,0x2E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x01,0x16,0x57]) },
			{ id: '2',  label: 'Preset 3',  cmd: new Buffer([0x55,0xAA,0x00,0x2E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x02,0x17,0x57]) },
			{ id: '3',  label: 'Preset 4',  cmd: new Buffer([0x55,0xAA,0x00,0x2E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x03,0x18,0x57]) },
			{ id: '4',  label: 'Preset 5',  cmd: new Buffer([0x55,0xAA,0x00,0x2E,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x04,0x19,0x57]) },
			{ id: '5',  label: 'Preset 6',  cmd: new Buffer([0x55,0xAA,0x00,0x95,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x05,0x81,0x57]) },
			{ id: '6',  label: 'Preset 7',  cmd: new Buffer([0x55,0xAA,0x00,0x95,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x06,0x82,0x57]) },
			{ id: '7',  label: 'Preset 8',  cmd: new Buffer([0x55,0xAA,0x00,0x95,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x07,0x83,0x57]) },
			{ id: '8',  label: 'Preset 9',  cmd: new Buffer([0x55,0xAA,0x00,0x95,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x08,0x84,0x57]) },
			{ id: '9',  label: 'Preset 10', cmd: new Buffer([0x55,0xAA,0x00,0x95,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x70,0x00,0x20,0x02,0x01,0x00,0x09,0x85,0x57]) }
		];

		// VX6S Presets
		this.CHOICES_PRESETS_VX6S = [
			{ id: '0',  label: 'Preset 1',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x00,0x05,0x16]) },
			{ id: '1',  label: 'Preset 2',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x01,0x06,0x16]) },
			{ id: '2',  label: 'Preset 3',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x02,0x07,0x56]) },
			{ id: '3',  label: 'Preset 4',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x03,0x08,0x16]) },
			{ id: '4',  label: 'Preset 5',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x04,0x09,0x16]) },
			{ id: '5',  label: 'Preset 6',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x05,0x0A,0x16]) },
			{ id: '6',  label: 'Preset 7',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x06,0x0B,0x56]) },
			{ id: '7',  label: 'Preset 8',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x07,0x0C,0x56]) },
			{ id: '8',  label: 'Preset 9',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x08,0x0D,0x56]) },
			{ id: '9',  label: 'Preset 10', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x09,0x0E,0x56]) },
			{ id: '10', label: 'Preset 11', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0A,0x0F,0x56]) },
			{ id: '11', label: 'Preset 12', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0B,0xC6,0x56]) },
			{ id: '12', label: 'Preset 13', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0C,0xC7,0x56]) },
			{ id: '13', label: 'Preset 14', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0D,0xC8,0x56]) },
			{ id: '14', label: 'Preset 15', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0E,0xC9,0x56]) },
			{ id: '15', label: 'Preset 16', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x0F,0xCA,0x56]) }
		];

		// NovaProUHDJr Presets
		this.CHOICES_PRESETS_NovaProUHDJr = [
			{ id: '0',  label: 'Preset 1',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x00,0x05,0x16]) },
			{ id: '1',  label: 'Preset 2',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x01,0x06,0x16]) },
			{ id: '2',  label: 'Preset 3',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x02,0x07,0x56]) },
			{ id: '3',  label: 'Preset 4',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x03,0x08,0x16]) },
			{ id: '4',  label: 'Preset 5',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x04,0x09,0x16]) },
			{ id: '5',  label: 'Preset 6',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x05,0x0A,0x16]) },
			{ id: '6',  label: 'Preset 7',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x06,0x0B,0x56]) },
			{ id: '7',  label: 'Preset 8',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x07,0x0C,0x56]) },
			{ id: '8',  label: 'Preset 9',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x08,0x0D,0x56]) },
			{ id: '9',  label: 'Preset 10', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x01,0x51,0x13,0x01,0x00,0x09,0x0E,0x56]) }
		];

		//Scaling Options - VX4S, VX6S, NovaProHD only
		this.CHOICES_SCALING = [
			{ id: '0', label: 'Disable', cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x20,0x02,0x01,0x00,0x00,0x76,0x57]) },
			{ id: '1', label: 'Custom',  cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x20,0x02,0x01,0x00,0x01,0x77,0x57]) },
			{ id: '2', label: 'Auto',    cmd: new Buffer([0x55,0xAA,0x00,0x00,0xFE,0xFF,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x20,0x02,0x01,0x00,0x02,0x78,0x57]) }
		];

		this.CONFIG_MODEL = {
			vx4s:             { id: 'vx4s',        label: 'VX4S',            inputs: this.CHOICES_INPUTS_VX4S,         displayModes: this.CHOICES_DISPLAYMODE,      presets: this.CHOICES_PRESETS_VX4S     },
			vx6s:             { id: 'vx6s',        label: 'VX6s',            inputs: this.CHOICES_INPUTS_VX6S,         displayModes: this.CHOICES_DISPLAYMODE_VX6S, presets: this.CHOICES_PRESETS_VX6S },
			novaProHD:        { id: 'novaProHD',   label: 'NovaPro HD',      inputs: this.CHOICES_INPUTS_NOVAPROHD,    displayModes: this.CHOICES_DISPLAYMODE},
			novaProHDJr:      { id: 'novaProHDJr', label: 'NovaPro UHD Jr',  inputs: this.CHOICES_INPUTS_NOVAPROHDJR,  displayModes: this.CHOICES_DISPLAYMODE,      presets: this.CHOICES_PRESETS_NovaProUHDJr },
			mctrl4k:          { id: 'mctrl4k',     label: 'MCTRL4K',         inputs: this.CHOICES_INPUTS_MCTRL4K,      displayModes: this.CHOICES_DISPLAYMODE}
		};

		this.CHOICES_MODEL = Object.values(this.CONFIG_MODEL);
		// Sort alphabetical
		this.CHOICES_MODEL.sort(function(a, b){
			var x = a.label.toLowerCase();
			var y = b.label.toLowerCase();
			if (x < y) {return -1;}
			if (x > y) {return 1;}
			return 0;
		});

		if (this.config.modelID !== undefined){
			this.model = this.CONFIG_MODEL[this.config.modelID];
		}
		else {
			this.config.modelID = 'vx4s';
			this.model = this.CONFIG_MODEL['vx4s'];
		}

		this.actions();
	}

	actions(system) {
		this.setActions(this.getActions());
	}

	action(action) {
		let cmd;
		let element
		let id = action.action
		let options = action.options;

		const lf = '\u000a';

		switch(id) {
			case 'change_brightness':
				element = this.CHOICES_BRIGHTNESS.find(element => element.id === options.brightness);
				if (element !== undefined) {
					cmd = element.cmd;
				}
			case 'change_test_pattern':
				element = this.CHOICES_TESTPATTERNS.find(element => element.id === options.pattern);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'change_display_mode':
				element = this.model.displayModes.find(element => element.id === options.display_mode);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'change_working_mode':
				element = this.CHOICES_WORKINGMODE_VX6S.find(element => element.id === options.working_mode);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'change_input':
				element = this.model.inputs.find(element => element.id === options.input);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'pip_onoff':
				element = this.CHOICES_PIP_ONOFF.find(element => element.id === options.value);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'change_scaling':
				element = this.CHOICES_SCALING.find(element => element.id === options.scale);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'load_preset':
				element = this.model.presets.find(element => element.id === options.preset);
				if (element !== undefined) {
					cmd = element.cmd;
				}
				break;
			case 'take':
				cmd = new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x2D,0x00,0x00,0x13,0x01,0x00,0x00,0x95,0x56]);
				break;
		}

		if (cmd !== undefined) {
			if (this.socket !== undefined && this.socket.connected) {
				this.socket.send(cmd);
			} else {
				debug('Socket not connected :(');
			}

		}
	}

	// Return config fields for web config
	config_fields() {

		return [
			{
				type: 'text',
				id:   'info',
				width: 12,
				label: 'Information',
				value: 'This module will connect to a NovaStar MCTRL4K, VX4S, VX6S, NovaProHD, or NovaPro UHD Jr LED Processor.'
			},
			{
				type:     'textinput',
				id:       'host',
				label:    'IP Address',
				width:    6,
				default: '192.168.1.11',
				regex:   this.REGEX_IP
			},
			{
				type:    'dropdown',
				id:      'modelID',
				label:   'Model',
				width:   6,
				choices: this.CHOICES_MODEL,
				default: 'vx4s'
			}
		]
	}

	// When module gets deleted
	destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy();
		}

		debug('destroy', this.id);
	}

	init() {
		debug = this.debug;
		log = this.log;

		this.initTCP();
	}

	initTCP() {
		if (this.socket !== undefined) {
			this.socket.destroy();
			delete this.socket;
		}

		if (this.config.port === undefined) {
			this.config.port = 5200;
		}

		if (this.config.host) {
			this.socket = new tcp(this.config.host, this.config.port);

			this.socket.on('status_change', (status, message) => {
				this.status(status, message);
			});

			this.socket.on('error', (err) => {
				debug('Network error', err);
				this.log('error','Network error: ' + err.message);
			});

			this.socket.on('connect', () => {
				let cmd = new Buffer([0x55,0xAA,0x00,0x00,0xFE,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x00,0x00,0x02,0x00,0x57,0x56]);
				this.socket.send(cmd);
				debug('Connected');
			});

			// if we get any data, display it to stdout
			this.socket.on('data', (buffer) => {
				//var indata = buffer.toString('hex');
				//future feedback can be added here
				//console.log(indata);
				console.log('Buffer:', buffer);
			});

		}
	}

	updateConfig(config) {
		var resetConnection = false;

		if (this.config.host != config.host)
		{
			resetConnection = true;
		}

		this.config = config;

		this.actions();

		if (resetConnection === true || this.socket === undefined) {
			this.initTCP();
		}
	}
}

exports = module.exports = instance;
