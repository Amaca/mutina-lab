/* jshint esversion: 6 */

let body,
	header,
	html,
	isSafari,
	isIE11;

/*--------------------------------------------------
Init
--------------------------------------------------*/
function init() {
	html = document.documentElement;
	body = document.body;
	header = document.querySelector('.header');
}

let DirectionalLight = PIXI.lights.DirectionalLight;
let PointLight = PIXI.lights.PointLight;

let canvas = document.getElementById("canvas");
let viewWidth = 1400;
let viewHeight = 795;

let renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
	view: canvas
});

let stage = new PIXI.Container();
let lightCount = 1;

let lightHeight = 250;
let allLights = [];

let dirLight = new DirectionalLight({
	color: 0xffffff,
	brightness: 0.3,
	ambientColor: 0x888888,
	ambientBrightness: 1,
	position: {
		x: 0,
		y: 0,
		z: lightHeight,
	},
	target: {
		x: 0,
		y: 0,
		z: 0,
	}
});

let mouseLight = new PointLight({
	color: 0xffffff,
	brightness: 0.4,
	position: {
		x: viewWidth / 2,
		y: viewHeight / 2,
		z: lightHeight,
	}
});

allLights.push(dirLight);
allLights.push(mouseLight);

function createClickLight(x, y) {
	let clickLight = new PointLight({
		color: 0xffffff,
		brightness: 1,
		falloff: [0.8, 6, 260],
		position: {
			x: x,
			y: y,
			z: lightHeight,
		}
	});
	allLights.push(clickLight);
}

PIXI.loader
	.add('alien_diffuse', './img/image.jpg')
	.add('alien_normal', './img/image_bg.jpg')
	//.add('bg_diffuse', '../img/image.jpg')
	// .add('bg_normal', '../img/image_bg.jpg')
	.load(function(loader, res) {
		//let bg = new PIXI.Sprite(res.bg_diffuse.texture);
		//stage.addChild(bg);

		let alien = new PIXI.Sprite(res.alien_diffuse.texture);

		alien.position.set(0, 0);
		alien.scale.set(1, 1);

		dirLight.target.x = alien.x;
		dirLight.target.y = alien.y;
		dirLight.updateDirection();

		//bg.normalTexture = res.bg_normal.texture;
		alien.normalTexture = res.alien_normal.texture;

		//bg.pluginName = "lightSprite";
		alien.pluginName = "lightSprite";

		//bg.lights = allLights;
		alien.lights = allLights;

		stage.addChild(alien);

		canvas.addEventListener('mousemove', function(e) {
			let rect = e.target.getBoundingClientRect();

			mouseLight.position.x = e.clientX - rect.left;
			mouseLight.position.y = e.clientY - rect.top;
		});

		canvas.addEventListener('click', function(e) {
			let rect = e.target.getBoundingClientRect();

			createClickLight(e.clientX - rect.left, e.clientY - rect.top);

			document.getElementById('numLights').textContent = ++lightCount;
		});

		animate();
	});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}

/*--------------------------------------------------
Browsers
--------------------------------------------------*/
function oldBrowsers() {
	isSafari = /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
	isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

	if (isIE11 === true) {
		html.classList.add('msie');
	}
	if (isSafari === true) {
		html.classList.add('safari');
	}
}

/*--------------------------------------------------
WIN LOAD
--------------------------------------------------*/
window.onload = () => {
	init();
	oldBrowsers();
};
